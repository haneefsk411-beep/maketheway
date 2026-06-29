import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  error?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error = false, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-300 text-sm font-medium
          bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm
          text-slate-950 dark:text-slate-50
          placeholder-slate-400 dark:placeholder-slate-500
          ${error 
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
            : "border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          }
          focus:outline-none
          ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
