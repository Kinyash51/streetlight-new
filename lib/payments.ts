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
  id?: string;
  invoice_id?: string;
  status?: string;
}

export interface SubscriptionCustomerResponse {
  customer_id: string;
  id?: string;
}

export interface SubscriptionCustomerListResponse {
  results?: SubscriptionCustomerResponse[];
}

export interface SubscriptionCheckoutResponse {
  subscription_id: string;
  customer_id: string;
  reference: string;
  plan_id: string;
  status: string;
  setup_url: string;
}

const INTASEND_BASE_URL = "https://api.intasend.com/api/v1";

async function intasendRequest<T>(
  path: string,
  payload: object,
  bearerToken: string
): Promise<T> {
  if (!bearerToken) {
    throw new Error("IntaSend API key is not configured");
  }

  const response = await fetch(`${INTASEND_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearerToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`IntaSend request failed: ${error}`);
  }

  return response.json();
}

async function intasendGet<T>(
  path: string,
  bearerToken: string
): Promise<T> {
  if (!bearerToken) {
    throw new Error("IntaSend API key is not configured");
  }

  const response = await fetch(`${INTASEND_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearerToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`IntaSend request failed: ${error}`);
  }

  return response.json();
}

export async function createCheckoutLink(
  payload: CheckoutPayload,
  publicKey: string
): Promise<CheckoutResponse> {
  return intasendRequest<CheckoutResponse>("/checkout/", payload, publicKey);
}

export async function createSubscriptionCustomer(
  payload: {
    email: string;
    first_name: string;
    last_name: string;
    reference: string;
    country?: string;
  },
  secretKey: string
): Promise<SubscriptionCustomerResponse> {
  return intasendRequest<SubscriptionCustomerResponse>(
    "/subscriptions-customers/",
    payload,
    secretKey
  );
}

export async function getSubscriptionCustomerByReference(
  reference: string,
  secretKey: string
): Promise<SubscriptionCustomerResponse | null> {
  const data = await intasendGet<SubscriptionCustomerListResponse>(
    `/subscriptions-customers/?reference=${encodeURIComponent(reference)}`,
    secretKey
  );

  if (Array.isArray(data)) {
    return data[0] ?? null;
  }

  return data.results?.[0] ?? null;
}

export async function createSubscriptionCheckout(
  payload: {
    customer_id: string;
    reference: string;
    plan_id: string;
    redirect_url: string;
    start_date?: string;
  },
  secretKey: string
): Promise<SubscriptionCheckoutResponse> {
  return intasendRequest<SubscriptionCheckoutResponse>(
    "/subscriptions/",
    payload,
    secretKey
  );
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
