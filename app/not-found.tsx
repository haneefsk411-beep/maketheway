"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, AlertTriangle, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-slate-950 flex items-center justify-center py-20 px-4 transition-colors duration-300 relative">
        {/* Decorative blur spheres */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg text-center relative z-10"
        >
          <Card className="p-8 sm:p-12 border border-slate-200/50 dark:border-slate-800/40 shadow-2xl backdrop-blur-md">
            
            {/* Visual Icon */}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-550 to-violet-650 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/20"
            >
              <Compass className="w-10 h-10" />
            </motion.div>

            <h1 className="text-6xl font-black bg-gradient-to-r from-indigo-650 to-violet-600 bg-clip-text text-transparent mt-8">
              404
            </h1>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4">
              Looks like you took the wrong turn
            </h2>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs mx-auto leading-relaxed">
              The route you are searching for doesn't exist in our AI database. Let's redirect you back to safety.
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/">
                <Button variant="primary" size="md" className="gap-2">
                  Return to Home Page
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
