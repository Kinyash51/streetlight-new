import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createCheckoutLink, buildCheckoutPayload, getContentPrice } from "@/lib/payments";

const VALID_ITEM_TYPES = ["chapter", "post", "book"] as const;
type ItemType = (typeof VALID_ITEM_TYPES)[number];

export async function POST(request: NextRequest) {
  try {
    const { itemType, itemId, itemName } = await request.json();

    if (!VALID_ITEM_TYPES.includes(itemType) || !itemId) {
      return NextResponse.json({ error: "Invalid purchase item" }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email || "";

    // Get price from server (never trust client)
    const price = getContentPrice(itemType as ItemType);

    // Create purchase record (pending)
    const { data: purchase, error: purchaseError } = await supabase
      .from("purchases")
      .insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId,
        status: "pending",
        payment_provider: "intasend",
        amount: price.amount,
        currency: price.currency,
      })
      .select()
      .single();

    if (purchaseError || !purchase) {
      return NextResponse.json({ error: "Failed to create purchase" }, { status: 500 });
    }

    // Build checkout payload
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const payload = buildCheckoutPayload(
      itemType as ItemType,
      itemId,
      userId,
      userEmail,
      `${siteUrl}/payment/success?purchase_id=${purchase.id}`,
      price.amount,
      price.currency
    );

    // Create IntaSend checkout link
    const publicKey =
      process.env.INTASEND_PUBLIC_API_KEY ||
      process.env.NEXT_PUBLIC_INTASEND_PUBLIC_KEY ||
      "";
    if (!publicKey) {
      return NextResponse.json({ error: "Missing IntaSend public API key" }, { status: 500 });
    }

    const checkout = await createCheckoutLink(payload, publicKey);
    const paymentReference = checkout.invoice_id || checkout.id || null;

    // Update purchase with payment reference
    if (paymentReference) {
      await supabase
        .from("purchases")
        .update({ payment_reference: paymentReference })
        .eq("id", purchase.id);
    }

    return NextResponse.json({ 
      checkoutUrl: checkout.url,
      purchaseId: purchase.id 
    });

  } catch (error: any) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { error: error.message || "Payment initiation failed" },
      { status: 500 }
    );
  }
}
