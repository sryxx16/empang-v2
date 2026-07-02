import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RulesSection() {
  const rules = [
    "Dilarang membawa umpan hidup (cacing, ulat, dll) selain umpan yang disediakan/diperbolehkan panitia.",
    "Satu lapak maksimal menggunakan 2 joran pancing.",
    "Dilarang keras membuang sampah sembarangan (plastik, bungkus kail, dll) ke dalam kolam.",
    "Dilarang menggunakan mata kail lebih dari 3 (rigging) per joran.",
    "Peserta wajib menjaga ketertiban dan tidak mengganggu lapak peserta lain.",
    "Keputusan panitia mengenai hasil timbangan dan pemenang bersifat mutlak dan tidak dapat diganggu gugat."
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="max-w-7xl mx-auto px-6 w-full mb-16"
    >
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 md:p-10 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-tr-full pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl shrink-0 hidden md:block">
            <ShieldAlert size={40} />
          </div>
          
          <div className="w-full text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <ShieldAlert className="text-red-500 md:hidden" size={24} />
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                Tata Tertib & Peraturan
              </h2>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-8 max-w-2xl mx-auto md:mx-0">
              Mohon patuhi peraturan berikut demi kenyamanan bersama dan kelancaran perlombaan.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-md transition-shadow">
                  <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={18} />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">
                    {rule}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl border border-amber-200 dark:border-amber-700/30 text-left">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} />
              <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                Peserta yang melanggar peraturan dapat dikenakan sanksi diskualifikasi tanpa pengembalian uang pendaftaran.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
