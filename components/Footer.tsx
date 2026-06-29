"use client";

import React from "react";
import Link from "next/link";
import { Compass, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Col */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white">
                <Compass className="w-4.5 h-4.5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                FindTheWay
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your intelligent travel companion. Plan itineraries, discover hot spots, and navigate destinations seamlessly using smart recommendations.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 hover:border-indigo-500 transition-all duration-300" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 hover:border-indigo-500 transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 hover:border-indigo-500 transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-500 hover:border-indigo-500 transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">
              Support Center
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-slate-400 text-xs">Email us at</p>
                  <a href="mailto:support@findtheway.com" className="text-slate-600 dark:text-slate-350 hover:text-indigo-500 font-medium">
                    support@findtheway.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-slate-400 text-xs">Call us at</p>
                  <span className="text-slate-600 dark:text-slate-350 font-medium">
                    +91 (80) 4593-9900
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-500 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-slate-400 text-xs">Location</p>
                  <span className="text-slate-600 dark:text-slate-350">
                    Jubilee Hills, Hyderabad, India
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-6">
              Subscribe Newsletter
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">
              Get the latest travel deals, destination updates, and AI travel tips directly in your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-1 text-xs"
                required
              />
              <Button type="submit" variant="primary" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>

        </div>

        <hr className="my-12 border-slate-200 dark:border-slate-900" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} FindTheWay. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-indigo-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-indigo-500 transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
