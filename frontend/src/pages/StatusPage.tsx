import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Search,
  Ticket,
  Loader2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function StatusPage() {
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;

    setIsLoading(true);
    setErrorMsg("");
    setResult(null);

    try {
      // Menembak API Laravel yang baru kita buat
      const response = await axios.get(
        `http://localhost/api/bookings/check/${searchName}`,
      );
      setResult(response.data.data);
    } catch (error: any) {
      // Menangkap pesan error "Data tidak ditemukan" dari Laravel
      setErrorMsg(
        error.response?.data?.message || "Terjadi kesalahan pada server.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-grow py-20 px-6 flex flex-col items-center">
        {/* Kontainer Utama */}
        <div className="max-w-xl w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
          {/* Dekorasi Latar */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>

          <div className="w-20 h-20 bg-red-50 text-[#ff4d4d] rounded-3xl flex items-center justify-center mx-auto mb-8 relative z-10 shadow-sm border border-red-100">
            <Ticket size={40} strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter relative z-10">
            Cek Status Booking
          </h1>
          <p className="text-slate-500 font-medium mb-8 relative z-10">
            Masukkan Nama Lengkap yang Anda gunakan saat mendaftar untuk melihat
            status verifikasi tiket.
          </p>

          <form className="space-y-4 relative z-10" onSubmit={handleSearch}>
            <div className="relative">
              <Search
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Masukkan Nama Lengkap..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50 focus:bg-white"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-black py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2
                ${isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 hover:scale-[1.02] active:scale-95"}`}
            >
              {isLoading ? (
                <Loader2 size={22} className="animate-spin" />
              ) : (
                "CARI DATA TIKET"
              )}
            </button>
          </form>
        </div>

        {/* --- AREA HASIL PENCARIAN --- */}
        <div className="max-w-xl w-full mt-8">
          {/* 1. Jika Error / Tidak Ketemu */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-3xl flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm">
              <AlertCircle className="shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="font-black text-lg uppercase tracking-tight mb-1">
                  Pencarian Gagal
                </h3>
                <p className="font-medium text-sm text-red-500">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* 2. Jika Berhasil / Ketemu */}
          {result && (
            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              {/* Garis Dekorasi Tiket */}
              <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#ff4d4d]"></div>

              <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                    Tiket Atas Nama
                  </p>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                    {result.nama}
                  </h2>
                </div>
                {/* Badge Status Dinamis */}
                <div
                  className={`px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wide flex items-center gap-2 border
                  ${
                    result.status === "pending"
                      ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                      : "bg-green-50 text-green-600 border-green-200"
                  }`}
                >
                  {result.status === "pending" ? (
                    <Clock size={16} />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  {result.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                    Tanggal Lomba
                  </p>
                  <p className="text-lg font-bold text-slate-700">
                    {result.tanggal}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                    Waktu Mendaftar
                  </p>
                  <p className="text-lg font-bold text-slate-700">
                    {result.dibuat_pada}
                  </p>
                </div>
              </div>

              {result.status === "pending" && (
                <div className="mt-8 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm font-medium text-slate-500 text-center">
                  Segera selesaikan pembayaran dan konfirmasi ke WhatsApp Admin
                  agar status berubah menjadi <strong>Verified</strong>.
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
