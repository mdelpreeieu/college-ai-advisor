"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/save-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      let data: { error?: string; message?: string } = {};
      try {
        data = await res.json();
      } catch {
        data = { error: "No response body" };
      }

      if (res.ok) {
        setMessage("🎉 You're on the waitlist!");
        setEmail("");
      } else {
        setMessage("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      setMessage("❌ Network error: " + (error as Error).message);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{ backgroundColor: "#E6ECEF" }}
    >
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <img src="/logos/logo.jpg" alt="College Advisor Logo" className="h-50 w-auto" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-6"
      >
        Your Personal AI College Advisor
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg text-gray-600 text-center max-w-xl mb-8"
      >
        Upload your grades, test scores, and achievements. Get matched with the best-fit universities.
        Track your applications and get personalized improvement tips — all in one platform.
      </motion.p>

      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <p className="text-lg font-semibold mb-4">Join the waitlist</p>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
              required
            />
            <Button className="w-full" type="submit">
              Notify Me
            </Button>
          </form>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </CardContent>
      </Card>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl"
      >
        {[
          {
            title: "Smart University Matches",
            desc: "Find universities where you have the best chance of getting accepted based on your profile.",
          },
          {
            title: "Personalized Application Checklists",
            desc: "Know exactly what documents are needed for each university you wish to apply to. Stay organized and never miss a requirement.",
          },
          {
            title: "Guided Improvement",
            desc: "Get action-oriented recommendations to improve your application if you're aiming for top-tier schools.",
          },
        ].map(({ title, desc }) => (
          <Card key={title} className="p-4">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Demo Video */}
      <div className="mt-16 w-full max-w-3xl text-center">
        <h2 className="text-2xl font-bold mb-4">See It in Action</h2>
        <div className="aspect-w-16 aspect-h-9">
        <video
          controls
          className="w-full rounded-2xl shadow-lg"
        >
          <source src="/videos/college-demo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 max-w-5xl">
        <h2 className="text-2xl font-bold text-center mb-6">What Students Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-700 italic">
                "I had no idea where to apply. This platform matched me with 8 universities and helped me track every step."
              </p>
              <p className="text-right mt-2 font-semibold">— Emily, Class of 2024</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-700 italic">
                "It’s like having a personal college counselor. I even got tips on how to improve my application for Columbia!"
              </p>
              <p className="text-right mt-2 font-semibold">— Marcus, Class of 2023</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* University Logos */}
      <div className="mt-16 w-full max-w-4xl text-center">
        <h2 className="text-2xl font-bold mb-6">Our Matches Include</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <img src="/logos/harvard.png" alt="Harvard" className="h-10" />
          <img src="/logos/mit.png" alt="MIT" className="h-10" />
          <img src="/logos/ucla.png" alt="UCLA" className="h-10" />
          <img src="/logos/oxford.jpeg" alt="Oxford" className="h-10" />
        </div>
      </div>

      {/* CTA for different users */}
      <div className="mt-20 w-full max-w-5xl grid gap-6 grid-cols-1 md:grid-cols-3 text-center">
        {[
          {
            role: "Students",
            msg: "Take control of your college future today.",
          },
          {
            role: "Parents",
            msg: "Support your child’s journey with clear tools and expert guidance.",
          },
          {
            role: "Counselors",
            msg: "Empower your students with modern tools for success.",
          },
        ].map(({ role, msg }) => (
          <Card key={role} className="p-6">
            <CardContent>
              <h3 className="text-xl font-bold mb-2">{role}</h3>
              <p className="text-gray-600 mb-4">{msg}</p>
              <Button>Get Started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}

