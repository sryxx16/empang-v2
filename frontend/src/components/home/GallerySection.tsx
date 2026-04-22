import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryProps {
  images?: string[];
}

export default function GallerySection({ images = [] }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <>
      <section className="py-24 px-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none transition-colors">
              Potret <br /> Area Kami
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold max-w-sm transition-colors">
              Fasilitas kolam yang bersih dan asri demi kenyamanan Anda selama
              mengikuti perlombaan.
            </p>
          </motion.div>
          
          {/* CAROUSEL WRAPPER */}
          <motion.div 
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x snap-mandatory custom-scrollbar"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {images.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedImage(img.startsWith('http') ? img : img)}
                className="flex-none w-[80vw] md:w-[400px] aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg snap-center shrink-0 cursor-pointer transition-colors"
              >
                <img
                  src={img.startsWith('http') ? img : img}
                  className="w-full h-full object-cover pointer-events-none"
                  alt={`Potret ${i + 1}`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* LIGHTBOX POPUP */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} strokeWidth={2.5} />
            </motion.button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              src={selectedImage} 
              alt="Enlarged Potret" 
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
