import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ProcessSection from "../components/home/ProcessSection";
import FeaturesSection from "../components/home/FeaturesSection";
import GallerySection from "../components/home/GallerySection";
import TestimonialsFAQ from "../components/home/TestimonialsFAQ";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-red-100 selection:text-[#ff4d4d] scroll-smooth">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <GallerySection />
        <FeaturesSection />
        <TestimonialsFAQ />
        {/* Section Form Booking Dihapus dari Sini! */}
      </main>
      <Footer />
    </div>
  );
}
