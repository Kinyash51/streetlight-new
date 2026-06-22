"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";

interface ReadingProgressCardProps {
  storyTitle: string;
  chapterTitle: string;
  progress: number;
  storySlug: string;
  chapterSlug: string;
  lastRead: string;
  index?: number;
}

export function ReadingProgressCard({
  storyTitle,
  chapterTitle,
  progress,
  storySlug,
  chapterSlug,
  lastRead,
  index = 0,
}: ReadingProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/read/${storySlug}/${chapterSlug}`}
        className="block group"
      >
        <div className="p-5 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/50 hover:border-streetlight-amber/30 hover:bg-streetlight-charcoal/80 transition-all duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-streetlight-amber font-mono tracking-wider uppercase mb-1">
                {storyTitle}
              </p>
              <h3 className="text-lg font-semibold text-white group-hover:text-streetlight-amber transition-colors truncate">
                {chapterTitle}
              </h3>
              <div className="flex items-center gap-3 mt-2 text-xs text-streetlight-gray-dark">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {lastRead}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-streetlight-amber/10 flex items-center justify-center group-hover:bg-streetlight-amber/20 transition-colors">
              <BookOpen size={18} className="text-streetlight-amber" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-streetlight-gray-dark">Progress</span>
              <span className="text-streetlight-amber font-medium">{progress}%</span>
            </div>
            <div className="h-1.5 bg-streetlight-gray-dark/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-streetlight-amber to-streetlight-cyan rounded-full"
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
