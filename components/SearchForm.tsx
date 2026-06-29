"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Briefcase, IndianRupee } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Select } from "./ui/Select";
import { Slider } from "./ui/Slider";

export const SearchForm: React.FC = () => {
  const router = useRouter();
  const [currentLocation, setCurrentLocation] = useState("Hyderabad");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("1");
  const [budget, setBudget] = useState(15000);
  const [travelType, setTravelType] = useState("adventure");

  const travelTypeOptions = [
    { value: "adventure", label: "Adventure" },
    { value: "family", label: "Family" },
    { value: "business", label: "Business" },
    { value: "solo", label: "Solo" },
    { value: "luxury", label: "Luxury" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct query parameters
    const params = new URLSearchParams({
      from: currentLocation,
      to: destination || "all",
      date,
      travelers,
      budget: budget.toString(),
      type: travelType
    });

    router.push(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Current Location */}
        <div className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            Current Location
          </Label>
          <Input
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            placeholder="e.g. Hyderabad, IN"
            required
          />
        </div>

        {/* Destination */}
        <div className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-violet-500" />
            Where to?
          </Label>
          <Input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Goa, Kashmir, Kerala..."
          />
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-indigo-500" />
            Departure Date
          </Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="cursor-pointer"
          />
        </div>

        {/* Travelers */}
        <div className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-violet-500" />
            Travelers
          </Label>
          <Input
            type="number"
            min="1"
            max="15"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
            placeholder="Number of travellers"
            required
          />
        </div>

        {/* Travel Style */}
        <div className="flex flex-col gap-1.5">
          <Label className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
            Travel Type
          </Label>
          <Select
            options={travelTypeOptions}
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          />
        </div>

        {/* Budget Selector */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-violet-500" />
              Max Budget
            </Label>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              ₹{budget.toLocaleString()}
            </span>
          </div>
          <div className="py-2.5">
            <Slider
              min={3000}
              max={50000}
              step={1000}
              value={budget}
              onChange={setBudget}
            />
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="primary" className="w-full sm:w-auto px-8 py-3.5">
          Search Trip
        </Button>
      </div>
    </form>
  );
};
export default SearchForm;
