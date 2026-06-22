"use client";

import { motion } from "framer-motion";
import { LockBadge } from "./LockBadge";
import { ContentLockStatus } from "@/types";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  description: string;
  status: ContentLockStatus;
  href?: string;
  meta?: string;
  index?: number;
  className?: string;
}

export function ContentCard({
  title,
  description,
  status,
  href,
  meta,
  index = 0,
  className,
}: ContentCardProps) {
  const isLocked = status === "locked" || status === "premium";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-xl border border-streetlight-gray-dark/30 bg-streetlight-charcoal/50 p-6 transition-all duration-300",
        "hover:border-streetlight-amber/30 hover:bg-streetlight-charcoal/80",
        isLocked && "opacity-80",
        className
      )}
    >
      {href ? (
        <a href={href} className="block">
          <ContentCardInner
            title={title}
            description={description}
            status={status}
            meta={meta}
          />
        </a>
      ) : (
        <ContentCardInner
          title={title}
          description={description}
          status={status}
          meta={meta}
        />
      )}
    </motion.div>
  );
}

function ContentCardInner({
  title,
  description,
  status,
  meta,
}: Omit<ContentCardProps, "href" | "index" | "className">) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white group-hover:text-streetlight-amber transition-colors">
          {title}
        </h3>
        <LockBadge status={status} />
      </div>
      <p className="mt-3 text-sm text-streetlight-gray leading-relaxed line-clamp-3">
        {description}
      </p>
      {meta && (
        <p className="mt-4 text-xs text-streetlight-gray-dark font-mono">
          {meta}
        </p>
      )}
    </>
  );
}
