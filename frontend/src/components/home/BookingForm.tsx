import React, { useState } from "react";
import { Calendar, MapPin, User, CheckCircle2 } from "lucide-react";

export default function BookingForm() {
  // LOGIKA STATE: Tempat penampungan data sebelum dikirim ke backend
  const [formData, setFormData] = useState({
    nama_peserta: "",
    tanggal_lomba: "",
    nomor_lapak: "",
  });

  // Fungsi untuk merekam ketikan user secara real-time
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fungsi yang akan dijalankan saat tombol ditekan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data siap dikirim ke Laravel:", formData);
    // TODO: Di sinilah nanti kita pasang Axios untuk nembak API
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
      {/* Dekorasi tipis di pojok kanan atas */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-60"></div>

      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-slate-900 tracking-tight">
        <Calendar className="text-[#ff4d4d]" size={32} strokeWidth={2.5} />
        MULAI BOOKING
      </h2>

      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
        {/* Input Nama */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Nama Lengkap
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <input
              type="text"
              name="nama_peserta"
              value={formData.nama_peserta}
              onChange={handleChange}
              placeholder="Masukkan nama sesuai KTP/ID"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
              required
            />
          </div>
        </div>

        {/* Input Tanggal */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Pilih Tanggal Lomba
          </label>
          <input
            type="date"
            name="tanggal_lomba"
            value={formData.tanggal_lomba}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-medium text-slate-700 bg-slate-50 focus:bg-white"
            required
          />
        </div>

        {/* Input Lapak */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Nomor Lapak
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <select
              name="nomor_lapak"
              value={formData.nomor_lapak}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all appearance-none font-medium text-slate-700 bg-slate-50 focus:bg-white cursor-pointer"
              required
            >
              <option value="" disabled>
                Pilih Lapak Kosong...
              </option>
              <option value="A1">Lapak A1 (VIP)</option>
              <option value="A2">Lapak A2</option>
              <option value="B1">Lapak B1</option>
            </select>
          </div>
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-[#ff4d4d] text-white font-black py-4 rounded-xl hover:bg-[#e64444] transition-all shadow-lg shadow-red-200 mt-6 flex items-center justify-center gap-2 hover:scale-[1.02]"
        >
          <CheckCircle2 size={22} strokeWidth={3} />
          LANJUTKAN PEMBAYARAN
        </button>
      </form>
    </div>
  );
}
