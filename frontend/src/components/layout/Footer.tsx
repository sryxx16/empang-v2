import React from "react";
// Kita pakai ikon standar yang sudah pasti jalan di komponen lain
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white pt-20 pb-10 px-6 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              COMBRO FISHING
            </h3>
            <p className="text-slate-400 text-lg font-medium max-w-sm">
              Membawa pengalaman memancing ke level berikutnya dengan integrasi
              teknologi digital pertama di Indonesia.
            </p>
            <div className="flex gap-4">
              {/* Sementara kita pakai ikon Mail dan MapPin sebagai placeholder sosmed */}
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-slate-300 hover:text-white"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/30 transition-all text-slate-300 hover:text-white"
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-sm text-cyan-500">
              Navigasi
            </h4>
            <ul className="space-y-2 text-slate-400 font-bold">
              <li>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#tentang-kami"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="/booking"
                  className="hover:text-cyan-400 transition-colors"
                >
                  Booking Lomba
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-sm text-cyan-500">
              Hubungi Kami
            </h4>
            <div className="flex gap-3 text-slate-400 font-bold leading-relaxed">
              <MapPin className="shrink-0 text-slate-500" size={20} />
              <span>Jl. Raya Pemancingan No. 12, Jawa Barat - Indonesia</span>
            </div>
            <div className="flex gap-3 text-slate-400 font-bold hover:text-cyan-400 transition-colors cursor-pointer">
              <Mail className="shrink-0 text-slate-500" size={20} />
              <span>admin@combrofishing.com</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm font-bold tracking-widest uppercase flex flex-col sm:flex-row justify-center items-center gap-2">
          <span>© 2026 COMBRO FISHING.</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-slate-600">TEKNOLOGI INFORMASI UBSI</span>
        </div>
      </div>
    </footer>
  );
}
