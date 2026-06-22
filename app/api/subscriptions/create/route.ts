import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  createSubscriptionCheckout,
  createSubscriptionCustomer,
  getSubscriptionCustomerByReference,
} from "@/lib/payments";

const PLAN_ENV_KEYS = {
  supporter: {
    monthly: "INTASEND_PLAN_SUPPORTER_MONTHLY",
    yearly: "INTASEND_PLAN_SUPPORTER_YEARLY",
    fallback: "INTASEND_PLAN_SUPPORTER",
  },
  forgotten: {
    monthly: "INTASEND_PLAN_FORGOTTEN_MONTHLY",
    yearly: "INTASEND_PLAN_FORGOTTEN_YEARLY",
    fallback: "INTASEND_PLAN_FORGOTTEN",
  },
  watcher: {
    monthly: "INTASEND_PLAN_WATCHER_MONTHLY",
    yearly: "INTASEND_PLAN_WATCHER_YEARLY",
    fallback: "INTASEND_PLAN_WATCHER",
  },
} as const;

function formatIntaSendName(value: string | undefined, fallback: string): string {
  const cleaned = (value || fallback)
    .replace(/[^a-zA-Z0-9-_: ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned || fallback;
}

export async function POST(request: NextRequest) {
  try {
    const { tier, billingPeriod } = (await request.json()) as {
      tier?: string;
      billingPeriod?: string;
    };

    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
      tier !== "supporter" &&
      tier !== "forgotten" &&
      tier !== "watcher"
    ) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    if (billingPeriod !== "monthly" && billingPeriod !== "yearly") {
      return NextResponse.json({ error: "Invalid billing period" }, { status: 400 });
    }

    const planEnvKeys = PLAN_ENV_KEYS[tier];
    const planEnvKey = planEnvKeys[billingPeriod];
    const planId = process.env[planEnvKey] || process.env[planEnvKeys.fallback];
    if (!planId) {
      return NextResponse.json(
        { error: `Missing ${planEnvKey} or ${planEnvKeys.fallback}` },
        { status: 500 }
      );
    }

    const secretKey = process.env.INTASEND_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: "Missing INTASEND_SECRET_KEY" }, { status: 500 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const reference = `streetlight_sub_${tier}_${billingPeriod}_${session.user.id}_${Date.now()}`;
    const email = session.user.email || "";
    const [firstName, ...lastNameParts] = (
      session.user.user_metadata?.display_name ||
      email.split("@")[0] ||
      "Streetlight"
    ).split(" ");

    const customerReference = session.user.id;
    const existingCustomer = await getSubscriptionCustomerByReference(customerReference, secretKey);
    const customer = existingCustomer ?? (await createSubscriptionCustomer(
        {
          email,
          first_name: formatIntaSendName(firstName, "Streetlight"),
          last_name: formatIntaSendName(lastNameParts.join(" "), "Reader"),
          reference: customerReference,
          country: "KE",
        },
        secretKey
      ));

    const customerId = customer.customer_id || customer.id;
    if (!customerId) {
      throw new Error("IntaSend did not return a customer ID");
    }

    const checkout = await createSubscriptionCheckout(
      {
        customer_id: customerId,
        reference,
        plan_id: planId,
        redirect_url: `${siteUrl}/payment/success?type=subscription&tier=${tier}`,
        start_date: new Date().toISOString().slice(0, 10),
      },
      secretKey
    );

    return NextResponse.json({
      checkoutUrl: checkout.setup_url,
      subscriptionId: checkout.subscription_id,
    });

  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Subscription creation failed" },
      { status: 500 }
    );
  }
}
