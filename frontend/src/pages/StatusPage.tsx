import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Search, Ticket } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-20 px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-red-50 text-[#ff4d4d] rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Ticket size={40} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
            Cek Status Booking
          </h1>
          <p className="text-slate-500 font-medium mb-8">
            Masukkan Kode Booking atau Nomor HP untuk melihat status verifikasi
            pendaftaran Anda.
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Contoh: CB-2026-XXXX"
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700"
              />
            </div>
            <button className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg">
              CARI DATA
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
