"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Destination } from "../types";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <Card className="h-full flex flex-col group relative overflow-hidden">
        
        {/* Destination Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-750 ease-out group-hover:scale-110"
            priority={destination.id === "goa" || destination.id === "hyderabad"}
          />
          {/* Transparent Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
          
          {/* Float Badge: State */}
          <div className="absolute top-4 left-4 backdrop-blur-md bg-slate-900/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10">
            {destination.state}
          </div>
          
          {/* Float Badge: Rating */}
          <div className="absolute top-4 right-4 backdrop-blur-md bg-slate-900/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{destination.rating}</span>
          </div>

          {/* Floating Details */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div className="text-white flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-medium drop-shadow-sm">{destination.location}</span>
            </div>
            <div className="text-right">
              <span className="block text-slate-300 text-[10px] uppercase font-bold tracking-wider">Est. Budget</span>
              <span className="text-white text-sm font-bold">₹{destination.budget.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 flex flex-col flex-1 gap-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors duration-200">
            {destination.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed flex-1">
            {destination.description}
          </p>
          
          <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <div className="flex gap-4">
              <div>
                <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Places</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{destination.touristPlacesCount} spots</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500">Hotels</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{destination.hotelCount}+</span>
              </div>
            </div>
            
            <Link href={`/destination/${destination.id}`}>
              <Button variant="glass" size="sm" className="group/btn gap-1 text-xs">
                Explore
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

      </Card>
    </motion.div>
  );
};
export default DestinationCard;
