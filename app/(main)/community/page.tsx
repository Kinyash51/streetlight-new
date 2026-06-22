"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Users, MessageCircle, Star, FileText } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Community"
          subtitle="Streetlight is still growing. This is the place for early readers, beta readers, supporters, and anyone who wants to follow the universe from the beginning."
          centered
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Users,
              title: "Join Early Readers",
              desc: "Be among the first to read new chapters and provide feedback that shapes the story.",
              action: "Coming Soon",
            },
            {
              icon: MessageCircle,
              title: "Discord Server",
              desc: "Discuss theories, share reactions, and connect with other readers in the community.",
              action: "Launching Soon",
            },
            {
              icon: Star,
              title: "Patreon / Exclusive Content",
              desc: "Support the project and unlock behind-the-scenes content, early drafts, and exclusive notes.",
              action: "Coming Soon",
            },
            {
              icon: FileText,
              title: "Reader Theories",
              desc: "Share your theories about the Ghosts, the Echo, and what the city is hiding.",
              action: "Coming Soon",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30"
              >
                <div className="w-10 h-10 rounded-lg bg-streetlight-cyan/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-streetlight-cyan" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-streetlight-gray leading-relaxed">
                  {item.desc}
                </p>
                <p className="mt-4 text-xs text-streetlight-gray-dark font-mono">
                  {item.action}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16">
          <SectionHeading title="Beta Reader Updates" />
          <div className="mt-6 p-6 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30">
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-streetlight-amber" />
              <div>
                <p className="text-sm font-medium text-white">Beta Reading Round 1 &mdash; Complete</p>
                <p className="text-xs text-streetlight-gray mt-1">
                  Chapters 1-2 reviewed by 3 beta readers. Feedback incorporated into revision.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 mt-4">
              <div className="w-2 h-2 mt-2 rounded-full bg-streetlight-cyan" />
              <div>
                <p className="text-sm font-medium text-white">Beta Reading Round 2 &mdash; Open</p>
                <p className="text-xs text-streetlight-gray mt-1">
                  Seeking 5 additional readers for Chapters 3-5. Apply via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
