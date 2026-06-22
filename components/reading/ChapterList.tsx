"use client";

import { motion } from "framer-motion";
import { Lock, Unlock, Clock } from "lucide-react";
import { Chapter } from "@/types";
import { estimateReadingTime } from "@/lib/utils";
import Link from "next/link";

interface ChapterListProps {
  chapters: Chapter[];
  storySlug: string;
}

export function ChapterList({ chapters, storySlug }: ChapterListProps) {
  return (
    <div className="space-y-3">
      {chapters.map((chapter, index) => {
        const isLocked = chapter.is_premium;
        const href = isLocked
          ? `#` // Will trigger payment modal in future
          : `/read/${storySlug}/${chapter.slug}`;

        return (
          <motion.div
            key={chapter.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              href={href}
              onClick={(e) => {
                if (isLocked) {
                  e.preventDefault();
                  // TODO: Trigger payment modal
                  alert("This chapter is premium. Payment integration coming soon.");
                }
              }}
              className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                isLocked
                  ? "border-streetlight-gray-dark/20 bg-streetlight-charcoal/30 opacity-70 cursor-not-allowed"
                  : "border-streetlight-gray-dark/20 bg-streetlight-charcoal/50 hover:border-streetlight-amber/30 hover:bg-streetlight-charcoal/80"
              }`}
            >
              {/* Chapter Number */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold ${
                  isLocked
                    ? "bg-streetlight-gray-dark/20 text-streetlight-gray-dark"
                    : "bg-streetlight-amber/10 text-streetlight-amber group-hover:bg-streetlight-amber/20"
                }`}
              >
                {isLocked ? <Lock size={14} /> : chapter.chapter_number}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium truncate ${
                    isLocked ? "text-streetlight-gray-dark" : "text-white group-hover:text-streetlight-amber transition-colors"
                  }`}
                >
                  {chapter.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-streetlight-gray-dark">
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {isLocked ? "Locked" : estimateReadingTime(chapter.word_count)}
                  </span>
                  {isLocked && (
                    <span className="px-2 py-0.5 rounded-full bg-streetlight-amber/10 text-streetlight-amber text-[10px] font-medium">
                      PREMIUM
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow */}
              {!isLocked && (
                <div className="flex-shrink-0 text-streetlight-gray-dark group-hover:text-streetlight-amber transition-colors">
                  <Unlock size={16} />
                </div>
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
