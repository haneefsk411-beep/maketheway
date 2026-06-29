"use client";

import React from "react";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1000,
  value,
  onChange,
  className = ""
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full">
        {/* Fill active track */}
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
          style={{ width: `${percentage}%` }}
        />
        {/* Slider Input overlay */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-2 opacity-0 cursor-pointer top-0 left-0 z-10"
        />
        {/* Visual Slider thumb */}
        <div
          className="absolute w-5 h-5 -top-1.5 -ml-2.5 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-indigo-400 shadow-md pointer-events-none transition-transform duration-150 hover:scale-110 active:scale-95"
          style={{ left: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
