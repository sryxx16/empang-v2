import React from 'react';
import { motion } from 'framer-motion';
import { Map, Info } from 'lucide-react';

export default function LapakLayoutSection() {
  // 17 Lapak untuk Lapak A dan Lapak B
  const lapakA = Array.from({ length: 17 }, (_, i) => i + 1);
  const lapakB = Array.from({ length: 17 }, (_, i) => i + 18);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-7xl mx-auto px-6 w-full mb-16 relative z-10"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
          <Map className="text-cyan-500" size={32} /> Denah Lapak
        </h2>
        <p className="text-slate-600 dark:text-slate-400 font-medium max-w-2xl mx-auto">
          Cek posisi lapak pilihan Anda. Pengundian nomor lapak akan dilakukan di lokasi perlombaan.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-10 shadow-xl border border-slate-200 dark:border-slate-700 overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px] flex flex-col gap-6 p-4">
          
          {/* Lapak A (Top) */}
          <div className="flex flex-col gap-2">
            <div className="text-center font-black text-slate-400 uppercase tracking-widest text-sm bg-slate-100 dark:bg-slate-700/50 py-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
              Zona Lapak A (1 - 17)
            </div>
            <div className="flex justify-between gap-2 mt-2">
              {lapakA.map(num => (
                <div key={num} className="flex-1 flex flex-col items-center group">
                  <div className="w-full aspect-square bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center font-black text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-cyan-900/30 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all cursor-pointer shadow-sm relative">
                    <span className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-800 text-white px-2 py-1 rounded-md whitespace-nowrap z-10 pointer-events-none">
                      Lapak {num}
                    </span>
                    {num}
                  </div>
                  <div className="w-1.5 h-6 bg-slate-300 dark:bg-slate-600 mt-1 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolam Air (Middle) */}
          <div className="h-40 bg-gradient-to-b from-cyan-300 to-blue-500 dark:from-cyan-800 dark:to-blue-900 rounded-2xl relative flex items-center justify-center shadow-inner overflow-hidden border-4 border-slate-200 dark:border-slate-700">
            {/* Gelombang / riak air SVG */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="water" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 Q10 10 20 20 T40 20" fill="none" stroke="white" strokeWidth="2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#water)" />
              </svg>
            </div>
            <span className="font-black text-white/70 text-4xl tracking-[0.3em] uppercase relative z-10 drop-shadow-md">
              KOLAM PANCING
            </span>
          </div>

          {/* Lapak B (Bottom) */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2 mb-2">
              {lapakB.map(num => (
                <div key={num} className="flex-1 flex flex-col items-center group">
                  <div className="w-1.5 h-6 bg-slate-300 dark:bg-slate-600 mb-1 rounded-full"></div>
                  <div className="w-full aspect-square bg-slate-50 dark:bg-slate-700/50 rounded-lg flex items-center justify-center font-black text-slate-600 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-600 group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-cyan-900/30 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-all cursor-pointer shadow-sm relative">
                    <span className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] bg-slate-800 text-white px-2 py-1 rounded-md whitespace-nowrap z-10 pointer-events-none">
                      Lapak {num}
                    </span>
                    {num}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center font-black text-slate-400 uppercase tracking-widest text-sm bg-slate-100 dark:bg-slate-700/50 py-2 rounded-xl border border-slate-200 dark:border-slate-700/50">
              Zona Lapak B (18 - 34)
            </div>
          </div>

        </div>
      </div>
      
      <div className="mt-6 flex justify-center">
         <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2.5 rounded-full border border-blue-100 dark:border-blue-800/30">
           <Info className="text-blue-500" size={18} />
           <span className="text-xs font-bold text-blue-700 dark:text-blue-400">Geser (scroll) mendatar untuk melihat denah utuh pada layar HP</span>
         </div>
      </div>
    </motion.section>
  );
}
