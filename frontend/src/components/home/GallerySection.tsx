import React from "react";

interface GalleryProps {
  images?: string[];
}

export default function GallerySection({ images = [] }: GalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 overflow-hidden">
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
        
        {/* CAROUSEL WRAPPER */}
        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory custom-scrollbar">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-none w-[80vw] md:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white shadow-lg snap-center shrink-0 cursor-grab active:cursor-grabbing hover:scale-[1.02] transition-transform duration-300"
            >
              <img
                src={img.startsWith('http') ? img : img}
                className="w-full h-full object-cover pointer-events-none"
                alt={`Potret ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
