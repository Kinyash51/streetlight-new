import { createServerSupabaseClient } from "@/lib/supabase-server";

export type UserTier = "free" | "supporter" | "forgotten" | "watcher";

export const TIER_LEVELS: Record<UserTier, number> = {
  free: 0,
  supporter: 1,
  forgotten: 2,
  watcher: 3,
};

export async function hasPurchased(
  userId: string,
  itemType: "chapter" | "post" | "book",
  itemId: string
): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("id")
    .eq("user_id", userId)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .eq("status", "completed")
    .single();

  return !error && !!data;
}

export async function getUserPurchases(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("purchases")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "completed")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function getUserTier(userId: string): Promise<UserTier> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("tier")
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("current_period_end", new Date().toISOString());

  if (error || !data || data.length === 0) return "free";

  return data.reduce<UserTier>((highest, subscription) => {
    const tier = subscription.tier as UserTier;
    return TIER_LEVELS[tier] > TIER_LEVELS[highest] ? tier : highest;
  }, "free");
}

export function hasRequiredTier(userTier: UserTier, requiredTier: UserTier): boolean {
  return TIER_LEVELS[userTier] >= TIER_LEVELS[requiredTier];
}

export async function hasContentAccess(
  userId: string,
  contentType: "chapter" | "post" | "book" | "exclusive",
  contentId: string,
  requiredTier: UserTier = "supporter"
): Promise<boolean> {
  const purchased = await hasPurchased(
    userId,
    contentType === "exclusive" ? "post" : contentType,
    contentId
  );

  if (purchased) return true;

  const userTier = await getUserTier(userId);
  return hasRequiredTier(userTier, requiredTier);
}

export async function getUserSubscriptions(userId: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .gt("current_period_end", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export async function createPurchase(
  userId: string,
  itemType: "chapter" | "post" | "book",
  itemId: string,
  amount: number,
  currency: string = "KES",
  paymentReference?: string
) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("purchases")
    .insert({
      user_id: userId,
      item_type: itemType,
      item_id: itemId,
      status: "pending",
      payment_provider: "intasend",
      payment_reference: paymentReference || null,
      amount,
      currency,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updatePurchaseStatus(
  purchaseId: string,
  status: "pending" | "completed" | "failed" | "refunded"
) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("purchases")
    .update({ status })
    .eq("id", purchaseId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: "active" | "cancelled" | "expired" | "past_due"
) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("subscriptions")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", subscriptionId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
