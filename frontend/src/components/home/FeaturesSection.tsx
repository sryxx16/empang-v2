import React from "react";
import { Map, Clock, Trophy, Wallet } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Map className="text-blue-500 dark:text-cyan-400" size={32} strokeWidth={1.5} />,
    title: "DENAH LAPAK PRESISI",
    desc: "Tidak ada lagi rebutan posisi. Pilih lapak strategismu sejak dari rumah.",
  },
  {
    icon: <Clock className="text-blue-500 dark:text-cyan-400" size={32} strokeWidth={1.5} />,
    title: "SISTEM 24 JAM",
    desc: "War tiket lomba tengah malam? Bisa. Sistem kami memproses pendaftaran otomatis.",
  },
  {
    icon: <Trophy className="text-blue-500 dark:text-cyan-400" size={32} strokeWidth={1.5} />,
    title: "LIVE INFO LOMBA",
    desc: "Pantau total peserta dan rincian hadiah lomba secara real-time dari *dashboard*.",
  },
  {
    icon: <Wallet className="text-blue-500 dark:text-cyan-400" size={32} strokeWidth={1.5} />,
    title: "TRANSAKSI AMAN",
    desc: "Riwayat pembayaran tercatat rapi, memudahkan verifikasi oleh panitia.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 px-6 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start relative z-10">
        {/* Teks Penjelasan Kiri */}
        <motion.div 
          className="lg:w-1/3 sticky top-32"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-tight transition-colors">
            Fasilitas <br className="hidden lg:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Premium</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mb-8 transition-colors">
            Combro Fishing tidak hanya menawarkan kolam yang nyaman, tapi juga
            pengalaman pendaftaran digital terbaik untuk para *angler*.
          </p>
          <button className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-8 py-3 rounded-xl font-bold hover:border-blue-500 dark:hover:border-cyan-500 hover:text-blue-600 dark:hover:text-cyan-400 transition-all shadow-sm">
            Lihat Galeri Kolam
          </button>
        </motion.div>

        {/* Grid Kotak Fitur Kanan */}
        <motion.div 
          className="lg:w-2/3 grid sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feat, idx) => (
            <motion.div
              variants={cardVariants}
              key={idx}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-500 group-hover:text-white transition-all [&>svg]:group-hover:text-white">
                {feat.icon}
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight transition-colors">
                {feat.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed transition-colors">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
