import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <--- TAMBAHIN INI
import {
  Ticket,
  User,
  Phone,
  CheckCircle,
  Send,
  AlertCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default function BookingPage() {
  const [data, setData] = useState({
    settings: null as any,
    lombas: [] as any[],
  });
  const [isLoading, setIsLoading] = useState(true);

  // State Form
  const [formData, setFormData] = useState({
    lomba_id: "",
    nama_peserta: "",
    no_wa: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State Hasil Sukses
  const [bookingResult, setBookingResult] = useState<{
    kode: string;
    lomba: any;
  } | null>(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const res = await axios.get("http://localhost/api/public/home");
      setData(res.data);
      // Otomatis pilih lomba pertama yang sisa slotnya > 0
      const availableLomba = res.data.lombas.find((l: any) => l.sisa > 0);
      if (availableLomba) {
        setFormData((prev) => ({
          ...prev,
          lomba_id: availableLomba.id.toString(),
        }));
      }
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.lomba_id) return alert("Pilih jadwal lomba dulu!");

    setIsSubmitting(true);
    try {
      const res = await axios.post(
        "http://localhost/api/public/booking",
        formData,
      );
      const bookedLomba = data.lombas.find(
        (l) => l.id.toString() === formData.lomba_id,
      );

      setBookingResult({
        kode: res.data.kode_booking,
        lomba: bookedLomba,
      });
    } catch (err) {
      console.error(err);
      alert("Gagal melakukan pendaftaran. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi buat Generate Link WhatsApp
  const handleWhatsApp = () => {
    if (!data.settings || !bookingResult) return;
    const adminWA = data.settings.nomor_wa;
    const text = `Halo Admin ${data.settings.nama_pemancingan}, saya mau konfirmasi pendaftaran lomba.\n\nNama: *${formData.nama_peserta}*\nJadwal: *${bookingResult.lomba.nama_lomba} (${bookingResult.lomba.tanggal_lomba})*\nKode Booking: *${bookingResult.kode}*\n\nMohon diverifikasi ya Bang.`;

    window.open(
      `https://wa.me/${adminWA}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="font-bold text-slate-500 animate-pulse">
          Memuat data empang...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* HEADER PUBLIC */}

      <div className="bg-slate-900 text-white pt-8 pb-24 px-6 text-center relative">
        {/* TOMBOL BACK KE HOME */}
        <Link
          to="/"
          className="absolute top-6 left-4 md:left-10 flex items-center gap-2 text-slate-400 hover:text-[#ff4d4d] font-bold transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-full"
        >
          <ArrowLeft size={20} />{" "}
          <span className="hidden md:inline">Kembali</span>
        </Link>

        {/* Tambahin margin-top (mt-8) biar judulnya gak nabrak tombol */}
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase text-[#ff4d4d] mt-8 md:mt-4">
          {data.settings?.nama_pemancingan || "Pemancingan"}
        </h1>
        <p className="text-slate-400 font-medium max-w-xl mx-auto">
          Segera amankan lapak Anda sebelum kehabisan! Sistem pendaftaran
          terintegrasi langsung dengan admin.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-10">
        {/* JIKA SUKSES DAFTAR */}
        {bookingResult ? (
          <div className="bg-white rounded-3xl p-8 shadow-xl border-t-8 border-green-500 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-500" size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-2 uppercase">
              Booking Berhasil!
            </h2>
            <p className="text-slate-500 mb-6">
              Satu langkah lagi lapak resmi jadi milik Anda.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mb-8 inline-block w-full max-w-sm">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                KODE BOOKING ANDA
              </p>
              <p className="text-4xl font-black text-slate-900 tracking-wider">
                {bookingResult.kode}
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-yellow-800 text-sm font-bold flex items-start gap-3 text-left mb-8">
              <AlertCircle className="shrink-0 mt-0.5" size={20} />
              <p>
                PENTING: Booking Anda otomatis hangus jika tidak menekan tombol
                konfirmasi WhatsApp di bawah ini!
              </p>
            </div>

            <button
              onClick={handleWhatsApp}
              className="w-full md:w-auto bg-[#25D366] hover:bg-[#1ebe57] text-white px-8 py-4 rounded-2xl font-black flex justify-center items-center gap-3 transition-all shadow-lg hover:shadow-green-500/30 mx-auto"
            >
              <Send size={24} /> KONFIRMASI VIA WHATSAPP SEKARANG
            </button>
          </div>
        ) : (
          /* FORM & SLOT TRACKER */
          <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2 border-b pb-4">
              <Ticket className="text-[#ff4d4d]" /> Formulir Pendaftaran
            </h2>

            {/* LIVE SLOT TRACKER */}
            <div className="mb-8 space-y-4">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">
                Ketersediaan Sesi (Live)
              </label>
              {data.lombas.length === 0 ? (
                <div className="bg-slate-50 p-6 rounded-2xl text-center border border-slate-200">
                  <p className="font-bold text-slate-500">
                    Belum ada jadwal lomba yang tersedia.
                  </p>
                </div>
              ) : (
                data.lombas.map((l: any) => {
                  const percent = (l.terisi / l.kuota) * 100;
                  const isFull = l.sisa === 0;
                  const isSelected = formData.lomba_id === l.id.toString();

                  return (
                    <div
                      key={l.id}
                      onClick={() =>
                        !isFull &&
                        setFormData({ ...formData, lomba_id: l.id.toString() })
                      }
                      className={`relative overflow-hidden border-2 p-4 rounded-2xl transition-all cursor-pointer ${
                        isFull
                          ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                          : isSelected
                            ? "border-[#ff4d4d] bg-red-50 shadow-md"
                            : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h3
                            className={`font-black ${isSelected ? "text-red-700" : "text-slate-800"}`}
                          >
                            {l.nama_lomba}
                          </h3>
                          <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-1">
                            <Clock size={12} /> {l.tanggal_lomba} • Rp{" "}
                            {(l.harga_tiket || 0).toLocaleString("id-ID")}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black ${isFull ? "bg-slate-200 text-slate-500" : "bg-green-100 text-green-700"}`}
                          >
                            {isFull ? "PENUH" : `SISA ${l.sisa} LAPAK`}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${percent > 80 ? "bg-red-500" : "bg-green-500"} transition-all duration-1000`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* FORM INPUT */}
            {data.lombas.length > 0 && data.lombas.some((l) => l.sisa > 0) && (
              <form onSubmit={handleSumbit} className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                    Nama Panggilan / Komunitas
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="text"
                      required
                      value={formData.nama_peserta}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nama_peserta: e.target.value,
                        })
                      }
                      placeholder="Misal: Udin / Tim Joran Melengkung"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-[#ff4d4d] focus:bg-white outline-none font-bold text-slate-800 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                    Nomor WhatsApp Aktif
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="number"
                      required
                      value={formData.no_wa}
                      onChange={(e) =>
                        setFormData({ ...formData, no_wa: e.target.value })
                      }
                      placeholder="Misal: 08123456789"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-[#ff4d4d] focus:bg-white outline-none font-bold text-slate-800 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.lomba_id}
                  className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-4 rounded-2xl font-black text-lg uppercase tracking-wider shadow-xl transition-all active:scale-95 flex justify-center items-center"
                >
                  {isSubmitting ? "Memproses..." : "Booking Lapak Sekarang"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
