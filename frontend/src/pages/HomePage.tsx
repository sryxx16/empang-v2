import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Ticket, MapPin, Phone, Info, CreditCard } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* 1. HERO SECTION LAMA LU */}
      <HeroSection />

      {/* 2. FITUR BARU: INFO & LIVE SLOT TRACKER (Diselipin di bawah Hero) */}
      <section className="py-12 px-6 bg-white relative z-10 max-w-7xl mx-auto md:-mt-16 rounded-3xl shadow-xl border border-slate-100 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM KIRI: KONTAK & LOKASI */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="font-black text-slate-900 uppercase mb-6 flex items-center gap-2 text-lg">
              <Info className="text-[#ff4d4d]" /> Informasi Empang
            </h3>
            <div className="space-y-5">
              <div className="flex gap-4 items-start">
                <MapPin className="text-slate-400 shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Lokasi
                  </p>
                  <p className="font-bold text-slate-700">
                    {data?.settings?.lokasi || "Memuat lokasi..."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Phone className="text-slate-400 shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    WhatsApp Admin
                  </p>
                  <p className="font-bold text-slate-700">
                    +{data?.settings?.nomor_wa || "Memuat nomor..."}
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start pt-4 border-t border-slate-200">
                <CreditCard className="text-slate-400 shrink-0 mt-1" />
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Info Pembayaran
                  </p>
                  <p className="font-bold text-slate-700 text-sm">
                    {data?.settings?.info_rekening || "Konfirmasi via WA"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: LIVE SLOT TRACKER */}
          <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-inner">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black uppercase flex items-center gap-2 text-[#ff4d4d] text-lg">
                <Ticket /> Jadwal & Sisa Lapak Terdekat
              </h3>
              <Link
                to="/booking"
                className="hidden md:block bg-[#ff4d4d] text-white text-xs font-black px-4 py-2 rounded-lg hover:bg-red-600 transition-colors uppercase tracking-widest"
              >
                Daftar Sekarang
              </Link>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {!data ? (
                <p className="text-slate-500 font-bold animate-pulse text-sm">
                  Memuat data lomba...
                </p>
              ) : data.lombas.length === 0 ? (
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
                  <p className="text-slate-400 font-bold italic">
                    Belum ada jadwal lomba aktif saat ini.
                  </p>
                </div>
              ) : (
                data.lombas.map((l: any) => (
                  <div
                    key={l.id}
                    className="bg-slate-800 p-4 md:p-5 rounded-xl flex justify-between items-center border border-slate-700 hover:border-slate-500 transition-colors"
                  >
                    <div>
                      <p className="font-black uppercase tracking-tight text-white">
                        {l.nama_lomba}
                      </p>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                        {l.tanggal_lomba}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl md:text-3xl font-black text-[#ff4d4d] leading-none">
                        {l.sisa}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Sisa Lapak
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Link
              to="/booking"
              className="mt-6 block md:hidden text-center bg-[#ff4d4d] text-white text-sm font-black px-4 py-3 rounded-xl hover:bg-red-600 transition-colors uppercase tracking-widest w-full"
            >
              Daftar Lomba Sekarang
            </Link>
          </div>
        </div>
      </section>

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
