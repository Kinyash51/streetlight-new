"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

interface BookCoverProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function BookCover({ title, subtitle, className = "" }: BookCoverProps) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateY: 5 }}
      transition={{ duration: 0.4 }}
      className={`relative group ${className}`}
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-48 md:w-56 aspect-[2/3] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
        {/* Cover Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-streetlight-charcoal via-streetlight-black to-streetlight-rain" />

        {/* Rain Effect */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-streetlight-cyan to-transparent"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${30 + Math.random() * 40}%`,
                top: `${Math.random() * 60}%`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>

        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-streetlight-amber/10 blur-3xl" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-streetlight-amber/20 flex items-center justify-center mb-4">
            <BookOpen size={24} className="text-streetlight-amber" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white leading-tight">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-2 text-xs text-streetlight-gray leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* Spine Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-white/5 to-transparent" />

        {/* Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-streetlight-amber/30 via-streetlight-cyan/20 to-transparent" />
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/30 rounded-full blur-xl" />
    </motion.div>
  );
}
