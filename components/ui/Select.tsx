import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  className?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, className = "", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <select
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800
            bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm
            text-slate-950 dark:text-slate-50 text-sm font-medium
            appearance-none cursor-pointer
            focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
            transition-all duration-300
            ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom Chevron icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400 dark:text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
