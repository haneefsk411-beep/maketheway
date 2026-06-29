import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ className = "", children, ...props }) => {
  return (
    <label
      className={`block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 select-none ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};
