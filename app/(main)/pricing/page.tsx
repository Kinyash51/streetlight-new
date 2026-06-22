"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Check, BookOpen, Sparkles, Crown, Star, Zap } from "lucide-react";
import { useState } from "react";
import { type UserTier } from "@/lib/purchases";

interface PricingTier {
  name: string;
  price: number;
  currency: string;
  period: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  features: string[];
  highlighted?: boolean;
  cta: string;
  href: string;
  tierId?: Exclude<UserTier, "free">;
}

const tiers: PricingTier[] = [
  {
    name: "Free Reader",
    price: 0,
    currency: "KES",
    period: "forever",
    description: "Start reading. No commitment. The city is open.",
    icon: BookOpen,
    features: [
      "Access to all free chapters",
      "Community discussions",
      "Email updates on new releases",
      "Beta reading opportunities (limited)",
    ],
    cta: "Start Reading",
    href: "/read",
  },
  {
    name: "Streetlight Supporter",
    price: 300,
    currency: "KES",
    period: "month",
    description: "Support the story and get early access to new chapters.",
    icon: Sparkles,
    features: [
      "Everything in Free Reader",
      "Early access to new chapters (1 week ahead)",
      "Behind-the-scenes author notes",
      "Exclusive community Discord channel",
      "Monthly newsletter with story insights",
    ],
    highlighted: true,
    cta: "Join as Supporter",
    href: "#subscribe-supporter",
    tierId: "supporter",
  },
  {
    name: "The Forgotten",
    price: 800,
    currency: "KES",
    period: "month",
    description: "Deeper access. Exclusive content. Become part of the lore.",
    icon: Star,
    features: [
      "Everything in Supporter",
      "Early access to new chapters (2 weeks ahead)",
      "Exclusive short stories & side content",
      "Beta reader access to drafts",
      "Character art & world-building notes",
      "Monthly live Q&A with the author",
    ],
    cta: "Join The Forgotten",
    href: "#subscribe-forgotten",
    tierId: "forgotten",
  },
  {
    name: "The Watcher",
    price: 1500,
    currency: "KES",
    period: "month",
    description: "The inner circle. Everything. Plus the physical world.",
    icon: Crown,
    features: [
      "Everything in The Forgotten",
      "Early access to new chapters (1 month ahead)",
      "Signed digital ebook of each completed book",
      "Your name in the book credits",
      "Personal thank-you video each quarter",
      "Direct feedback channel with the author",
      "First access to merchandise drops",
    ],
    cta: "Become a Watcher",
    href: "#subscribe-watcher",
    tierId: "watcher",
  },
];

const oneTimePurchases = [
  {
    title: "The Drowned Streetlamp — Ebook",
    price: 500,
    currency: "KES",
    description: "Complete digital edition. All chapters. Exclusive author afterword.",
    icon: BookOpen,
    href: "#buy-ebook",
  },
  {
    title: "Premium Chapter Bundle",
    price: 200,
    currency: "KES",
    description: "Unlock 5 premium chapters at once. Save 50 KES.",
    icon: Zap,
    href: "#buy-bundle",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const yearlyDiscount = 0.17; // 2 months free

  const handleSubscribe = async (tier: Exclude<UserTier, "free">) => {
    setLoadingTier(tier);
    try {
      const response = await fetch("/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, billingPeriod }),
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
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionHeading
          title="Support the City"
          subtitle="Streetlight is an independent project. Your support keeps the story alive, the chapters coming, and the universe growing."
          centered
        />

        {/* Billing Toggle */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setBillingPeriod("monthly")}
            className={`text-sm font-medium transition-colors ${
              billingPeriod === "monthly" ? "text-white" : "text-streetlight-gray-dark"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod("yearly")}
            className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all ${
              billingPeriod === "yearly"
                ? "bg-streetlight-amber text-streetlight-black"
                : "bg-streetlight-charcoal text-streetlight-gray"
            }`}
          >
            Yearly
            {billingPeriod === "yearly" && (
              <span className="absolute -top-2 -right-2 px-2 py-0.5 text-[10px] bg-streetlight-cyan text-streetlight-black rounded-full font-bold">
                Save 17%
              </span>
            )}
          </button>
        </div>

        {/* Tiers */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            const price = billingPeriod === "yearly"
              ? Math.round(tier.price * 12 * (1 - yearlyDiscount))
              : tier.price;
            const period = billingPeriod === "yearly" ? "year" : tier.period;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-xl border p-6 transition-all duration-300 ${
                  tier.highlighted
                    ? "border-streetlight-amber/30 bg-streetlight-amber/5 shadow-lg shadow-streetlight-amber/10"
                    : "border-streetlight-gray-dark/20 bg-streetlight-charcoal/30 hover:border-streetlight-gray-dark/40"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-streetlight-amber text-streetlight-black text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="w-10 h-10 rounded-lg bg-streetlight-amber/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-streetlight-amber" />
                </div>

                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-streetlight-gray leading-relaxed">
                  {tier.description}
                </p>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {price === 0 ? "Free" : `${price} ${tier.currency}`}
                  </span>
                  {price > 0 && (
                    <span className="text-sm text-streetlight-gray-dark">/{period}</span>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-streetlight-gray">
                      <Check size={14} className="text-streetlight-amber mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    href={tier.tierId ? undefined : tier.href}
                    onClick={tier.tierId ? () => handleSubscribe(tier.tierId!) : undefined}
                    variant={tier.highlighted ? "primary" : "outline"}
                    fullWidth
                    disabled={loadingTier === tier.tierId}
                  >
                    {loadingTier === tier.tierId ? "Opening checkout..." : tier.cta}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* One-Time Purchases */}
        <div className="mt-20">
          <SectionHeading
            title="One-Time Purchases"
            subtitle="No subscription needed. Buy once, own forever."
            centered
          />

          <div className="mt-10 grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {oneTimePurchases.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30 hover:border-streetlight-cyan/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-streetlight-cyan/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-streetlight-cyan" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-streetlight-gray">{item.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-white">{item.price} {item.currency}</span>
                    <span className="text-sm text-streetlight-gray-dark">one-time</span>
                  </div>
                  <div className="mt-4">
                    <Button href={item.href} variant="secondary" fullWidth>
                      Purchase
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <SectionHeading title="Frequently Asked" centered />
          <div className="mt-10 space-y-4">
            {[
              {
                q: "Can I cancel anytime?",
                a: "Yes. Subscriptions can be cancelled at any time. You'll keep access until the end of your billing period.",
              },
              {
                q: "What payment methods are accepted?",
                a: "M-Pesa, card payments, and bank transfers via IntaSend. All transactions are secure and processed in KES.",
              },
              {
                q: "Do I get access to past premium content?",
                a: "Yes. Subscribers get access to all previously released premium chapters and posts for their tier.",
              },
              {
                q: "What's the difference between the ebook and subscription?",
                a: "The ebook is a one-time purchase of the completed book. Subscriptions give ongoing access to new chapters, exclusive content, and community features as the story grows.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-lg border border-streetlight-gray-dark/20 bg-streetlight-charcoal/20"
              >
                <h4 className="font-medium text-white">{faq.q}</h4>
                <p className="mt-2 text-sm text-streetlight-gray leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
