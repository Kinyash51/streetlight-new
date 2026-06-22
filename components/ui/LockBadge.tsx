"use client";

import { Lock, Crown, Clock, Check } from "lucide-react";
import { ContentLockStatus } from "@/types";
import { cn } from "@/lib/utils";

interface LockBadgeProps {
  status: ContentLockStatus;
  className?: string;
}

export function LockBadge({ status, className }: LockBadgeProps) {
  const configs = {
    free: {
      icon: Check,
      label: "Free",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    locked: {
      icon: Lock,
      label: "Locked",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
    },
    premium: {
      icon: Crown,
      label: "Premium",
      className: "bg-streetlight-amber/10 text-streetlight-amber border-streetlight-amber/20",
    },
    coming_soon: {
      icon: Clock,
      label: "Coming Soon",
      className: "bg-streetlight-cyan/10 text-streetlight-cyan border-streetlight-cyan/20",
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border",
        config.className,
        className
      )}
    >
      <Icon size={12} />
      {config.label}
    </span>
  );
}
