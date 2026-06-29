import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ glass = true, className = "", children, ...props }, ref) => {
    const baseStyle = "rounded-2xl overflow-hidden transition-all duration-300";
    const bgStyle = glass
      ? "backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 shadow-xl"
      : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md";

    return (
      <div
        ref={ref}
        className={`${baseStyle} ${bgStyle} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 border-b border-slate-200/50 dark:border-slate-800/50 ${className}`} {...props}>
    {children}
  </div>
);

export const CardContent = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = "", children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-200/50 dark:border-slate-800/50 ${className}`} {...props}>
    {children}
  </div>
);
