"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Compass, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { apiRequest } from "@/lib/api";

// Zod Validation Schema
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
    country: z.string().min(2, "Please select or type your country"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });

type RegisterFormInput = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormInput) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          full_name: data.fullName,
          phone: data.phoneNumber,
          country: data.country
        })
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please check network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-lg relative z-10"
        >
          <Card className="p-8 border border-slate-205/50 dark:border-slate-800/40 shadow-2xl backdrop-blur-md">
            
            {/* Logo Logo */}
            <div className="flex flex-col items-center gap-2 text-center mb-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl bg-gradient-to-r from-indigo-650 to-violet-600 bg-clip-text text-transparent">
                  FindTheWay
                </span>
              </Link>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-4">
                Create Account
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Unlock custom travel routes and exclusive member pricing
              </p>
            </div>

            {/* Notifications */}
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-550 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3 font-semibold">
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                <span>Registration successful! Redirecting to login...</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Haneef Shaik"
                  error={!!errors.fullName}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <span className="text-red-500 text-xs font-semibold">{errors.fullName.message}</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1 sm:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="haneef@example.com"
                  error={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs font-semibold">{errors.email.message}</span>
                )}
              </div>

              {/* Country */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="India"
                  error={!!errors.country}
                  {...register("country")}
                />
                {errors.country && (
                  <span className="text-red-500 text-xs font-semibold">{errors.country.message}</span>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="9876543210"
                  error={!!errors.phoneNumber}
                  {...register("phoneNumber")}
                />
                {errors.phoneNumber && (
                  <span className="text-red-500 text-xs font-semibold">{errors.phoneNumber.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  error={!!errors.password}
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-xs font-semibold">{errors.password.message}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  error={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 text-xs font-semibold">{errors.confirmPassword.message}</span>
                )}
              </div>

              {/* Submit Account creation */}
              <div className="sm:col-span-2 pt-4">
                <Button type="submit" variant="primary" className="w-full py-3" disabled={isSubmitting}>
                  {isSubmitting ? "Creating account..." : "Create Account"}
                </Button>
              </div>

            </form>

            {/* Back to Login redirect */}
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-indigo-550 dark:text-indigo-400 hover:underline">
                Sign in
              </Link>
            </p>

          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
