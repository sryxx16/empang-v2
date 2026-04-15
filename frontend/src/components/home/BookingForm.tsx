import React, { useState } from "react";
import { Calendar, User, CheckCircle2, Users, Wallet } from "lucide-react";

// Simulasi Data Jadwal dari Panitia (Nantinya data ini ditarik dari Laravel)
const JADWAL_PANITIA = [
  {
    id: "1",
    hari: "Minggu, 19 April 2026",
    kategori: "Lomba Mingguan",
    harga: 150000,
    terdaftar: 12,
  },
  {
    id: "2",
    hari: "Sabtu, 25 April 2026",
    kategori: "Galatama Spesial",
    harga: 250000,
    terdaftar: 8,
  },
  {
    id: "3",
    hari: "Minggu, 26 April 2026",
    kategori: "Lomba Mingguan",
    harga: 150000,
    terdaftar: 5,
  },
];

export default function BookingForm() {
  // State untuk menampung inputan form
  const [formData, setFormData] = useState({
    nama_peserta: "",
    jadwal_id: "",
  });

  // State untuk menampung data jadwal yang sedang dipilih
  const [selectedJadwal, setSelectedJadwal] = useState<{
    id: string;
    hari: string;
    kategori: string;
    harga: number;
    terdaftar: number;
  } | null>(null);

  // Fungsi menangani ketikan / pilihan user
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Jika yang diubah adalah jadwal, update info harga & peserta otomatis
    if (name === "jadwal_id") {
      const jadwal = JADWAL_PANITIA.find((j) => j.id === value);
      setSelectedJadwal(jadwal || null);
    }
  };

  // Fungsi saat tombol daftar diklik
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Siap dikirim via Axios:", formData);
    // Logika Axios akan kita taruh di sini
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-slate-900 tracking-tight uppercase">
        <Calendar className="text-[#ff4d4d]" size={32} strokeWidth={2.5} />
        MULAI BOOKING
      </h2>

      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
        {/* Input Nama Lengkap */}
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

        {/* Pilihan Jadwal Panitia */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Pilih Tanggal Lomba
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-4 top-3.5 text-slate-400"
              size={20}
            />
            <select
              name="jadwal_id"
              value={formData.jadwal_id}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all appearance-none font-medium text-slate-700 bg-slate-50 focus:bg-white cursor-pointer"
              required
            >
              <option value="" disabled>
                -- Pilih Jadwal Tersedia --
              </option>
              {JADWAL_PANITIA.map((jadwal) => (
                <option key={jadwal.id} value={jadwal.id}>
                  {jadwal.hari} - {jadwal.kategori}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tampil Dinamis: Harga dan Jumlah Peserta */}
        {selectedJadwal && (
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
              <label className="block text-xs font-bold text-red-500 uppercase mb-1">
                Biaya Pendaftaran
              </label>
              <div className="flex items-center gap-2 text-[#ff4d4d] font-black text-lg">
                <Wallet size={18} />
                Rp {selectedJadwal.harga.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                Peserta Terdaftar
              </label>
              <div className="flex items-center gap-2 text-slate-700 font-black text-lg">
                <Users size={18} />
                {selectedJadwal.terdaftar} Orang
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#ff4d4d] text-white font-black py-4 rounded-xl hover:bg-[#e64444] transition-all shadow-lg shadow-red-200 mt-6 flex items-center justify-center gap-2 hover:scale-[1.02]"
        >
          <CheckCircle2 size={22} strokeWidth={3} />
          LANJUTKAN PEMBAYARAN
        </button>

        {/* Note Lapak */}
        <p className="text-center text-xs text-slate-400 font-bold mt-4">
          * Nomor lapak akan diundi saat registrasi ulang di lokasi perlombaan.
        </p>
      </form>
    </div>
  );
}
