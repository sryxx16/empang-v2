import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/public/home");
        if (res.data && res.data.settings) {
          setSettings(res.data.settings);
        }
      } catch (err) {
        console.error("Gagal load settings", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-white pt-12 pb-6 px-6 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h3 className="text-2xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
              {settings?.nama_pemancingan || "COMBRO FISHING"}
            </h3>
            <p className="text-slate-400 text-sm font-medium max-w-sm">
              Membawa pengalaman memancing ke level berikutnya dengan integrasi
              teknologi digital pertama di Indonesia.
            </p>
            <div className="flex gap-3">
              {/* Link Sosial Media placeholder */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 transition-all text-slate-300 hover:text-white"
              >
                <Mail size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-gradient-to-br hover:from-blue-600 hover:to-cyan-500 transition-all text-slate-300 hover:text-white"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-black uppercase tracking-widest text-xs text-cyan-500">
              Navigasi
            </h4>
            <ul className="space-y-1 text-slate-400 font-bold text-sm">
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

          <div className="space-y-3">
            <h4 className="font-black uppercase tracking-widest text-xs text-cyan-500">
              Hubungi Kami
            </h4>
            <div className="flex gap-3 text-slate-400 font-bold text-sm leading-relaxed">
              <MapPin className="shrink-0 text-slate-500 mt-0.5" size={16} />
              <span>{settings?.lokasi || "Jl. Raya Pemancingan No. 12, Jawa Barat - Indonesia"}</span>
            </div>
            <div className="flex gap-3 text-slate-400 font-bold text-sm hover:text-cyan-400 transition-colors cursor-pointer">
              <Phone className="shrink-0 text-slate-500 mt-0.5" size={16} />
              <span>{settings?.nomor_wa || "0812-3456-7890"}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-slate-500 text-[10px] font-bold tracking-widest uppercase flex flex-col sm:flex-row justify-center items-center gap-2">
          <span>© 2026 {settings?.nama_pemancingan || "COMBRO FISHING"}.</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-slate-600">TEKNOLOGI INFORMASI UBSI</span>
        </div>
      </div>
    </footer>
  );
}
