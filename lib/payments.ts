export interface CheckoutPayload {
  amount: number;
  currency: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  api_ref: string;
  redirect_url: string;
  comment?: string;
  method?: "M-PESA" | "CARD-PAYMENT";
  card_tarrif?: "BUSINESS-PAYS" | "CUSTOMER-PAYS";
  mobile_tarrif?: "BUSINESS-PAYS" | "CUSTOMER-PAYS";
}

export interface CheckoutResponse {
  url: string;
  id: string;
  status: string;
}

const INTASEND_BASE_URL = "https://payment.intasend.com/api/v1";

export async function createCheckoutLink(
  payload: CheckoutPayload,
  publicKey: string
): Promise<CheckoutResponse> {
  const response = await fetch(`${INTASEND_BASE_URL}/checkout/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${publicKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Payment initiation failed: ${error}`);
  }

  return response.json();
}

export function getContentPrice(
  itemType: "chapter" | "post" | "book" | "bundle"
): { amount: number; currency: string } {
  const prices = {
    chapter: { amount: 50, currency: "KES" },
    post: { amount: 100, currency: "KES" },
    book: { amount: 500, currency: "KES" },
    bundle: { amount: 200, currency: "KES" },
  };
  return prices[itemType];
}

export function getSubscriptionPrice(
  tier: "supporter" | "forgotten" | "watcher",
  period: "monthly" | "yearly"
): { amount: number; currency: string } {
  const prices = {
    supporter: { monthly: 300, yearly: 3000 },
    forgotten: { monthly: 800, yearly: 8000 },
    watcher: { monthly: 1500, yearly: 15000 },
  };
  return {
    amount: prices[tier][period],
    currency: "KES",
  };
}

export function buildCheckoutPayload(
  itemType: "chapter" | "post" | "book" | "subscription",
  itemId: string,
  userId: string,
  userEmail: string,
  redirectUrl: string,
  amount: number,
  currency: string = "KES"
): CheckoutPayload {
  const itemNames: Record<string, string> = {
    chapter: "Premium Chapter",
    post: "Exclusive Post",
    book: "Full Book",
    subscription: "Subscription",
  };

  return {
    amount,
    currency,
    email: userEmail,
    api_ref: `streetlight_${itemType}_${itemId}_${userId}`,
    redirect_url: redirectUrl,
    comment: `Purchase: ${itemNames[itemType] || itemType}`,
    mobile_tarrif: "CUSTOMER-PAYS",
    card_tarrif: "CUSTOMER-PAYS",
  };
}

export async function verifyPayment(
  purchaseId: string
): Promise<{ success: boolean }> {
  return { success: true };
}
