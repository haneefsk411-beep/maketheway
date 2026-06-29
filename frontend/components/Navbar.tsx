"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Compass, User, LogOut } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/Button";
import { apiRequest } from "@/lib/api";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = async () => {
    try {
      await apiRequest("/auth/logout", { method: "POST" });
    } catch {
      // Ignore network errors on logout
    }
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    setIsLoggedIn(false);
    alert("Successfully logged out!");
    window.location.href = "/";
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Destinations", href: "/search" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20"
          >
            <Compass className="w-5 h-5" />
          </motion.div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-[100%_vertical] transition-all duration-500 bg-clip-text text-transparent">
            FindTheWay
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions & Theme Button */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-red-500/10 hover:text-red-500 border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                title="Logout Account"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
              <Link href="/profile" className="ml-2 w-9 h-9 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 hover:border-indigo-500 transition-all duration-200" title="User Profile">
                <User className="w-4.5 h-4.5" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          <button
            onClick={toggleMenu}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 transition-colors duration-200 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200/50 dark:border-slate-900/50 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 flex flex-col gap-4 shadow-xl"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <hr className="border-slate-150 dark:border-slate-900" />
            
            {!isLoggedIn ? (
              <div className="flex items-center gap-4 px-3">
                <Link href="/login" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className="w-full" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-3">
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-indigo-500/20 text-sm font-semibold text-indigo-650 dark:text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10"
                >
                  <User className="w-4.5 h-4.5" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-500/20 text-sm font-semibold text-red-500 bg-red-500/5 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="w-4.5 h-4.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
