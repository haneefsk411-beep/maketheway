"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Compass, Filter } from "lucide-react";
import { destinations } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DestinationCard } from "@/components/DestinationCard";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { Slider } from "@/components/ui/Slider";
import MapComponent from "@/components/MapComponent";

function SearchResultsContent() {
  const searchParams = useSearchParams();

  // Search parameters state
  const queryTo = searchParams.get("to") || "";
  const queryBudget = Number(searchParams.get("budget")) || 40000;
  const queryType = searchParams.get("type") || "all";

  // Filter forms state
  const [searchQuery, setSearchQuery] = useState(queryTo === "all" ? "" : queryTo);
  const [budgetLimit, setBudgetLimit] = useState(queryBudget);
  const [travelType, setTravelType] = useState(queryType);

  const travelTypeOptions = [
    { value: "all", label: "Any Type" },
    { value: "adventure", label: "Adventure" },
    { value: "family", label: "Family" },
    { value: "business", label: "Business" },
    { value: "solo", label: "Solo" },
    { value: "luxury", label: "Luxury" }
  ];

  // Perform search matching inline during render
  const filteredResults = destinations.filter((dest) => {
    const matchName =
      !searchQuery ||
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.state.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchBudget = dest.budget <= budgetLimit;
    
    return matchName && matchBudget;
  });

  // Center coordinate for the Leaflet Map
  // If there are results, center on the first matched coordinate, otherwise default to Hyderabad
  const mapCenter: [number, number] =
    filteredResults.length > 0
      ? filteredResults[0].coordinates
      : [17.385, 78.4867];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Search Results
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Found {filteredResults.length} amazing destination{filteredResults.length === 1 ? "" : "s"} matching your criteria.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Filters panel */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card className="p-6 border border-slate-200/50 dark:border-slate-800/40 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                <Filter className="w-4 h-4 text-indigo-500" />
                Filter Trip
              </span>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setBudgetLimit(40000);
                  setTravelType("all");
                }}
                className="text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-indigo-550 transition-colors cursor-pointer"
              >
                Reset All
              </button>
            </div>

            <div className="flex flex-col gap-6">
              
              {/* Destination Query */}
              <div className="flex flex-col gap-1.5">
                <Label>Destination Name</Label>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Where to? (e.g. Goa)"
                />
              </div>

              {/* Travel Style */}
              <div className="flex flex-col gap-1.5">
                <Label>Travel Type</Label>
                <Select
                  options={travelTypeOptions}
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                />
              </div>

              {/* Budget Limit Slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <Label>Max Budget</Label>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    ₹{budgetLimit.toLocaleString()}
                  </span>
                </div>
                <Slider
                  min={3000}
                  max={50000}
                  step={1000}
                  value={budgetLimit}
                  onChange={setBudgetLimit}
                />
              </div>

            </div>
          </Card>

          {/* Quick AI tips */}
          <Card className="bg-gradient-to-tr from-slate-900 to-indigo-950 text-white p-6 shadow-xl border border-indigo-500/20">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-2 text-indigo-300">
              AI Smart Suggestion
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Based on monsoon forecasts, visiting **Kerala** backwaters or **Kashmir** valleys will offer pleasant climates with budget flight options.
            </p>
          </Card>
        </div>

        {/* Right Col: Matching results grid + Map split layout */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Map Preview section */}
          <div className="w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 dark:border-slate-800/40 relative">
            <MapComponent
              center={mapCenter}
              zoom={5}
              popupText={filteredResults.length > 0 ? filteredResults[0].name : "Search Center"}
            />
            {/* Overlay Map tag */}
            <div className="absolute bottom-4 left-4 z-20 backdrop-blur-md bg-slate-900/80 border border-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
              <span>Interactive Route Preview Map</span>
            </div>
          </div>

          {/* Result cards list */}
          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredResults.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center border border-dashed border-slate-205 dark:border-slate-800/80">
              <Compass className="w-12 h-12 text-slate-350 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                No Destinations Found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
                No matching spots fit your budget or name filters. Try increasing your max budget or searching for basic states like &quot;Kerala&quot;.
              </p>
            </Card>
          )}

        </div>

      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
            <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm">Searching travel database...</p>
          </div>
        }>
          <SearchResultsContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
