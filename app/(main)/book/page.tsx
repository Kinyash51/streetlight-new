"use client";

import { motion } from "framer-motion";
import { BookCover } from "@/components/reading/BookCover";
import { mainStory } from "@/lib/data";
import { BookOpen, ShoppingBag, Bell } from "lucide-react";
import Link from "next/link";

export default function BookPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-2 flex justify-center"
          >
            <BookCover title={mainStory.title} subtitle="Urban Noir / Literary Mystery" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-3"
          >
            <p className="text-sm font-mono text-streetlight-amber tracking-wider uppercase mb-2">
              Featured Book
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
              {mainStory.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-streetlight-gray-dark">
              <span>{mainStory.genre}</span>
              <span className="w-1 h-1 rounded-full bg-streetlight-gray-dark" />
              <span>{mainStory.word_count.toLocaleString()} words</span>
              <span className="w-1 h-1 rounded-full bg-streetlight-gray-dark" />
              <span className="px-2 py-0.5 rounded-full bg-streetlight-cyan/10 text-streetlight-cyan text-xs">
                Beta Revision
              </span>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-streetlight-charcoal/50 border border-streetlight-gray-dark/20">
              <p className="text-streetlight-gray leading-relaxed">
                {mainStory.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/read/the-drowned-streetlamp/chapter-1"
                className="inline-flex items-center gap-2 px-6 py-3 bg-streetlight-amber text-streetlight-black font-medium rounded-lg hover:bg-amber-400 transition-colors"
              >
                <BookOpen size={18} />
                Read Sample
              </Link>
              <button
                onClick={() => alert("Payment integration coming soon. IntaSend will be connected here.")}
                className="inline-flex items-center gap-2 px-6 py-3 border border-streetlight-amber/30 text-streetlight-amber rounded-lg hover:bg-streetlight-amber/10 transition-colors"
              >
                <ShoppingBag size={18} />
                Get Full Book
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 border border-streetlight-gray-dark/30 text-streetlight-gray rounded-lg hover:border-streetlight-cyan/30 hover:text-streetlight-cyan transition-colors">
                <Bell size={18} />
                Join Updates
              </button>
            </div>

            <div className="mt-6 p-4 rounded-lg border border-dashed border-streetlight-gray-dark/30">
              <p className="text-sm text-streetlight-gray">
                Full book will be available for purchase once the beta revision is complete.
              </p>
              <p className="mt-1 text-xs text-streetlight-gray-dark">
                Expected price: 500 KES &bull; Payment via IntaSend (coming soon)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
