"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Clock,
  BarChart3,
  Share2,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { Chapter } from "@/types";
import { estimateReadingTime } from "@/lib/utils";
import Link from "next/link";

interface ChapterReaderProps {
  chapter: Chapter;
  prevChapter?: { slug: string; title: string };
  nextChapter?: { slug: string; title: string };
  storySlug: string;
  totalChapters: number;
}

export function ChapterReader({
  chapter,
  prevChapter,
  nextChapter,
  storySlug,
  totalChapters,
}: ChapterReaderProps) {
  const [progress, setProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Save to Supabase bookmarks table
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const progressPercent = Math.round(progress);

  return (
    <div className="min-h-screen bg-streetlight-black">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-streetlight-charcoal">
        <motion.div
          className="h-full bg-gradient-to-r from-streetlight-amber to-streetlight-cyan"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Top Bar */}
      <div className="fixed top-1 left-0 right-0 z-40 bg-streetlight-black/90 backdrop-blur-md border-b border-streetlight-gray-dark/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href={`/read/${storySlug}`}
            className="flex items-center gap-2 text-sm text-streetlight-gray hover:text-white transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Chapters</span>
          </Link>

          <div className="flex items-center gap-1 text-xs text-streetlight-gray-dark">
            <BarChart3 size={14} />
            <span>{progressPercent}%</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked
                  ? "text-streetlight-amber bg-streetlight-amber/10"
                  : "text-streetlight-gray-dark hover:text-streetlight-gray"
              }`}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-streetlight-gray-dark hover:text-streetlight-gray transition-colors"
              aria-label="Toggle fullscreen"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Chapter Content */}
      <article className="pt-20 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Chapter Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-mono text-streetlight-amber mb-3 tracking-wider uppercase">
              Chapter {chapter.chapter_number}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
              {chapter.title}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-streetlight-gray-dark">
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {estimateReadingTime(chapter.word_count)}
              </span>
              <span className="w-1 h-1 rounded-full bg-streetlight-gray-dark" />
              <span>{chapter.word_count.toLocaleString()} words</span>
            </div>
          </motion.header>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-streetlight-gray-dark/30" />
            <div className="w-2 h-2 rounded-full bg-streetlight-amber/50" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-streetlight-gray-dark/30" />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {chapter.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-lg md:text-xl leading-relaxed text-streetlight-gray mb-6 font-serif"
                style={{ textIndent: i > 0 ? "1.5em" : "0" }}
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

          {/* End Marker */}
          <div className="flex items-center justify-center gap-4 mt-16 mb-8">
            <div className="h-px w-12 bg-streetlight-gray-dark/30" />
            <div className="w-3 h-3 rotate-45 border border-streetlight-amber/50" />
            <div className="h-px w-12 bg-streetlight-gray-dark/30" />
          </div>
          <p className="text-center text-sm text-streetlight-gray-dark font-mono tracking-wider">
            END OF CHAPTER {chapter.chapter_number}
          </p>
        </div>
      </article>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-streetlight-black/95 backdrop-blur-md border-t border-streetlight-gray-dark/10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          {prevChapter ? (
            <Link
              href={`/read/${storySlug}/${prevChapter.slug}`}
              className="flex items-center gap-2 text-sm text-streetlight-gray hover:text-white transition-colors group"
            >
              <ChevronLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <div className="hidden sm:block text-right">
                <p className="text-xs text-streetlight-gray-dark">Previous</p>
                <p className="font-medium truncate max-w-[150px]">
                  {prevChapter.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          <div className="text-center">
            <p className="text-xs text-streetlight-gray-dark">
              {chapter.chapter_number} / {totalChapters}
            </p>
          </div>

          {nextChapter ? (
            <Link
              href={`/read/${storySlug}/${nextChapter.slug}`}
              className="flex items-center gap-2 text-sm text-streetlight-gray hover:text-white transition-colors group"
            >
              <div className="hidden sm:block text-left">
                <p className="text-xs text-streetlight-gray-dark">Next</p>
                <p className="font-medium truncate max-w-[150px]">
                  {nextChapter.title}
                </p>
              </div>
              <ChevronRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
