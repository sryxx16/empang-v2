import React from "react";
import { Anchor, Users, Award, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: <Anchor className="text-[#ff4d4d]" size={28} />,
    value: "50+",
    label: "Lapak Premium",
  },
  {
    icon: <Users className="text-[#ff4d4d]" size={28} />,
    value: "2.5K+",
    label: "Angler Aktif",
  },
  {
    icon: <Award className="text-[#ff4d4d]" size={28} />,
    value: "100+",
    label: "Lomba Sukses",
  },
  {
    icon: <ShieldCheck className="text-[#ff4d4d]" size={28} />,
    value: "24/7",
    label: "Sistem Aktif",
  },
];

export default function AboutSection() {
  return (
    <section
      id="tentang-kami"
      className="py-24 px-6 bg-white border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Kiri: Teks Tentang Kami */}
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-black border border-slate-200 uppercase tracking-widest">
            Tentang Kami 🎣
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[1.1]">
            Lebih Dari Sekadar <br />
            <span className="text-[#ff4d4d]">Kolam Pancing</span>
          </h2>

          <div className="space-y-4 text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
            <p>
              Combro Fishing hadir untuk mendobrak tradisi lama. Kami memadukan
              fasilitas kolam pemancingan kelas satu dengan teknologi reservasi
              digital yang modern dan transparan.
            </p>
            <p>
              Visi kami sederhana: Memberikan kenyamanan maksimal bagi para
              *angler*. Dari saat Anda memilih lapak di rumah, hingga momen Anda
              mengangkat trofi juara di kolam kami.
            </p>
          </div>
        </div>

        {/* Kanan: Grid Statistik */}
        <div className="flex-1 w-full grid grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 hover:border-red-100 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
