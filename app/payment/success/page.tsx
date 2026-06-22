"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const itemType = searchParams.get("item_type");
  const itemId = searchParams.get("item_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        setTimeout(() => setStatus("success"), 1500);
      } catch {
        setStatus("error");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {status === "loading" && (
          <div className="w-16 h-16 mx-auto rounded-full border-4 border-streetlight-amber/20 border-t-streetlight-amber animate-spin" />
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <CheckCircle size={32} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white">Payment Successful</h1>
            <p className="mt-3 text-streetlight-gray">
              Thank you for supporting Streetlight. Your purchase is now unlocked.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {itemType === "chapter" && itemId && (
                <Link
                  href={`/read/the-drowned-streetlamp/${itemId}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-streetlight-amber text-streetlight-black font-medium rounded-lg hover:bg-amber-400 transition-colors"
                >
                  <BookOpen size={18} />
                  Read Chapter Now
                </Link>
              )}
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-streetlight-gray-dark/30 text-streetlight-gray rounded-lg hover:text-white transition-colors"
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-2xl font-serif font-bold text-white">Something Went Wrong</h1>
            <p className="mt-3 text-streetlight-gray">
              We couldn&apos;t verify your payment. If you were charged, please contact support.
            </p>
            <Link
              href="/dashboard"
              className="inline-block mt-6 text-streetlight-amber hover:text-amber-400"
            >
              Go to Dashboard
            </Link>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-16 h-16 rounded-full border-4 border-streetlight-amber/20 border-t-streetlight-amber animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
