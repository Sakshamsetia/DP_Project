"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#1E2A44] text-gray-100">
      {/* Header */}
      <header className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-6">
        <div className="font-extrabold text-2xl bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
          MedicAI
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-blue-200/80">
          <a href="#features" className="hover:text-blue-300">Features</a>
          <a href="#community" className="hover:text-blue-300">Community</a>
          <a href="#about" className="hover:text-blue-300">About</a>
        </nav>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500">
            Sign in
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500">
            Sign up
          </Button>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-blue-200">
              Upload your X-rays. Obtain reports.
            </h1>
            <p className="mt-4 text-lg text-blue-100/90">
              Join us as we help you detect any tumors ahead of time.
            </p>
            <div className="mt-6 flex gap-3">
              <Button className="bg-gradient-to-r from-blue-500/50 to-blue-400 text-white hover:from-blue-600 hover:to-blue-500 px-6 py-3">
                Get Started
              </Button>
            </div>
          </motion.div>

          {/* Right side illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="rounded-2xl shadow-lg w-full h-80 flex items-center justify-center bg-white text-blue-600">
              <img src="/images/MRI.png" />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="py-16 bg-gradient-to-r from-blue-500/50 to-blue-400 text-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col gap-8">
          {[
            ["Upload your Scans", "We use both MRI and CT Scans to identify any tumors or cancer."],
            ["Readable Reports", "Obtain easy-to-read reports that allow complete transparency."],
            ["Easy Doctor Interaction", "Chat with doctors to obtain advice from certified professionals."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="p-10 rounded-xl shadow-sm border border-blue-400/30 bg-[#253B6E]/80"
            >
              <h3 className="font-semibold text-lg text-blue-200">{title}</h3>
              <p className="mt-2 text-blue-100/90 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-blue-200">
        © {new Date().getFullYear()} MedicAI. Built for helping.
      </footer>
    </div>
  );
}
