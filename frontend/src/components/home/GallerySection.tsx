import React from "react";

const images = [
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1499244015948-ac7565928727?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
];

export default function GallerySection() {
  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            Potret <br /> Area Kami
          </h2>
          <p className="text-slate-500 font-bold max-w-sm">
            Fasilitas kolam yang bersih dan asri demi kenyamanan Anda selama
            mengikuti perlombaan.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-[2rem] overflow-hidden border-4 border-white shadow-md hover:scale-95 transition-transform duration-500 cursor-zoom-in"
            >
              <img
                src={img}
                className="w-full h-full object-cover"
                alt="Gallery"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
