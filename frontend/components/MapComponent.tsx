"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 animate-pulse rounded-2xl border border-slate-205 dark:border-slate-800">
      <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        Loading Interactive Map...
      </div>
    </div>
  )
});

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  popupText?: string;
}

export const MapComponent: React.FC<MapComponentProps> = (props) => {
  return <DynamicMap {...props} />;
};

export default MapComponent;
