"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import MapComponent from "@/components/MapComponent";

// Zod Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactFormInput = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // Mock API latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 4000);
    } catch {
      setError("Failed to submit message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Jubilee Hills, Hyderabad Coordinates
  const officeCoords: [number, number] = [17.4332, 78.4069];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-slate-50 dark:bg-slate-950 py-16 transition-colors duration-300 relative">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-12">
          
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Contact Support
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Have questions about AI itineraries or booking discounts? Get in touch with our helpdesk.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Card className="p-8 border border-slate-200/50 dark:border-slate-800/40 shadow-xl backdrop-blur-md">
                
                <h2 className="font-extrabold text-lg text-slate-900 dark:text-white mb-6 border-b pb-3 border-slate-100 dark:border-slate-800">
                  Send us a Message
                </h2>

                {error && (
                  <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-550 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3 font-semibold">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Your message has been sent successfully! Our team will reply shortly.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="c-name">Full Name</Label>
                      <Input
                        id="c-name"
                        placeholder="Haneef Shaik"
                        error={!!errors.name}
                        {...register("name")}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-xs font-semibold">{errors.name.message}</span>
                      )}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="c-email">Email Address</Label>
                      <Input
                        id="c-email"
                        type="email"
                        placeholder="haneef@example.com"
                        error={!!errors.email}
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-xs font-semibold">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="c-subject">Subject</Label>
                    <Input
                      id="c-subject"
                      placeholder="e.g. Travel Itinerary Modification"
                      error={!!errors.subject}
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <span className="text-red-500 text-xs font-semibold">{errors.subject.message}</span>
                    )}
                  </div>

                  {/* Message Body */}
                  <div className="flex flex-col gap-1">
                    <Label htmlFor="c-msg">Message</Label>
                    <textarea
                      id="c-msg"
                      rows={5}
                      placeholder="Write your query here..."
                      className={`w-full px-4 py-2.5 rounded-xl border transition-all duration-300 text-sm font-medium
                        bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm
                        text-slate-950 dark:text-slate-50
                        placeholder-slate-400 dark:placeholder-slate-500
                        ${errors.message 
                          ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20" 
                          : "border-slate-205 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        }
                        focus:outline-none`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <span className="text-red-500 text-xs font-semibold">{errors.message.message}</span>
                    )}
                  </div>

                  <div className="pt-2">
                    <Button type="submit" variant="primary" className="w-full py-3 gap-2" disabled={isSubmitting}>
                      <Send className="w-4.5 h-4.5" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>

                </form>

              </Card>
            </div>

            {/* Right Column: Address details & Map (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              
              {/* Address details */}
              <Card className="p-6 border border-slate-200/50 dark:border-slate-800/40 shadow-xl backdrop-blur-md flex flex-col gap-4">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white border-b pb-3 border-slate-100 dark:border-slate-800/60">
                  Headquarters
                </h3>
                <ul className="flex flex-col gap-4 text-xs">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-850 dark:text-white mb-0.5">Corporate Office</span>
                      <span className="text-slate-500 dark:text-slate-400">Jubilee Hills, Road No. 36, Hyderabad, TS, India</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-850 dark:text-white mb-0.5">Corporate Email</span>
                      <a href="mailto:corporate@findtheway.com" className="text-slate-500 dark:text-slate-400 hover:text-indigo-550">
                        corporate@findtheway.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-850 dark:text-white mb-0.5">Customer Support</span>
                      <span className="text-slate-500 dark:text-slate-400">+91 (80) 4593-9900</span>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Office Location Interactive Map */}
              <Card className="overflow-hidden border border-slate-200/50 dark:border-slate-800/40 shadow-xl">
                <div className="h-64 relative">
                  <MapComponent
                    center={officeCoords}
                    zoom={14}
                    popupText="FindTheWay Office"
                  />
                </div>
              </Card>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
