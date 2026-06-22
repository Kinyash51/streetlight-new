"use client";

import Link from "next/link";
import { Twitter, MessageCircle, Heart } from "lucide-react";

const footerLinks = [
  { href: "/read", label: "Read" },
  { href: "/book", label: "Book" },
  { href: "/universe", label: "Universe" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { href: "#", label: "X (Twitter)", icon: Twitter },
  { href: "#", label: "Discord", icon: MessageCircle },
];

export function Footer() {
  return (
    <footer className="border-t border-streetlight-gray-dark/20 bg-streetlight-charcoal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-streetlight-amber/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-streetlight-amber" />
              </div>
              <span className="text-lg font-serif font-bold text-white">
                Streetlight
              </span>
            </div>
            <p className="text-sm text-streetlight-gray leading-relaxed max-w-xs">
              Urban noir fiction by Trevor Kinyanjui. Stories of survival,
              memory, and secrets beneath neon light.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-streetlight-gray hover:text-streetlight-amber transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Connect
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-streetlight-surface flex items-center justify-center text-streetlight-gray hover:text-streetlight-amber hover:bg-streetlight-amber/10 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-streetlight-gray-dark">
              Patreon coming soon
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-streetlight-gray-dark/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-streetlight-gray-dark">
            &copy; {new Date().getFullYear()} Streetlight. Created by Trevor
            Kinyanjui.
          </p>
          <p className="text-xs text-streetlight-gray-dark flex items-center gap-1">
            Built with <Heart size={12} className="text-streetlight-amber" /> for
            readers
          </p>
        </div>
      </div>
    </footer>
  );
}
