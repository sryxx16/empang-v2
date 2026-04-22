import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Ticket, MapPin, Phone, Info, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

// --- IMPORT KOMPONEN LAMA LU (JANGAN DIHAPUS) ---
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import AboutSection from "../components/home/AboutSection";
import ProcessSection from "../components/home/ProcessSection";
import GallerySection from "../components/home/GallerySection";
import TestimonialsFAQ from "../components/home/TestimonialsFAQ";

export default function HomePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Narik data dari backend buat Live Slot & Info
    axios
      .get("/api/public/home")
      .then((res) => setData(res.data));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. FITUR BARU: INFO & LIVE SLOT TRACKER (Diselipin di bawah Hero) */}
      <motion.section 
        className="py-12 px-6 relative z-10 max-w-7xl mx-auto md:-mt-16 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-blue-900/10 border border-slate-100 dark:border-slate-800 mb-16 bg-white dark:bg-slate-900 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={cardVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-50/50 dark:via-blue-900/10 to-transparent pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {/* KOLOM KIRI: KONTAK & LOKASI */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/50">
            <h3 className="font-black text-slate-900 dark:text-white uppercase mb-6 flex items-center gap-2 text-lg">
              <Info className="text-blue-500" /> Informasi Empang
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start group">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-500 group-hover:scale-110 transition-transform">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Lokasi
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    {data?.settings?.lokasi || "Memuat lokasi..."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/50 text-cyan-500 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    WhatsApp Admin
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    +{data?.settings?.nomor_wa || "Memuat nomor..."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start pt-4 border-t border-slate-200 dark:border-slate-700 group">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-500 group-hover:scale-110 transition-transform">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Info Pembayaran
                  </p>
                  <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                    {data?.settings?.info_rekening || "Konfirmasi via WA"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: LIVE SLOT TRACKER */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-950 rounded-2xl p-6 md:p-8 text-white shadow-inner relative overflow-hidden">
            {/* Decors */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="font-black uppercase flex items-center gap-2 text-cyan-400 text-lg">
                <Ticket /> Jadwal & Sisa Lapak Terdekat
              </h3>
              <Link
                to="/booking"
                className="hidden sm:block bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-black px-6 py-2.5 rounded-full hover:opacity-90 transition-all uppercase tracking-widest shadow-lg shadow-blue-500/20"
              >
                Daftar Sekarang
              </Link>
            </div>

            <motion.div 
              className="relative z-10 space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
              variants={listContainerVariants}
              initial="hidden"
              animate={data ? "visible" : "hidden"}
            >
              {!data ? (
                <p className="text-slate-500 font-bold animate-pulse text-sm">
                  Memuat data lomba...
                </p>
              ) : data.lombas.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 text-center">
                  <p className="text-slate-400 font-bold italic">
                    Belum ada jadwal lomba aktif saat ini.
                  </p>
                </div>
              ) : (
                data.lombas.map((l: any) => (
                  <motion.div
                    key={l.id}
                    variants={listItemVariants}
                    className="bg-white/5 backdrop-blur-sm p-4 md:p-5 rounded-xl flex justify-between items-center border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                  >
                    <div>
                      <p className="font-black uppercase tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                        {l.nama_lomba}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                        {l.tanggal_lomba}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl md:text-3xl font-black text-cyan-400 leading-none group-hover:scale-110 origin-right transition-transform">
                        {l.sisa}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Sisa Lapak
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>

            <Link
              to="/booking"
              className="mt-6 block sm:hidden text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-black px-4 py-3 rounded-xl hover:opacity-90 transition-all uppercase tracking-widest w-full shadow-lg shadow-blue-500/30"
            >
              Daftar Lomba Sekarang
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 3. KOMPONEN LAMA LU TETAP AMAN DI SINI */}
      <FeaturesSection />
      <AboutSection />
      <ProcessSection />
      <GallerySection images={data?.settings?.potret_kami} />
      <TestimonialsFAQ />

      <Footer />
    </div>
  );
}
