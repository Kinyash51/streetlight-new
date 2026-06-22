import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createCheckoutLink } from "@/lib/payments";

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

    const tierPrices = {
      supporter: { monthly: 300, yearly: 3000 },
      forgotten: { monthly: 800, yearly: 8000 },
      watcher: { monthly: 1500, yearly: 15000 },
    };

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

    const price = tierPrices[tier][billingPeriod];
    if (!price) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const checkout = await createCheckoutLink(
      {
        amount: price,
        currency: "KES",
        email: session.user.email || "",
        api_ref: `streetlight_sub_${tier}_${billingPeriod}_${session.user.id}`,
        redirect_url: `${siteUrl}/payment/success?type=subscription&tier=${tier}`,
        comment: `Streetlight Subscription: ${tier}`,
        mobile_tarrif: "CUSTOMER-PAYS",
        card_tarrif: "CUSTOMER-PAYS",
      },
      process.env.INTASEND_PUBLIC_API_KEY ||
        process.env.NEXT_PUBLIC_INTASEND_PUBLIC_KEY ||
        ""
    );

    return NextResponse.json({ checkoutUrl: checkout.url });

  } catch (error: any) {
    console.error("Subscription error:", error);
    return NextResponse.json(
      { error: error.message || "Subscription creation failed" },
      { status: 500 }
    );
  }
}
