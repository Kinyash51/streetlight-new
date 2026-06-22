"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { universeLore } from "@/lib/data";
import { Building2, Users, Eye, Radio, Layers } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{size?: number, className?: string}>> = {
  Building2,
  Users,
  Eye,
  Radio,
  Layers,
};

export default function UniversePage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="The Universe"
          subtitle="The city has no name. Names are for places that want to be found."
          centered
        />

        <div className="mt-12 space-y-8">
          {universeLore.map((lore, i) => {
            const Icon = iconMap[lore.icon] || Building2;
            return (
              <motion.div
                key={lore.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group p-6 md:p-8 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30 hover:border-streetlight-amber/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-streetlight-amber/10 flex items-center justify-center group-hover:bg-streetlight-amber/20 transition-colors">
                    <Icon size={24} className="text-streetlight-amber" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-streetlight-amber transition-colors">
                      {lore.title}
                    </h3>
                    <p className="mt-2 text-streetlight-gray leading-relaxed">
                      {lore.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center p-8 rounded-xl border border-dashed border-streetlight-gray-dark/30"
        >
          <p className="text-streetlight-gray italic">
            &ldquo;The city remembers everything. It just chooses when to speak.&rdquo;
          </p>
        </motion.div>
      </div>
    </div>
  );
}
