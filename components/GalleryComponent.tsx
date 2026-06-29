"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface GalleryComponentProps {
  images: string[];
}

export const GalleryComponent: React.FC<GalleryComponentProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleOpen = (idx: number) => setActiveIdx(idx);
  const handleClose = () => setActiveIdx(null);
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev === 0 ? images.length - 1 : (prev as number) - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((prev) => (prev === images.length - 1 ? 0 : (prev as number) + 1));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleOpen(idx)}
            className="relative h-48 rounded-xl overflow-hidden cursor-pointer group shadow-md"
          >
            <Image
              src={img}
              alt={`Gallery Image ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {/* Hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-slate-950/95 flex items-center justify-center p-4 backdrop-blur-md cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer z-50"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer z-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Image View */}
            <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden cursor-default shadow-2xl">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative"
              >
                <Image
                  src={images[activeIdx]}
                  alt={`Expanded Gallery View ${activeIdx + 1}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer z-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Index Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-semibold select-none">
              {activeIdx + 1} / {images.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default GalleryComponent;
