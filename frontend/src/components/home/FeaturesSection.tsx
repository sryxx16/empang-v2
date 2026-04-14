import React from "react";
import { Map, Clock, Trophy, Wallet } from "lucide-react";

const features = [
  {
    icon: <Map className="text-[#ff4d4d]" size={32} strokeWidth={1.5} />,
    title: "DENAH LAPAK PRESISI",
    desc: "Tidak ada lagi rebutan posisi. Pilih lapak strategismu sejak dari rumah.",
  },
  {
    icon: <Clock className="text-[#ff4d4d]" size={32} strokeWidth={1.5} />,
    title: "SISTEM 24 JAM",
    desc: "War tiket lomba tengah malam? Bisa. Sistem kami memproses pendaftaran otomatis.",
  },
  {
    icon: <Trophy className="text-[#ff4d4d]" size={32} strokeWidth={1.5} />,
    title: "LIVE INFO LOMBA",
    desc: "Pantau total peserta dan rincian hadiah lomba secara real-time dari *dashboard*.",
  },
  {
    icon: <Wallet className="text-[#ff4d4d]" size={32} strokeWidth={1.5} />,
    title: "TRANSAKSI AMAN",
    desc: "Riwayat pembayaran tercatat rapi, memudahkan verifikasi oleh panitia.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 px-6 border-t border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        {/* Teks Penjelasan Kiri */}
        <div className="lg:w-1/3 sticky top-32">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-tight">
            Fasilitas <br className="hidden lg:block" /> Premium
          </h2>
          <p className="text-lg text-slate-500 font-medium mb-8">
            Combro Fishing tidak hanya menawarkan kolam yang nyaman, tapi juga
            pengalaman pendaftaran digital terbaik untuk para *angler*.
          </p>
          <button className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-3 rounded-xl font-bold hover:border-slate-300 transition-colors">
            Lihat Galeri Kolam
          </button>
        </div>

        {/* Grid Kotak Fitur Kanan */}
        <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#ff4d4d] group-hover:text-white transition-all [&>svg]:group-hover:text-white">
                {feat.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
