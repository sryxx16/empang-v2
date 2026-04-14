import React from "react";
// Kita pakai ikon standar yang sudah pasti jalan di komponen lain
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-3xl font-black tracking-tighter uppercase">
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
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ff4d4d] transition-all"
              >
                <Mail size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#ff4d4d] transition-all"
              >
                <MapPin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-sm text-red-500">
              Navigasi
            </h4>
            <ul className="space-y-2 text-slate-400 font-bold">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#tentang-kami"
                  className="hover:text-white transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="hover:text-white transition-colors"
                >
                  Booking Lomba
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-black uppercase tracking-widest text-sm text-red-500">
              Hubungi Kami
            </h4>
            <div className="flex gap-3 text-slate-400 font-bold leading-relaxed">
              <MapPin className="shrink-0" size={20} />
              <span>Jl. Raya Pemancingan No. 12, Jawa Barat - Indonesia</span>
            </div>
            <div className="flex gap-3 text-slate-400 font-bold">
              <Mail className="shrink-0" size={20} />
              <span>admin@combrofishing.com</span>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 text-center text-slate-500 text-sm font-bold tracking-widest uppercase">
          © 2026 COMBRO FISHING - TEKNOLOGI INFORMASI UBSI
        </div>
      </div>
    </footer>
  );
}
