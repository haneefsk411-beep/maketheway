"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, User, Mail, Globe, Phone, Heart, Calendar, Bookmark, Edit3, Save, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"saved" | "wishlist" | "settings">("saved");
  const [fullName, setFullName] = useState("Haneef Shaik");
  const [email, setEmail] = useState("haneef@example.com");
  const [phone, setPhone] = useState("+91 9876543210");
  const [country, setCountry] = useState("India");
  const [isEditing, setIsEditing] = useState(false);

  // Mock Saved Trips Data
  const savedTrips = [
    {
      id: "trip-1",
      title: "Family Getaway to Goa",
      dates: "July 12 - July 15, 2026",
      budget: "₹15,000",
      type: "Family / Coastal",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "trip-2",
      title: "Adventure Trek in Kashmir",
      dates: "Sept 05 - Sept 12, 2026",
      budget: "₹25,000",
      type: "Solo / Alpine Adventure",
      image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=400&q=80"
    }
  ];

  // Mock Wishlist Data
  const wishlistItems = [
    {
      id: "ker",
      name: "Kerala Backwaters",
      state: "Kerala",
      image: "https://images.unsplash.com/photo-1602216056096-3c40cc0c9944?auto=format&fit=crop&w=400&q=80",
      rating: 4.8
    },
    {
      id: "jaip",
      name: "Jaipur Forts",
      state: "Rajasthan",
      image: "https://images.unsplash.com/photo-1477584305590-3a63f60078d0?auto=format&fit=crop&w=400&q=80",
      rating: 4.7
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile configurations saved successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
          
          {/* Left Panel: Profile Detail Overview */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6">
            <Card className="p-8 text-center border border-slate-200/50 dark:border-slate-800/40 shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 to-violet-600" />
              
              {/* Profile Avatar Card */}
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-indigo-500/25 shadow-inner mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250&q=80"
                  alt={fullName}
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-6">
                {fullName}
              </h2>
              <p className="text-xs text-slate-455 font-semibold mt-1">
                Explorer Tier: Gold Member
              </p>

              <hr className="my-6 border-slate-100 dark:border-slate-800/80" />

              <div className="flex flex-col gap-3.5 text-left text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-indigo-500" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-indigo-500" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-indigo-500" />
                  <span>{country}</span>
                </div>
              </div>

              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-8 gap-2 font-bold"
                  onClick={() => {
                    setIsEditing(true);
                    setActiveTab("settings");
                  }}
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
              )}

            </Card>

            {/* Travel Analytics Callout */}
            <Card className="bg-gradient-to-tr from-indigo-900 to-indigo-950 text-white p-6 shadow-xl border border-indigo-500/20">
              <h3 className="font-bold text-xs uppercase tracking-wider text-indigo-300 mb-2">
                Travel Stats
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center mt-4">
                <div>
                  <span className="block font-extrabold text-lg text-white">4</span>
                  <span className="text-[10px] text-slate-400">Trips Taken</span>
                </div>
                <div>
                  <span className="block font-extrabold text-lg text-white">2</span>
                  <span className="text-[10px] text-slate-400">Planned AI</span>
                </div>
                <div>
                  <span className="block font-extrabold text-lg text-white">12</span>
                  <span className="text-[10px] text-slate-400">Bookmarks</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel: Content Section */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Tab navigation headers */}
            <div className="flex gap-4 border-b border-slate-200 dark:border-slate-900 pb-px">
              {[
                { id: "saved", label: "Saved Itineraries", icon: Bookmark },
                { id: "wishlist", label: "Wishlist", icon: Heart },
                { id: "settings", label: "Account Config", icon: User }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-4 px-2 font-bold text-sm flex items-center gap-2 border-b-2 transition-all cursor-pointer relative ${
                      isActive
                        ? "border-indigo-550 text-indigo-650 dark:text-indigo-400"
                        : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-655"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents */}
            <div className="mt-2">
              
              {/* SAVED TRIPS */}
              {activeTab === "saved" && (
                <div className="flex flex-col gap-6">
                  {savedTrips.map((trip) => (
                    <Card key={trip.id} className="flex flex-col sm:flex-row gap-6 p-4 border border-slate-205/50 dark:border-slate-800/40 relative">
                      <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={trip.image}
                          alt={trip.title}
                          fill
                          className="object-cover"
                          sizes="176px"
                        />
                      </div>
                      <div className="flex flex-col justify-between py-1 flex-1">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-indigo-500 font-bold uppercase tracking-wider">
                            <Compass className="w-3.5 h-3.5" />
                            <span>{trip.type}</span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                            {trip.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{trip.dates}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                          <span className="text-xs text-slate-400">Total Budget: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{trip.budget}</strong></span>
                          <Link href={`/destination/${trip.id.includes("goa") ? "goa" : "kashmir"}`}>
                            <Button variant="ghost" size="sm" className="text-xs font-bold text-indigo-550 dark:text-indigo-400">
                              View Route Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* WISHLIST TRIPS */}
              {activeTab === "wishlist" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden group border border-slate-200/50 dark:border-slate-800/40 relative">
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="300px"
                        />
                        <div className="absolute inset-0 bg-slate-950/20" />
                        
                        {/* Heart Overlay Action */}
                        <button
                          onClick={() => alert("Removed item from Wishlist (mock).")}
                          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-md bg-slate-950/50 text-red-500 border border-white/10 hover:bg-slate-950/75 hover:scale-105 transition-all cursor-pointer"
                        >
                          <Heart className="w-4 h-4 fill-red-500" />
                        </button>

                        <div className="absolute bottom-3 left-3 text-white flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                          <span className="text-xs font-semibold drop-shadow">{item.state}</span>
                        </div>
                      </div>
                      
                      <div className="p-4 flex items-center justify-between">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">{item.name}</h4>
                        <Link href={`/destination/${item.id === "ker" ? "kerala" : "jaipur"}`}>
                          <Button variant="glass" size="sm" className="text-xs font-bold py-1 px-2.5">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* ACCOUNT SETTINGS EDIT */}
              {activeTab === "settings" && (
                <Card className="p-6 border border-slate-200/50 dark:border-slate-800/40 shadow-xl backdrop-blur-md">
                  <form onSubmit={handleSave} className="flex flex-col gap-5">
                    <h3 className="font-extrabold text-base text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800">
                      Configure Account Credentials
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      
                      <div className="flex flex-col gap-1">
                        <Label htmlFor="s-name">Full Name</Label>
                        <Input
                          id="s-name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label htmlFor="s-email">Email Address</Label>
                        <Input
                          id="s-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label htmlFor="s-phone">Phone Number</Label>
                        <Input
                          id="s-phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <Label htmlFor="s-country">Country of origin</Label>
                        <Input
                          id="s-country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-805 mt-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsEditing(false);
                          setActiveTab("saved");
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" size="sm" className="gap-1">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </Button>
                    </div>

                  </form>
                </Card>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
