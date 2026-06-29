"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Card } from "./ui/Card";

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: string; // e.g. "Sparkles", "Map", "Hotel", "Compass"
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, iconName }) => {
  // Dynamically resolve icon from lucide-react
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName] || Icons.HelpCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full p-8 flex flex-col gap-4 text-left border border-slate-200/50 dark:border-slate-800/40 relative overflow-hidden group">
        
        {/* Background Gradient Hover Light */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Icon wrapper */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/15 dark:border-indigo-400/20 group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 relative z-10">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
export default FeatureCard;
