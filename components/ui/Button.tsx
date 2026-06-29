"use client";

import React from "react";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none";
    
    const variants = {
      primary: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg hover:shadow-indigo-500/25 border border-indigo-500/20 hover:brightness-110",
      secondary: "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700",
      outline: "border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900",
      ghost: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900",
      glass: "backdrop-blur-md bg-white/10 dark:bg-slate-950/20 border border-white/20 dark:border-slate-800/40 text-slate-800 dark:text-white hover:bg-white/20 dark:hover:bg-slate-950/40 shadow-sm",
      danger: "bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-500/20"
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs font-semibold",
      md: "px-5 py-2.5 text-sm",
      lg: "px-6 py-3.5 text-base"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
