import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Target, Eye, ShieldAlert, Award, Globe, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const stats = [
    { label: "Founded", value: "2024" },
    { label: "Users Mapped", value: "100k+" },
    { label: "Travel Specialists", value: "25+" },
    { label: "Affiliations", value: "140+" }
  ];

  const values = [
    {
      title: "Pioneering Innovation",
      desc: "We harness high-fidelity AI models to build custom, dynamic routes, replacing flat travel blog posts with active, live navigation packages.",
      icon: Compass
    },
    {
      title: "Reliability & Safety First",
      desc: "Our interactive mapping pins sync real-time security directives, hospital directions, and localized guide advisories.",
      icon: ShieldAlert
    },
    {
      title: "Eco-Friendly Tourism",
      desc: "Our planners actively suggest public transport routes, walking guides, and eco-certified hotels to minimize carbon footprints.",
      icon: Globe
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        
        {/* Banner Hero */}
        <section className="relative py-24 lg:py-32 bg-slate-900 overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
              alt="About FindTheWay Banner"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950" />
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-col gap-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              About FindTheWay
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              We are on a mission to democratize smart, localized travel planning using generative Artificial Intelligence.
            </p>
          </div>
        </section>

        {/* Vision & Mission Row */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Mission */}
            <Card className="p-8 border border-slate-200/50 dark:border-slate-800/40 shadow-xl flex gap-6 items-start backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Our Mission
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  To eliminate the hundreds of hours tourists spend navigating cluttered forums, booking systems, and static PDFs. We deliver high-fidelity, real-time, custom AI itineraries that keep tourists safe, engaged, and within budget.
                </p>
              </div>
            </Card>

            {/* Vision */}
            <Card className="p-8 border border-slate-200/50 dark:border-slate-800/40 shadow-xl flex gap-6 items-start backdrop-blur-md">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-650 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
                <Eye className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Our Vision
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  To build the world's most trusted AI travel network, seamlessly resolving queries related to distance, local weather guidelines, bookings, and cultural guidance under a clean, accessible interface.
                </p>
              </div>
            </Card>

          </div>
        </section>

        {/* Why Us / Core values */}
        <section className="py-20 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/40 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Our Core Philosophies
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                The beliefs that guide our product engineering and customer support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <Card key={idx} className="p-6 border border-slate-205/50 dark:border-slate-800/25 relative flex flex-col gap-4 text-center items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                        {v.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>

          </div>
        </section>

        {/* Stats */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, idx) => (
              <div key={idx} className="text-center">
                <span className="block text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                  {s.value}
                </span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-455 mt-2">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-100 dark:bg-slate-900/50 py-16 text-center border-t border-slate-200/50 dark:border-slate-800/40">
          <div className="max-w-3xl mx-auto px-4 flex flex-col gap-4 items-center">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Want to partner with FindTheWay?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg">
              We connect local hotel aggregators, restaurant networks, and licensed tour agencies directly with our AI query systems.
            </p>
            <div className="mt-4 flex gap-4">
              <Link href="/contact">
                <Button variant="primary">Contact Partnership Desk</Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
