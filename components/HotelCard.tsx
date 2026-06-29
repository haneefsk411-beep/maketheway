"use client";

import React from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { Hotel } from "../types";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

interface HotelCardProps {
  hotel: Hotel;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <Card className="flex flex-col md:flex-row gap-6 p-4 border border-slate-200/50 dark:border-slate-800/40 hover:shadow-xl transition-all duration-300">
      
      {/* Hotel Image */}
      <div className="relative w-full md:w-56 h-48 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 224px"
        />
        
        {/* Rating Floating */}
        <div className="absolute top-3 left-3 backdrop-blur-md bg-slate-950/60 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span>{hotel.rating}</span>
        </div>
      </div>

      {/* Hotel Details */}
      <div className="flex flex-col flex-1 justify-between py-1">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {hotel.name}
            </h3>
            <div className="text-left sm:text-right">
              <span className="text-slate-400 text-xs block">Price per night</span>
              <span className="text-indigo-650 dark:text-indigo-400 font-extrabold text-lg">
                ₹{hotel.price.toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
            <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <span>{hotel.location}</span>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2 line-clamp-2">
            {hotel.description || "Indulge in our hospitality, situated at a prime location with state-of-the-art facilities, pool, gym, and complimentary breakfast."}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Free Wifi</span>
            <span>•</span>
            <span>Pool</span>
            <span>•</span>
            <span>Breakfast</span>
          </div>
          <Button variant="primary" size="sm" onClick={() => alert("Mock Booking successful! Your smart AI itinerary is ready.")}>
            Book Now
          </Button>
        </div>
      </div>

    </Card>
  );
};
export default HotelCard;
