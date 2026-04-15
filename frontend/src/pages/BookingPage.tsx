import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BookingForm from "../components/home/BookingForm";

export default function BookingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Tombol Back Sederhana */}
      <div className="max-w-7xl mx-auto w-full px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-red-50 group-hover:text-[#ff4d4d] transition-all">
            <ArrowLeft size={20} />
          </div>
          KEMBALI KE BERANDA
        </button>
      </div>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">
          <div className="flex-1 space-y-6 lg:pt-10">
            <h1 className="text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              Formulir <br />
              <span className="text-[#ff4d4d]">Pendaftaran Lomba</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
              Pilih jadwal yang tersedia. Harga akan muncul otomatis sesuai
              ketentuan panitia. Nomor lapak akan ditentukan melalui pengocokan
              di lokasi.
            </p>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <BookingForm />
          </div>
        </div>
      </main>
    </div>
  );
}
