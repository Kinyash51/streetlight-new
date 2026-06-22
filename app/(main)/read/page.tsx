"use client";

import { motion } from "framer-motion";
import { BookCover } from "@/components/reading/BookCover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LockBadge } from "@/components/ui/LockBadge";
import { mainStory, sampleChapters } from "@/lib/data";
import { estimateReadingTime } from "@/lib/utils";
import Link from "next/link";

export default function ReadPage() {
  const freeChapters = sampleChapters.filter((c) => !c.is_premium);
  const premiumChapters = sampleChapters.filter((c) => c.is_premium);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Read"
          subtitle="Stories from the rain-soaked city. Free chapters available now. Premium content coming soon."
        />

        {/* Featured Story */}
        <div className="mt-12">
          <div className="p-8 md:p-12 rounded-2xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/50">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="flex justify-center">
                <BookCover
                  title="The Drowned Streetlamp"
                  subtitle="Urban Noir / Literary Mystery"
                  className="scale-90"
                />
              </div>
              <div className="md:col-span-2">
                <div className="flex items-center gap-3 mb-3">
                  <LockBadge status="free" />
                  <span className="text-xs text-streetlight-gray-dark font-mono">
                    {mainStory.word_count.toLocaleString()} words
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
                  {mainStory.title}
                </h2>
                <p className="mt-3 text-streetlight-gray leading-relaxed">
                  {mainStory.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/read/${mainStory.slug}/chapter-1`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-streetlight-amber text-streetlight-black font-medium rounded-lg hover:bg-amber-400 transition-colors"
                  >
                    Start Reading
                  </Link>
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-streetlight-gray-dark/30 text-streetlight-gray rounded-lg hover:border-streetlight-amber/30 hover:text-white transition-colors"
                  >
                    View Book Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter List */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-white mb-6">Chapters</h3>
          <div className="grid gap-3">
            {sampleChapters.map((chapter, i) => (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/read/${mainStory.slug}/${chapter.slug}`}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                    chapter.is_premium
                      ? "border-streetlight-gray-dark/10 bg-streetlight-charcoal/30 opacity-60 cursor-not-allowed"
                      : "border-streetlight-gray-dark/20 bg-streetlight-charcoal/50 hover:border-streetlight-amber/30"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-sm font-bold ${
                      chapter.is_premium
                        ? "bg-streetlight-gray-dark/20 text-streetlight-gray-dark"
                        : "bg-streetlight-amber/10 text-streetlight-amber"
                    }`}
                  >
                    {chapter.chapter_number}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-white">{chapter.title}</h4>
                    <p className="text-xs text-streetlight-gray-dark mt-0.5">
                      {chapter.is_premium
                        ? "Premium"
                        : estimateReadingTime(chapter.word_count)}
                    </p>
                  </div>
                  <LockBadge status={chapter.is_premium ? "premium" : "free"} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
