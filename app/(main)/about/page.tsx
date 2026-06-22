"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <SectionHeading title="About" centered />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-12 space-y-8"
        >
          <div className="p-8 rounded-xl border border-streetlight-gray-dark/20 bg-streetlight-charcoal/30">
            <p className="text-lg text-streetlight-gray leading-relaxed">
              Streetlight is created by <strong className="text-white">Trevor Kinyanjui</strong>, 
              an independent writer building a dark urban story universe through novellas, episodes, 
              reader feedback, and cinematic worldbuilding.
            </p>
          </div>

          <div className="space-y-6 text-streetlight-gray leading-relaxed">
            <p>
              This is a solo project built with care, patience, and a deep love for the kind of 
              stories that live in the spaces between what we see and what the city hides. 
              Streetlight is not a corporation, a franchise, or a content factory. It is one 
              writer&apos;s attempt to build something that lasts.
            </p>

            <p>
              The stories are written, revised, and released based on their own schedule &mdash; not 
              a marketing calendar. Beta readers shape the final versions. Early supporters make 
              future chapters possible. And every reader who enters the city becomes part of its 
              mythology.
            </p>

            <p>
              If you want to follow along, the best way is to create an account and read. If you 
              want to support the work, premium content and direct support options are coming 
              soon.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-dashed border-streetlight-gray-dark/30 text-center">
            <p className="text-sm text-streetlight-gray-dark">
              Contact: hello@streetlight.fiction (placeholder)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
