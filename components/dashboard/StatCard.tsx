"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: "amber" | "cyan" | "gray";
  index?: number;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  color = "amber",
  index = 0,
}: StatCardProps) {
  const colorClasses = {
    amber: "text-streetlight-amber bg-streetlight-amber/10",
    cyan: "text-streetlight-cyan bg-streetlight-cyan/10",
    gray: "text-streetlight-gray bg-streetlight-gray/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-5 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/50"
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div>
          <p className="text-xs text-streetlight-gray-dark uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
