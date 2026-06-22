"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  type = "button",
  className,
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-streetlight-black";

  const variants = {
    primary:
      "bg-streetlight-amber text-streetlight-black hover:bg-amber-400 focus:ring-streetlight-amber shadow-lg shadow-streetlight-amber/20",
    secondary:
      "bg-streetlight-cyan text-streetlight-black hover:bg-cyan-400 focus:ring-streetlight-cyan shadow-lg shadow-streetlight-cyan/20",
    ghost:
      "bg-transparent text-streetlight-gray hover:text-white hover:bg-white/5 focus:ring-streetlight-gray",
    outline:
      "bg-transparent border border-streetlight-gray-dark text-streetlight-gray hover:border-streetlight-amber hover:text-streetlight-amber focus:ring-streetlight-amber",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const combinedClass = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <motion.span
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className={combinedClass}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClass}
    >
      {content}
    </button>
  );
}
