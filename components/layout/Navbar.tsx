"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, BookOpen, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const navLinks = [
  { href: "/read", label: "Read" },
  { href: "/book", label: "Book" },
  { href: "/pricing", label: "Pricing" },
  { href: "/universe", label: "Universe" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-50 border-b border-streetlight-gray-dark/20 bg-streetlight-black/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-streetlight-amber/20 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-streetlight-amber shadow-lg shadow-streetlight-amber/50 group-hover:shadow-streetlight-amber/80 transition-shadow" />
              </div>
            </div>
            <span className="text-xl font-serif font-bold text-white tracking-tight">
              Streetlight
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-streetlight-gray hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="h-9 w-32 rounded-lg bg-streetlight-charcoal/60" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-streetlight-gray hover:text-white transition-colors"
                >
                  <User size={16} />
                  <span className="max-w-[120px] truncate">
                    {user.display_name || user.email}
                  </span>
                </Link>
                <button
                  onClick={signOut}
                  className="text-sm text-streetlight-gray-dark hover:text-streetlight-gray transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm text-streetlight-gray hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-streetlight-amber text-streetlight-black rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Join the City
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-streetlight-gray hover:text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-streetlight-gray-dark/20 bg-streetlight-black"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 text-streetlight-gray hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-streetlight-gray-dark/20">
                {loading ? (
                  <div className="h-10 rounded-lg bg-streetlight-charcoal/60" />
                ) : user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 py-2 text-streetlight-gray hover:text-white"
                    >
                      <BookOpen size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileOpen(false);
                      }}
                      className="block py-2 text-streetlight-gray-dark hover:text-streetlight-gray"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-streetlight-gray hover:text-white"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-streetlight-amber font-medium"
                    >
                      Join the City
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
