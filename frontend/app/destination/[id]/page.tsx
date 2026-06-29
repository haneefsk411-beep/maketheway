import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Compass, Star, MapPin, Compass as TipIcon } from "lucide-react";
import { destinations, mockAttractions, mockHotels, mockRestaurants } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GalleryComponent } from "@/components/GalleryComponent";
import { HotelCard } from "@/components/HotelCard";
import MapComponent from "@/components/MapComponent";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DestinationDetailsPage({ params }: PageProps) {
  const { id } = await params;
  
  // Default fallbacks to mock data
  let dest = destinations.find((d) => d.id === id);
  let attractions = mockAttractions[id] || [];
  let hotels = mockHotels[id] || [];
  let restaurants = mockRestaurants[id] || [];

  try {
    const backendHost = "http://localhost:8000/api";
    // Attempt querying live FastAPI backend
    const destRes = await fetch(`${backendHost}/destinations/${id}`, { next: { revalidate: 30 } });
    if (destRes.ok) {
      dest = await destRes.json();
      
      const hotelsRes = await fetch(`${backendHost}/hotels?destination_id=${id}`);
      if (hotelsRes.ok) hotels = await hotelsRes.json();
      
      const resRes = await fetch(`${backendHost}/restaurants?destination_id=${id}`);
      if (resRes.ok) restaurants = await resRes.json();

      const attrRes = await fetch(`${backendHost}/places?destination_id=${id}`);
      if (attrRes.ok) attractions = await attrRes.json();
    }
  } catch (err) {
    console.warn(`FastAPI server offline. Serving destination [id=${id}] via client-side mock data fallback.`);
  }

  if (!dest) {
    notFound();
  }

  // Construct mock gallery list of images using high-resolution travel stock photos
  const galleryImages = [
    dest.image,
    "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=600&q=80"
  ];

  // Specific Travel Guide tips based on destination
  const travelTips = [
    { title: "Best Time to Visit", info: dest.id === "kashmir" ? "March to October (Summer & Autumn)" : "November to February (Cool winter season)" },
    { title: "Ideal Duration", info: "4 to 7 Days" },
    { title: "Local Conveyance", info: "Auto-rickshaws, bike rentals, app cabs, or local tour guides" },
    { title: "AI Smart Recommendation", info: "Book tickets for popular historic monuments in advance online to bypass tourist ticket queues." }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Dynamic Hero Cover Header */}
        <section className="relative w-full h-[60vh] bg-slate-950 flex items-end">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            priority
            className="object-cover opacity-60 dark:opacity-45"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 relative z-10 w-full flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            
            {/* Left title and subtitle */}
            <div className="text-white flex flex-col gap-2.5 max-w-2xl">
              <div className="flex items-center gap-1 text-indigo-400 font-bold uppercase text-xs tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{dest.state}, India</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                {dest.name}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
                {dest.description}
              </p>
            </div>

            {/* Right floating cards */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="backdrop-blur-md bg-white/10 dark:bg-slate-900/35 border border-white/20 dark:border-slate-800/40 rounded-xl p-3 text-white">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</span>
                <span className="text-base font-bold flex items-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {dest.rating} <span className="text-xs text-slate-400">({dest.reviewCount})</span>
                </span>
              </div>
              <div className="backdrop-blur-md bg-white/10 dark:bg-slate-900/35 border border-white/20 dark:border-slate-800/40 rounded-xl p-3 text-white">
                <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Est. Budget</span>
                <span className="text-base font-bold mt-0.5 block">
                  ₹{dest.budget.toLocaleString()}
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Main Grid Details */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Cols: Main Info, Gallery, and Lists */}
            <div className="lg:col-span-2 flex flex-col gap-12">
              
              {/* Image Gallery */}
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Photo Gallery
                </h2>
                <GalleryComponent images={galleryImages} />
              </div>

              {/* Top Attractions list */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Top Attractions
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Must visit places for your itineraries.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {attractions.map((attr) => (
                    <Card key={attr.id} className="overflow-hidden border border-slate-200/50 dark:border-slate-800/40">
                      <div className="relative w-full h-44">
                        <Image
                          src={attr.image}
                          alt={attr.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 300px"
                        />
                        <div className="absolute top-3 right-3 backdrop-blur-md bg-slate-950/65 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span>{attr.rating}</span>
                        </div>
                      </div>
                      <CardContent className="p-4 flex flex-col gap-1">
                        <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider">{attr.location}</span>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">{attr.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">{attr.description}</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400">Entrance Ticket</span>
                          <span className="text-slate-900 dark:text-white font-bold text-xs">{attr.cost > 0 ? `₹${attr.cost}` : "Free"}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Nearby Hotels list */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Premium Stays
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Recommended hotels sorted by ratings.</p>
                </div>
                <div className="flex flex-col gap-6">
                  {hotels.map((hotel) => (
                    <HotelCard key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              </div>

              {/* Popular Restaurants list */}
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    Popular Restaurants & Dine-Ins
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">Savor local cuisines at these top-rated establishments.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {restaurants.map((res) => (
                    <Card key={res.id} className="flex gap-4 p-3 items-center border border-slate-200/50 dark:border-slate-800/40">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={res.image}
                          alt={res.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex flex-col gap-1 justify-center flex-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{res.name}</h4>
                        <span className="text-xs text-slate-400 font-semibold">{res.cuisine}</span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs mt-1">
                          <Star className="w-3.5 h-3.5 fill-amber-500" />
                          <span className="font-bold text-slate-800 dark:text-slate-205">{res.rating}</span>
                          <span className="text-slate-400 ml-1">• {res.priceRange}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 1 Col: Maps sidebar & Travel Tips */}
            <div className="flex flex-col gap-8">
              
              {/* Embedded Live Leaflet Map */}
              <Card className="overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-xl">
                <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/50 dark:border-slate-800/40 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-500" />
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Destination Map Location</span>
                </div>
                <div className="h-64 relative">
                  <MapComponent
                    center={dest.coordinates}
                    zoom={9}
                    popupText={`${dest.name}, ${dest.state}`}
                  />
                </div>
                <div className="p-4 text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed">
                  Map markers indicate coordinates centered around {dest.name}. Drag to explore surrounding roads.
                </div>
              </Card>

              {/* Travel Guidelines Checklist */}
              <Card className="p-6 border border-slate-200/50 dark:border-slate-800/40 shadow-xl flex flex-col gap-5">
                <h3 className="font-bold text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-850 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <TipIcon className="w-4 h-4 text-indigo-500" />
                  Travel Checklist Tips
                </h3>
                <ul className="flex flex-col gap-4">
                  {travelTips.map((tip, idx) => (
                    <li key={idx} className="flex gap-3 text-xs leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                      <div>
                        <span className="block font-bold text-slate-800 dark:text-slate-200 mb-0.5">{tip.title}</span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{tip.info}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Premium Support Callout */}
              <Card className="bg-gradient-to-tr from-indigo-600 via-indigo-700 to-violet-800 text-white p-6 shadow-xl border border-indigo-500/20 flex flex-col gap-4 rounded-2xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <h3 className="font-extrabold text-base">
                  Unlock Personalized AI Itineraries
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  Let our travel model construct a custom day-by-day itinerary tailored precisely to your budget and travel pace.
                </p>
                <Link href="/register">
                  <Button variant="glass" className="w-full text-white font-semibold py-2.5">
                    Generate Itinerary Free
                  </Button>
                </Link>
              </Card>

            </div>

          </div>

        </section>
      </main>

      <Footer />
    </div>
  );
}
