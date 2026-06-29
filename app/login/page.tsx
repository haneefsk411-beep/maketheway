"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Compass, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card } from "@/components/ui/Card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Zod Schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean()
});

type LoginFormInput = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    }
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      // Mock API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Successfully logged in! Redirecting to homepage...");
      router.push("/profile");
    } catch {
      setFormError("Invalid credentials. Try guest login.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Login Wrapper */}
      <main className="flex-1 flex items-center justify-center py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md relative z-10"
        >
          <Card className="p-8 border border-slate-200/50 dark:border-slate-800/40 shadow-2xl backdrop-blur-md">
            
            {/* Header logo & title */}
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
                Welcome Back
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Log in to sync your AI-planned travel itineraries
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              
              {/* Email */}
              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  error={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1 font-medium">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions sent (mock).");
                    }}
                    className="text-xs font-semibold text-indigo-550 dark:text-indigo-400 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    error={!!errors.password}
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-655"
                  >
                    {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                  </button>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-xs mt-1 font-medium">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  id="rememberMe"
                  type="checkbox"
                  className="w-4.5 h-4.5 rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500/20"
                  {...register("rememberMe")}
                />
                <label
                  htmlFor="rememberMe"
                  className="text-xs font-semibold text-slate-500 dark:text-slate-400 cursor-pointer select-none"
                >
                  Remember my credentials
                </label>
              </div>

              {/* Submit Button */}
              <Button type="submit" variant="primary" className="w-full py-3" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>

              {/* Or Divider */}
              <div className="relative my-2 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative z-10 px-3 bg-white dark:bg-slate-900 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                  Or continue with
                </span>
              </div>

              {/* Google Login (UI only) */}
              <Button
                type="button"
                variant="outline"
                className="w-full gap-2.5 py-3 font-semibold"
                onClick={() => {
                  alert("Redirecting to Google OAuth (mock)...");
                  router.push("/profile");
                }}
              >
                {/* Google Icon */}
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15.01.5 12 .5c-4.97 0-9 4.03-9 9s4.03 9 9 9c5.18 0 9-3.7 9-9 0-.64-.06-1.25-.17-1.84H12v3.68h5.24c-.23 1.25-.94 2.3-2 3.01l3.1 2.4c1.82-1.68 2.86-4.15 2.86-7.07 0-.7-.06-1.4-.18-2.07H12v3.68h5.24c-.23 1.25-.94 2.3-2 3.01l3.1 2.4c1.82-1.68 2.86-4.15 2.86-7.07 0-.7-.06-1.4-.18-2.07H12V5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.82-.07-1.6-.2-2.36H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.37-4.88 3.37-8.54z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.29c-.25-.76-.4-1.57-.4-2.42 0-.85.15-1.66.4-2.42L2.12 6.55C1.1 8.65.5 10.26.5 12s.6 3.35 1.62 5.45l3.72-3.16z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.1 0 5.71-1.03 7.62-2.8l-3.66-2.84c-1.02.68-2.33 1.09-3.96 1.09-3.05 0-5.63-2.06-6.55-4.83L1.76 17.3c1.9 3.77 5.79 6.2 10.24 6.2z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>

            {/* Footer register redirect */}
            <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6 font-medium">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-bold text-indigo-550 dark:text-indigo-400 hover:underline">
                Create an account
              </Link>
            </p>

          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
