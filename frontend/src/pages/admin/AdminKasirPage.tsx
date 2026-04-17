import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  CheckCircle,
  Zap,
  Calendar,
  UserPlus,
  Banknote,
  CreditCard,
  Trash2, // <-- Icon hapus ditambahkan
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminKasirPage() {
  const [lombas, setLombas] = useState<any[]>([]);
  const [selectedLombaId, setSelectedLombaId] = useState<string>("");
  const [rekaps, setRekaps] = useState<any[]>([]);
  const [onlineBookings, setOnlineBookings] = useState<any[]>([]);

  // State untuk Kasir Kilat
  const [quickName, setQuickName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchLombas();
  }, []);

  useEffect(() => {
    if (selectedLombaId) {
      fetchRekaps();
      fetchOnlineBookings();
    }
  }, [selectedLombaId]);

  const fetchLombas = async () => {
    try {
      const res = await axios.get("http://localhost/api/admin/lombas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLombas(res.data);
      if (res.data.length > 0) setSelectedLombaId(res.data[0].id);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOnlineBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost/api/admin/lombas/${selectedLombaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // REVISI: Tarik SEMUA data booking web (termasuk yang 'pending') biar siap lu eksekusi di rekap akhir!
      const allBookings =
        res.data.bookings?.filter((b: any) => b.status !== "cancelled") || [];

      setOnlineBookings(allBookings);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRekaps = async () => {
    try {
      const res = await axios.get(
        `http://localhost/api/admin/rekaps/${selectedLombaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRekaps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickAdd = async (metode: string) => {
    if (!quickName.trim()) {
      inputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost/api/admin/rekaps",
        {
          lomba_id: selectedLombaId,
          nama_peserta: quickName,
          metode_bayar: metode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setQuickName("");
      fetchRekaps();
      inputRef.current?.focus();
    } catch (err) {
      console.error(err);
      alert("Gagal mencatat pembayaran");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuickAdd("tunai");
    }
  };

  const handleCheckInOnline = async (booking: any, metode: string) => {
    setIsSubmitting(true);
    try {
      await axios.post(
        "http://localhost/api/admin/rekaps",
        {
          lomba_id: selectedLombaId,
          nama_peserta: booking.nama_peserta,
          metode_bayar: metode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setOnlineBookings(onlineBookings.filter((b) => b.id !== booking.id));
      fetchRekaps();
    } catch (err) {
      console.error(err);
      alert("Gagal memproses check-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fungsi baru untuk Hapus Data Lunas (Mencegah double entry)
  const handleDeleteRekap = async (id: number) => {
    if (!window.confirm("Hapus data lunas ini?")) return;

    try {
      await axios.delete(`http://localhost/api/admin/rekaps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRekaps(); // Segarkan daftar setelah dihapus
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  const activeLomba = lombas.find((l) => l.id.toString() === selectedLombaId);
  const totalPendapatan = rekaps.length * (activeLomba?.harga_tiket || 0);

  return (
    <AdminLayout>
      <main className="flex-grow p-8">
        {/* HEADER & PENDAPATAN */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3 uppercase">
              <Zap className="text-[#ff4d4d]" size={32} /> Hybrid Check-in
            </h1>
            <p className="text-slate-500 font-medium mt-2">
              Kelola antrean online dan pendaftar langsung dalam satu layar.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 px-6 py-3 rounded-2xl text-right w-full md:w-auto">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">
              Pendapatan Sesi Ini
            </p>
            <p className="text-2xl font-black text-green-700">
              Rp {totalPendapatan.toLocaleString("id-ID")}
            </p>
          </div>
        </header>

        {/* DROPDOWN PILIH SESI TANGGAL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm mb-8">
          <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
            Pilih Sesi / Tanggal Lomba
          </label>
          <div className="relative w-full max-w-md">
            <Calendar
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff4d4d]"
              size={20}
            />
            <select
              value={selectedLombaId}
              onChange={(e) => setSelectedLombaId(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-red-100"
            >
              {lombas.length === 0 && (
                <option value="">Belum ada jadwal lomba</option>
              )}
              {lombas.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.tanggal_lomba} — {l.nama_lomba}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KOLOM 1: ANTREAN ONLINE (DARI WEB) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit max-h-[600px] overflow-y-auto">
            <h2 className="text-lg font-black mb-4 uppercase text-blue-700 flex items-center gap-2 sticky top-0 bg-white pb-2 border-b">
              <UserPlus size={20} /> Antrean Web Sesi Ini
            </h2>
            <div className="space-y-3">
              {onlineBookings.filter(
                (b) => !rekaps.some((r) => r.nama_peserta === b.nama_peserta),
              ).length === 0 ? (
                <p className="text-xs font-bold text-slate-400 text-center py-10 italic">
                  Antrean online kosong.
                </p>
              ) : (
                onlineBookings
                  .filter(
                    (b) =>
                      !rekaps.some((r) => r.nama_peserta === b.nama_peserta),
                  )
                  .map((b) => (
                    <div
                      key={b.id}
                      className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex flex-col xl:flex-row justify-between xl:items-center gap-3"
                    >
                      <span className="font-bold text-slate-800">
                        {b.nama_peserta}
                      </span>
                      <div className="flex gap-2">
                        <button
                          disabled={isSubmitting}
                          onClick={() => handleCheckInOnline(b, "tunai")}
                          className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-[11px] font-black px-3 py-2 rounded-lg transition-colors"
                        >
                          CASH
                        </button>
                        <button
                          disabled={isSubmitting}
                          onClick={() => handleCheckInOnline(b, "transfer")}
                          className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-[11px] font-black px-3 py-2 rounded-lg transition-colors"
                        >
                          TF
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* KOLOM 2: INPUT WALK-IN (KASIR KILAT) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit sticky top-8">
            <h2 className="text-lg font-black mb-4 uppercase text-slate-800 flex items-center gap-2 border-b pb-2">
              <Zap size={20} className="text-[#ff4d4d]" /> Pendaftar Langsung
            </h2>
            <input
              ref={inputRef}
              type="text"
              value={quickName}
              onChange={(e) => setQuickName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik nama di sini..."
              className="w-full p-4 border-2 border-slate-200 rounded-2xl font-bold focus:border-[#ff4d4d] outline-none mb-4 bg-slate-50 text-lg text-center"
            />
            <div className="grid grid-cols-2 gap-3">
              <button
                disabled={isSubmitting || !quickName}
                onClick={() => handleQuickAdd("tunai")}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-4 rounded-xl font-black text-sm flex justify-center items-center gap-2 shadow-md"
              >
                <Banknote size={18} /> CASH
              </button>
              <button
                disabled={isSubmitting || !quickName}
                onClick={() => handleQuickAdd("transfer")}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-4 rounded-xl font-black text-sm flex justify-center items-center gap-2 shadow-md"
              >
                <CreditCard size={18} /> TF
              </button>
            </div>
            <p className="text-[10px] text-center font-bold text-slate-400 mt-4 uppercase tracking-widest">
              Tekan Enter untuk Lunas Cash
            </p>
          </div>

          {/* KOLOM 3: REKAP FINAL (LUNAS) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit max-h-[600px] overflow-y-auto">
            <h2 className="text-lg font-black mb-4 uppercase text-green-700 border-b pb-4 flex items-center justify-between sticky top-0 bg-white">
              <span className="flex items-center gap-2">
                <CheckCircle size={20} /> Lunas Sesi Ini
              </span>
              <span className="bg-green-100 text-green-700 text-sm font-black px-3 py-1 rounded-full">
                {rekaps.length}
              </span>
            </h2>
            <ul className="space-y-2 mt-2">
              {rekaps.length === 0 ? (
                <p className="text-xs font-bold text-slate-400 text-center py-10 italic">
                  Belum ada peserta lunas.
                </p>
              ) : (
                rekaps.map((r: any) => (
                  <li
                    key={r.id}
                    className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">
                        {r.nama_peserta}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded w-fit mt-1 ${r.metode_bayar === "tunai" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}
                      >
                        {r.metode_bayar}
                      </span>
                    </div>
                    {/* Tombol Hapus */}
                    <button
                      onClick={() => handleDeleteRekap(r.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                      title="Hapus jika salah ketik/ganda"
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
