import React, { useState } from "react";
import { Quote, ChevronDown, ChevronUp } from "lucide-react";

const reviews = [
  {
    name: "Pak Haji Mulyono",
    role: "Angler Senior",
    text: "Dulu harus datang subuh buat rebutan lapak, sekarang sambil ngopi di rumah sudah beres pendaftarannya. Mantap!",
  },
  {
    name: "Andri Setiawan",
    role: "Juara Galatama 2025",
    text: "Sistem laporannya transparan banget. Kita bisa lihat siapa saja saingan kita di lomba nanti lewat web ini.",
  },
];

const faqs = [
  {
    q: "Bagaimana cara membatalkan booking?",
    a: "Pembatalan dapat dilakukan maksimal H-1 lomba melalui fitur Cek Status atau hubungi WhatsApp Admin.",
  },
  {
    q: "Apakah bisa bayar di tempat (COD)?",
    a: "Untuk mengamankan lapak, pembayaran wajib dilakukan via transfer bank atau E-Wallet dalam 1x24 jam.",
  },
  {
    q: "Peralatan mancing disediakan?",
    a: "Kami menyediakan persewaan joran dan umpan standar di lokasi (Kantin Combro).",
  },
];

export default function TestimonialsFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
        {/* Sisi Kiri: Testimoni */}
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-12">
            Kata Mereka 💬
          </h2>
          <div className="space-y-6">
            {reviews.map((rev, i) => (
              <div
                key={i}
                className="bg-slate-50 p-8 rounded-[2rem] relative border border-slate-100"
              >
                <Quote
                  className="text-red-100 absolute top-6 right-8"
                  size={48}
                />
                <p className="text-lg text-slate-600 font-medium italic mb-6">
                  "{rev.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-500"></div>
                  <div>
                    <p className="font-black text-slate-900 uppercase text-sm">
                      {rev.name}
                    </p>
                    <p className="text-xs text-slate-400 font-bold tracking-widest">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sisi Kanan: FAQ */}
        <div>
          <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-12">
            Pertanyaan Umum ❓
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-slate-100">
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full py-5 flex justify-between items-center text-left hover:text-[#ff4d4d] transition-colors"
                >
                  <span className="font-black text-lg text-slate-800 uppercase tracking-tight">
                    {faq.q}
                  </span>
                  {openIdx === i ? <ChevronUp /> : <ChevronDown />}
                </button>
                {openIdx === i && (
                  <p className="pb-5 text-slate-500 font-medium leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
