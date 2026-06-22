import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

function isCompletedPayment(status: unknown): boolean {
  return typeof status === "string" && ["COMPLETED", "COMPLETE", "PAID"].includes(status.toUpperCase());
}

function isFailedPayment(status: unknown): boolean {
  return typeof status === "string" && ["FAILED", "CANCELLED", "CANCELED"].includes(status.toUpperCase());
}

function getPeriodEnd(billingPeriod: "monthly" | "yearly") {
  const periodEnd = new Date();

  if (billingPeriod === "monthly") {
    periodEnd.setMonth(periodEnd.getMonth() + 1);
  } else {
    periodEnd.setFullYear(periodEnd.getFullYear() + 1);
  }

  return periodEnd;
}

export async function POST(request: NextRequest) {
  try {
    const expectedChallenge = process.env.INTASEND_WEBHOOK_SECRET;
    const challenge = request.headers.get("x-intasend-challenge");

    if (!expectedChallenge) {
      console.error("INTASEND_WEBHOOK_SECRET is not configured");
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    if (challenge !== expectedChallenge) {
      return NextResponse.json({ error: "Invalid challenge" }, { status: 401 });
    }

    const payload = await request.json();
    const { invoice_id, status, api_ref } = payload as {
      invoice_id?: string;
      status?: string;
      api_ref?: string;
    };

    if (!api_ref || !api_ref.startsWith("streetlight_")) {
      return NextResponse.json({ message: "Ignored" }, { status: 200 });
    }

    const parts = api_ref.split("_");
    const supabase = createAdminSupabaseClient();

    if (parts[1] === "sub") {
      const tier = parts[2];
      const billingPeriod = parts[3];
      const userId = parts[4];

      if (
        !userId ||
        (tier !== "supporter" && tier !== "forgotten" && tier !== "watcher") ||
        (billingPeriod !== "monthly" && billingPeriod !== "yearly")
      ) {
        return NextResponse.json({ error: "Invalid subscription reference" }, { status: 400 });
      }

      if (!isCompletedPayment(status)) {
        return NextResponse.json({ message: "Subscription payment not completed" }, { status: 200 });
      }

      const periodEnd = getPeriodEnd(billingPeriod);
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", userId)
        .eq("tier", tier)
        .maybeSingle();

      if (existing) {
        await supabase
          .from("subscriptions")
          .update({
            status: "active",
            billing_period: billingPeriod,
            current_period_start: new Date().toISOString(),
            current_period_end: periodEnd.toISOString(),
            payment_reference: invoice_id ?? null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        await supabase.from("subscriptions").insert({
          user_id: userId,
          tier,
          status: "active",
          billing_period: billingPeriod,
          current_period_start: new Date().toISOString(),
          current_period_end: periodEnd.toISOString(),
          payment_provider: "intasend",
          payment_reference: invoice_id ?? null,
        });
      }

      return NextResponse.json({ message: "Subscription processed" });
    }

    const itemType = parts[1] as "chapter" | "post" | "book";
    const itemId = parts[2];
    const userId = parts[3];

    if (!userId || !itemId || !["chapter", "post", "book"].includes(itemType)) {
      return NextResponse.json({ error: "Invalid purchase reference" }, { status: 400 });
    }

    const { data: purchase } = await supabase
      .from("purchases")
      .select("*")
      .eq("user_id", userId)
      .eq("item_type", itemType)
      .eq("item_id", itemId)
      .eq("status", "pending")
      .maybeSingle();

    if (!purchase) {
      return NextResponse.json({ error: "Purchase not found" }, { status: 404 });
    }

    const newStatus = isCompletedPayment(status)
      ? "completed"
      : isFailedPayment(status)
        ? "failed"
        : "pending";

    await supabase
      .from("purchases")
      .update({
        status: newStatus,
        payment_reference: invoice_id ?? null,
      })
      .eq("id", purchase.id);

    return NextResponse.json({ message: "Purchase processed", status: newStatus });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const purchaseId = searchParams.get("purchase_id");

  if (purchaseId && status === "completed") {
    const supabase = createAdminSupabaseClient();
    await supabase
      .from("purchases")
      .update({ status: "completed" })
      .eq("id", purchaseId);
  }

  return NextResponse.json({ message: "Payment status updated" });
}
