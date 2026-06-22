import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createCheckoutLink, buildCheckoutPayload, getContentPrice } from "@/lib/payments";

export async function POST(request: NextRequest) {
  try {
    const { itemType, itemId, itemName } = await request.json();

    const supabase = await createServerSupabaseClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const userEmail = session.user.email || "";

    // Get price from server (never trust client)
    const price = getContentPrice(itemType);

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
      itemType,
      itemId,
      userId,
      userEmail,
      `${siteUrl}/payment/success?purchase_id=${purchase.id}&item_type=${itemType}&item_id=${itemId}`,
      price.amount,
      price.currency
    );

    // Create IntaSend checkout link
    const publicKey =
      process.env.INTASEND_PUBLIC_API_KEY ||
      process.env.NEXT_PUBLIC_INTASEND_PUBLIC_KEY ||
      "";
    const checkout = await createCheckoutLink(payload, publicKey);

    // Update purchase with payment reference
    await supabase
      .from("purchases")
      .update({ payment_reference: checkout.id })
      .eq("id", purchase.id);

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
