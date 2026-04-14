import React from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // Import Baru
import HeroSection from "./components/home/HeroSection";
import AboutSection from "./components/home/AboutSection";
import ProcessSection from "./components/home/ProcessSection";
import FeaturesSection from "./components/home/FeaturesSection";
import GallerySection from "./components/home/GallerySection"; // Import Baru
import TestimonialsFAQ from "./components/home/TestimonialsFAQ"; // Import Baru
import BookingForm from "./components/home/BookingForm";

function App() {
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

        <section
          id="booking"
          className="py-24 px-6 bg-slate-900 text-white rounded-t-[3rem] md:rounded-t-[5rem]"
        >
          <div className="max-w-7xl mx-auto flex flex-col items-center">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                Formulir Pendaftaran
              </h2>
              <p className="text-lg text-slate-400 font-medium italic">
                "Amankan joranmu sebelum yang lain."
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <BookingForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
