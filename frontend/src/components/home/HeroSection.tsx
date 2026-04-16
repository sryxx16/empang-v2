import React from "react";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col lg:flex-row items-center gap-16">
      {/* Kiri: Teks Informasi */}
      <div className="flex-1 space-y-8">
        <div className="inline-flex items-center gap-2 bg-red-50 text-[#ff4d4d] px-4 py-1.5 rounded-full text-sm font-black border border-red-100 uppercase tracking-widest">
          Info Lomba Terbaru 🏆
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter uppercase">
          Mancing Nyaman, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d4d] to-red-600"></span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-700">
          Amankan pendaftaran Sekarang!
        </h2>

        <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
          Sistem informasi pemancingan modern untuk Combro Fishing. Kelola
          pendaftaran, pilih lapak strategis, dan pantau hasil lomba secara
          real-time.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-4">
          <a
            href="#booking"
            className="bg-[#ff4d4d] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center gap-3 shadow-lg shadow-red-200"
          >
            BOOKING SEKARANG <ArrowRight size={24} strokeWidth={3} />
          </a>
          <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all">
            LIHAT JADWAL
          </button>
        </div>
      </div>

      {/* Kanan: Foto (Placeholder Image) */}
      <div className="flex-1 w-full lg:w-auto">
        <div className="relative rounded-[2rem] overflow-hidden border-[12px] border-white shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 aspect-[4/5] bg-slate-200">
          {/* Kamu bisa mengganti src di bawah ini dengan foto pemancing yang kamu punya */}
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Fisherman"
            className="w-full h-full object-cover"
          />
          {/* Badge Overlay ala ISO Meet */}
          <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/50">
            <p className="text-slate-900 font-black text-xl mb-1">
              Lapak A1 - VIP
            </p>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
              Tersedia untuk Lomba Minggu Ini
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
