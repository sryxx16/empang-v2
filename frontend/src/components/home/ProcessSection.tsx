import React from "react";

const steps = [
  {
    number: "01",
    title: "PILIH JADWAL",
    desc: "Pantau kalender lomba kami dan pilih tanggal yang pas untuk beraksi.",
  },
  {
    number: "02",
    title: "AMANKAN LAPAK",
    desc: "Pilih nomor lapak favoritmu dari denah digital kami sebelum didului orang lain.",
  },
  {
    number: "03",
    title: "BAYAR & MANCING",
    desc: "Selesaikan pembayaran, dan kamu tinggal datang bawa joran di hari H!",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
            Hanya 3 Langkah Mudah
          </h2>
          <p className="text-lg text-slate-500 font-medium">
            Tinggalkan cara lama. Booking lapak kini semudah memesan tiket
            bioskop.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              {/* Angka Besar di Belakang */}
              <div className="text-8xl md:text-9xl font-black text-slate-50 absolute -top-12 -left-6 z-0 group-hover:text-red-50 transition-colors duration-500">
                {step.number}
              </div>

              {/* Konten Teks */}
              <div className="relative z-10 pt-4">
                <div className="w-12 h-1 bg-[#ff4d4d] mb-6 rounded-full"></div>
                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
