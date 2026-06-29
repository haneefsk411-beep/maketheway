"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Award } from "lucide-react";
import { destinations, whyChooseUs, mockTestimonials } from "@/lib/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { DestinationCard } from "@/components/DestinationCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function Home() {
  // Take top 3 destinations as featured attractions or display them in a gorgeous layout
  const popularDestinations = destinations.slice(0, 6);

  // Hardcode 3 mock featured attractions to display on home page
  const featuredAttractions = [
    {
      name: "Dal Lake Shikara",
      location: "Srinagar, Kashmir",
      rating: 4.9,
      cost: "₹800",
      image: "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?auto=format&fit=crop&w=600&q=80",
      link: "/destination/kashmir"
    },
    {
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      rating: 4.8,
      cost: "₹200",
      image: "https://images.unsplash.com/photo-1477584305590-3a63f60078d0?auto=format&fit=crop&w=600&q=80",
      link: "/destination/jaipur"
    },
    {
      name: "Baga Beach",
      location: "North Goa, Goa",
      rating: 4.6,
      cost: "₹500",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80",
      link: "/destination/goa"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 xl:py-40 overflow-hidden flex items-center justify-center bg-slate-950">
        
        {/* Parallax Background Cover */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
            alt="Travel background banner"
            fill
            className="object-cover opacity-35 dark:opacity-25"
            priority
          />
          {/* Accent radial gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-50 dark:to-slate-950" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col gap-12 text-center lg:text-left">
          
          {/* Header Texts */}
          <div className="max-w-3xl flex flex-col gap-4 mx-auto lg:mx-0">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 self-center lg:self-start px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-400/15 border border-indigo-500/20 text-indigo-650 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Award className="w-3.5 h-3.5" />
              <span>India&apos;s Smartest AI Trip Guide</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none"
            >
              Your Smart AI <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-455 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Travel Companion
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-350 dark:text-slate-300 leading-relaxed font-medium"
            >
              Plan your journey, discover destinations, premium hotels, and local attractions using generative AI planning guides.
            </motion.p>
          </div>

          {/* Search Form Card Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <SearchForm />
          </motion.div>

        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="block text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">10k+</span>
              <span className="text-xs font-semibold text-slate-450 dark:text-slate-400 uppercase tracking-wider mt-1 block">Active Users</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">500+</span>
              <span className="text-xs font-semibold text-slate-450 dark:text-slate-400 uppercase tracking-wider mt-1 block">Destinations</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">150+</span>
              <span className="text-xs font-semibold text-slate-450 dark:text-slate-400 uppercase tracking-wider mt-1 block">AI Travel Guides</span>
            </div>
            <div>
              <span className="block text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">4.9/5</span>
              <span className="text-xs font-semibold text-slate-450 dark:text-slate-400 uppercase tracking-wider mt-1 block">User Satisfaction</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Popular Destinations
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Handpicked top travel spots across India loved by travellers.
              </p>
            </div>
            <Link href="/search">
              <Button variant="outline" className="gap-2">
                View All Destinations
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>

        </div>
      </section>

      {/* Why FindTheWay Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Why Choose FindTheWay
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
              We leverage smart algorithms to deliver travel insights that save money and remove planning friction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, idx) => (
              <FeatureCard
                key={idx}
                title={feature.title}
                description={feature.description}
                iconName={feature.icon}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Featured Attractions Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Featured Attractions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Must-see historic sites and adventures you cannot afford to miss.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAttractions.map((attr, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="cursor-pointer"
              >
                <Link href={attr.link}>
                  <Card className="h-full flex flex-col group relative overflow-hidden">
                    <div className="relative w-full h-56">
                      <Image
                        src={attr.image}
                        alt={attr.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                      <div className="absolute inset-0 bg-slate-950/20" />
                      <div className="absolute top-4 right-4 backdrop-blur-md bg-slate-900/60 text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{attr.rating}</span>
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-indigo-500">{attr.location}</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors">
                          {attr.name}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs text-slate-400">Entry fee approx.</span>
                        <span className="text-slate-800 dark:text-white font-bold text-sm">{attr.cost}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              What Travelers Say
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Read real stories from our adventurers who mapped their journeys with AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockTestimonials.map((t, idx) => (
              <Card key={idx} className="p-8 border border-slate-205/50 dark:border-slate-800/40 relative">
                <div className="flex flex-col gap-6">
                  <p className="text-slate-600 dark:text-slate-300 italic text-sm leading-relaxed">
                    &ldquo;{t.feedback}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        {t.name}
                      </h4>
                      <span className="text-xs text-slate-455">{t.role}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-6 items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Begin Your Next Adventure?
          </h2>
          <p className="text-slate-300 max-w-xl text-sm sm:text-base leading-relaxed">
            Create an account today to save custom AI travel itineraries, share maps with friends, and unlock premium resort discounts.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link href="/register">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="glass" size="lg" className="w-full sm:w-auto text-white">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
