import React, { useState } from "react";
import axios from "axios";
import {
  Calendar,
  User,
  CheckCircle2,
  Users,
  Wallet,
  Loader2,
} from "lucide-react";

// Kita tambahkan kolom 'tanggal_db' agar formatnya sesuai dengan tipe 'date' di database Laravel (YYYY-MM-DD)
const JADWAL_PANITIA = [
  {
    id: "1",
    hari: "Minggu, 19 April 2026",
    tanggal_db: "2026-04-19",
    kategori: "Lomba Mingguan",
    harga: 150000,
    terdaftar: 12,
  },
  {
    id: "2",
    hari: "Sabtu, 25 April 2026",
    tanggal_db: "2026-04-25",
    kategori: "Galatama Spesial",
    harga: 250000,
    terdaftar: 8,
  },
  {
    id: "3",
    hari: "Minggu, 26 April 2026",
    tanggal_db: "2026-04-26",
    kategori: "Lomba Mingguan",
    harga: 150000,
    terdaftar: 5,
  },
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    nama_peserta: "",
    jadwal_id: "",
  });

  const [selectedJadwal, setSelectedJadwal] = useState<any>(null);

  // State baru untuk mengatur loading dan pesan sukses/error
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "jadwal_id") {
      const jadwal = JADWAL_PANITIA.find((j) => j.id === value);
      setSelectedJadwal(jadwal || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Merakit paket data agar sesuai dengan permintaan Controller Laravel kita sebelumnya
    const payload = {
      nama_peserta: formData.nama_peserta,
      tanggal_lomba: selectedJadwal.tanggal_db,
      nomor_lapak: "Diundi di lokasi", // Karena diundi, kita kirim teks ini ke database
    };

    try {
      // Mengirim data ke API Laravel (Pastikan port Laravel kamu benar, biasanya 8000 atau lewat Sail)
      const response = await axios.post(
        "/api/bookings",
        payload,
      );

      // Jika berhasil
      setMessage({
        type: "success",
        text: response.data.message || "Booking berhasil disimpan!",
      });

      // Kosongkan form setelah sukses
      setFormData({ nama_peserta: "", jadwal_id: "" });
      setSelectedJadwal(null);
    } catch (error: any) {
      // Jika gagal (misal server mati atau validasi salah)
      console.error("Error Detail:", error);
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Terjadi kesalahan saat menghubungi server.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 relative overflow-hidden">
      <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-slate-900 tracking-tight uppercase">
        <Calendar className="text-[#ff4d4d]" size={32} strokeWidth={2.5} />
        MULAI BOOKING
      </h2>

      {/* Menampilkan Notifikasi Sukses / Error */}
      {message.text && (
        <div
          className={`p-4 mb-6 rounded-xl font-bold text-sm ${message.type === "success" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}
        >
          {message.text}
        </div>
      )}

      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
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

        {/* Tombol Loading State */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-white font-black py-4 rounded-xl transition-all shadow-lg mt-6 flex items-center justify-center gap-2 
            ${isLoading ? "bg-slate-400 cursor-not-allowed" : "bg-[#ff4d4d] hover:bg-[#e64444] shadow-red-200 hover:scale-[1.02]"}`}
        >
          {isLoading ? (
            <>
              <Loader2 size={22} className="animate-spin" />
              MEMPROSES DATA...
            </>
          ) : (
            <>
              <CheckCircle2 size={22} strokeWidth={3} />
              LANJUTKAN PEMBAYARAN
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400 font-bold mt-4">
          * Nomor lapak akan diundi saat registrasi ulang di lokasi perlombaan.
        </p>
      </form>
    </div>
  );
}
