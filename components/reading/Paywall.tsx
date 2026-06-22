"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, ShoppingBag, Loader2, Crown, Star, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getContentPrice } from "@/lib/payments";
import { type UserTier } from "@/lib/purchases";
import Link from "next/link";

interface PaywallProps {
  itemType: "chapter" | "post" | "book";
  itemId: string;
  itemName: string;
  storySlug?: string;
  userTier?: UserTier;
  requiredTier?: UserTier;
  upgradeMessage?: string;
}

const TIER_INFO: Record<UserTier, { name: string; icon: React.ComponentType<{ size?: number; className?: string }>; color: string; price: number }> = {
  free: { name: "Free", icon: Lock, color: "text-streetlight-gray", price: 0 },
  supporter: { name: "Supporter", icon: Sparkles, color: "text-streetlight-amber", price: 300 },
  forgotten: { name: "The Forgotten", icon: Star, color: "text-streetlight-cyan", price: 800 },
  watcher: { name: "The Watcher", icon: Crown, color: "text-purple-400", price: 1500 },
};

const TIER_LEVELS: Record<UserTier, number> = {
  free: 0,
  supporter: 1,
  forgotten: 2,
  watcher: 3,
};

export function Paywall({
  itemType,
  itemId,
  itemName,
  userTier = "free",
  requiredTier = "supporter",
  upgradeMessage = "This content is available to subscribers",
}: PaywallProps) {
  const [loading, setLoading] = useState(false);
  const price = getContentPrice(itemType);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/payments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemType, itemId, itemName }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Failed to create checkout. Please try again.");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (tier: UserTier) => {
    setLoading(true);
    try {
      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, billingPeriod: "monthly" }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Failed to create subscription. Please try again.");
      }
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSubscribed = userTier !== "free";
  const needsUpgrade = isSubscribed && TIER_LEVELS[userTier] < TIER_LEVELS[requiredTier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-12 p-8 md:p-12 rounded-xl border border-streetlight-amber/20 bg-streetlight-amber/5 text-center"
    >
      <div className="w-16 h-16 mx-auto rounded-full bg-streetlight-amber/10 flex items-center justify-center mb-6">
        <Lock size={28} className="text-streetlight-amber" />
      </div>

      <h3 className="text-xl font-semibold text-white">Premium Content</h3>
      <p className="mt-2 text-streetlight-gray max-w-md mx-auto">
        {upgradeMessage}
      </p>

      {isSubscribed && needsUpgrade && (
        <div className="mt-4 p-4 rounded-lg bg-streetlight-charcoal/50 border border-streetlight-cyan/20">
          <p className="text-sm text-streetlight-cyan">
            You&apos;re currently a <span className="font-semibold">{TIER_INFO[userTier].name}</span>.
            Upgrade to <span className="font-semibold">{TIER_INFO[requiredTier].name}</span> to unlock this content.
          </p>
        </div>
      )}

      <div className="mt-8 p-6 rounded-lg border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30">
        <p className="text-sm text-streetlight-gray-dark uppercase tracking-wider mb-3">One-Time Purchase</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl font-bold text-white">{price.amount}</span>
          <span className="text-lg text-streetlight-gray">{price.currency}</span>
        </div>
        <Button
          variant="outline"
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              Unlock This Chapter
            </>
          )}
        </Button>
      </div>

      <div className="mt-6">
        <p className="text-sm text-streetlight-gray-dark uppercase tracking-wider mb-4">Or Subscribe for Access</p>
        <div className="grid sm:grid-cols-3 gap-3 max-w-lg mx-auto">
          {(Object.keys(TIER_INFO) as UserTier[]).filter((tier) => tier !== "free").map((tier) => {
            const info = TIER_INFO[tier];
            const Icon = info.icon;
            const isRequired = tier === requiredTier;

            return (
              <button
                key={tier}
                onClick={() => handleSubscribe(tier)}
                disabled={loading}
                className={`p-4 rounded-lg border transition-all ${
                  isRequired
                    ? "border-streetlight-amber/30 bg-streetlight-amber/10"
                    : "border-streetlight-gray-dark/20 bg-streetlight-charcoal/30 hover:border-streetlight-gray-dark/40"
                }`}
              >
                <Icon size={20} className={`mx-auto mb-2 ${info.color}`} />
                <p className="text-sm font-medium text-white">{info.name}</p>
                <p className="text-xs text-streetlight-gray-dark">{info.price} KES/mo</p>
                {isRequired && (
                  <span className="inline-block mt-2 px-2 py-0.5 text-[10px] bg-streetlight-amber text-streetlight-black rounded-full font-bold">
                    Required
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 text-sm text-streetlight-amber hover:text-amber-400 transition-colors"
        >
          View all plans and benefits
          <ArrowRight size={14} />
        </Link>
      </div>

      <p className="mt-4 text-xs text-streetlight-gray-dark">
        Secure payment via IntaSend. M-Pesa and card payments accepted.
      </p>
    </motion.div>
  );
}
