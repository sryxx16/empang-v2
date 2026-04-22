import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  CheckCircle,
  Zap,
  Calendar,
  UserPlus,
  Banknote,
  CreditCard,
  Trash2,
  Wallet,
  X, // <-- Icon X buat tutup modal
  Edit2, // <-- ICON BARU
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminRekapHybridPage() {
  const [lombas, setLombas] = useState<any[]>([]);
  const [selectedLombaId, setSelectedLombaId] = useState<string>("");
  const [rekaps, setRekaps] = useState<any[]>([]);
  const [onlineBookings, setOnlineBookings] = useState<any[]>([]);

  // State untuk Kasir Kilat
  const [quickName, setQuickName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // State untuk Modal Hutang
  const [isDebtModalOpen, setIsDebtModalOpen] = useState(false);
  const [debtData, setDebtData] = useState<any>(null);
  const [partialAmount, setPartialAmount] = useState("");

  // State untuk Modal Edit Hutang
  const [isEditDebtModalOpen, setIsEditDebtModalOpen] = useState(false);
  const [editDebtData, setEditDebtData] = useState<any>(null);
  const [editNominal, setEditNominal] = useState("");
  const [editMetodeBayar, setEditMetodeBayar] = useState("tunai");
  const [editStatusBayar, setEditStatusBayar] = useState("debt");

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
      const res = await axios.get("/api/admin/lombas", {
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
        `/api/admin/lombas/${selectedLombaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

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
        `/api/admin/rekaps/${selectedLombaId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setRekaps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // --- FUNGSI CHECK-IN LUNAS ---
  const handleQuickAdd = async (metode: string) => {
    if (!quickName.trim()) {
      inputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "/api/admin/rekaps",
        {
          lomba_id: selectedLombaId,
          nama_peserta: quickName,
          metode_bayar: metode,
          status_bayar: "lunas",
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

  const handleCheckInOnline = async (booking: any, metode: string) => {
    setIsSubmitting(true);
    try {
      await axios.post(
        "/api/admin/rekaps",
        {
          lomba_id: selectedLombaId,
          nama_peserta: booking.nama_peserta,
          metode_bayar: metode,
          status_bayar: "lunas",
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

  // --- FUNGSI HUTANG ---
  const openHutangModal = (tipe: "online" | "walkin", data?: any) => {
    if (tipe === "walkin" && !quickName.trim()) {
      inputRef.current?.focus();
      return;
    }
    setDebtData({
      tipe,
      nama_peserta: tipe === "online" ? data.nama_peserta : quickName,
      bookingId: tipe === "online" ? data.id : null,
    });
    setIsDebtModalOpen(true);
  };

  const submitHutang = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(
        "/api/admin/rekaps",
        {
          lomba_id: selectedLombaId,
          nama_peserta: debtData.nama_peserta,
          metode_bayar: "tunai",
          status_bayar: "debt",
          nominal_bayar: Number(partialAmount), // Uang yang beneran masuk sekarang
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (debtData.tipe === "online") {
        setOnlineBookings(
          onlineBookings.filter((b) => b.id !== debtData.bookingId),
        );
      } else {
        setQuickName("");
        inputRef.current?.focus();
      }

      setIsDebtModalOpen(false);
      setPartialAmount("");
      fetchRekaps();
    } catch (err) {
      console.error(err);
      alert("Gagal mencatat hutang");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FUNGSI EDIT REKAP (KHUSUS HUTANG) ---
  const openEditDebtModal = (rekap: any) => {
    setEditDebtData(rekap);
    setEditNominal(rekap.nominal_bayar !== null ? rekap.nominal_bayar.toString() : "0");
    setEditMetodeBayar(rekap.metode_bayar);
    setEditStatusBayar(rekap.status_bayar);
    setIsEditDebtModalOpen(true);
  };

  const submitEditDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(
        `/api/admin/rekaps/${editDebtData.id}`,
        {
          nominal_bayar: Number(editNominal),
          metode_bayar: editMetodeBayar,
          status_bayar: editStatusBayar,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditDebtModalOpen(false);
      fetchRekaps();
    } catch (err) {
      console.error(err);
      alert("Gagal mengupdate data");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- FUNGSI HAPUS REKAP ---
  const handleDeleteRekap = async (id: number) => {
    if (
      !window.confirm(
        "Hapus data rekap ini? (Jika online, akan kembali ke antrean)",
      )
    )
      return;

    try {
      await axios.delete(`/api/admin/rekaps/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchRekaps();
      fetchOnlineBookings(); // Tarik lagi antrean web biar yang dihapus balik lagi
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus data");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleQuickAdd("tunai");
    }
  };

  // PERHITUNGAN PENDAPATAN REAL (Memperhitungkan Hutang)
  const activeLomba = lombas.find((l) => l.id.toString() === selectedLombaId);
  const totalPendapatan = rekaps.reduce((sum, r) => {
    // Kalau ada nominal bayar (misal dari hutang), pakai itu. Kalau nggak, pakai harga tiket full.
    const bayar =
      r.nominal_bayar !== undefined && r.nominal_bayar !== null
        ? Number(r.nominal_bayar)
        : activeLomba?.harga_tiket || 0;
    return sum + bayar;
  }, 0);

  return (
    <AdminLayout>
      <main className="flex-grow p-8 relative">
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
            <h2 className="text-lg font-black mb-4 uppercase text-blue-700 flex items-center gap-2 sticky top-0 bg-white pb-2 border-b z-10">
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
                      className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex flex-col gap-3"
                    >
                      <span className="font-bold text-slate-800">
                        {b.nama_peserta}
                      </span>
                      <div className="flex gap-2 w-full">
                        <button
                          disabled={isSubmitting}
                          onClick={() => handleCheckInOnline(b, "tunai")}
                          className="flex-1 bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-[11px] font-black px-2 py-2 rounded-lg transition-colors"
                        >
                          CASH
                        </button>
                        <button
                          disabled={isSubmitting}
                          onClick={() => handleCheckInOnline(b, "transfer")}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white text-[11px] font-black px-2 py-2 rounded-lg transition-colors"
                        >
                          TF
                        </button>
                        <button
                          disabled={isSubmitting}
                          onClick={() => openHutangModal("online", b)}
                          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-[11px] font-black px-2 py-2 rounded-lg transition-colors"
                        >
                          HUTANG
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* KOLOM 2: INPUT WALK-IN (KASIR KILAT) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit lg:sticky lg:top-8">
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
            <div className="grid grid-cols-3 gap-2">
              <button
                disabled={isSubmitting || !quickName}
                onClick={() => handleQuickAdd("tunai")}
                className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white p-3 rounded-xl font-black text-[11px] flex flex-col justify-center items-center gap-1 shadow-md"
              >
                <Banknote size={16} /> LUNAS CASH
              </button>
              <button
                disabled={isSubmitting || !quickName}
                onClick={() => handleQuickAdd("transfer")}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white p-3 rounded-xl font-black text-[11px] flex flex-col justify-center items-center gap-1 shadow-md"
              >
                <CreditCard size={16} /> LUNAS TF
              </button>
              <button
                disabled={isSubmitting || !quickName}
                onClick={() => openHutangModal("walkin")}
                className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white p-3 rounded-xl font-black text-[11px] flex flex-col justify-center items-center gap-1 shadow-md"
              >
                <Wallet size={16} /> HUTANG/DP
              </button>
            </div>
            <p className="text-[10px] text-center font-bold text-slate-400 mt-4 uppercase tracking-widest">
              Tekan Enter untuk Lunas Cash
            </p>
          </div>

          {/* KOLOM 3: REKAP FINAL (LUNAS & HUTANG) */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 h-fit max-h-[600px] overflow-y-auto">
            <h2 className="text-lg font-black mb-4 uppercase text-green-700 border-b pb-4 flex items-center justify-between sticky top-0 bg-white z-10">
              <span className="flex items-center gap-2">
                <CheckCircle size={20} /> Rekap Sesi Ini
              </span>
              <span className="bg-green-100 text-green-700 text-sm font-black px-3 py-1 rounded-full">
                {rekaps.length}
              </span>
            </h2>
            <ul className="space-y-2 mt-2">
              {rekaps.length === 0 ? (
                <p className="text-xs font-bold text-slate-400 text-center py-10 italic">
                  Belum ada rekap peserta.
                </p>
              ) : (
                rekaps.map((r: any) => {
                  const isDebt = r.status_bayar === "debt";
                  const hargaTiket = activeLomba?.harga_tiket || 0;
                  const bayarNominal =
                    r.nominal_bayar !== undefined
                      ? r.nominal_bayar
                      : hargaTiket;
                  const kurang = hargaTiket - bayarNominal;

                  return (
                    <li
                      key={r.id}
                      className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors group"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">
                          {r.nama_peserta}
                        </span>
                        {/* Menampilkan status metode bayar atau status hutang */}
                        <div className="flex gap-2 items-center mt-1">
                          <span
                            className={`text-[9px] font-black uppercase px-2 py-0.5 rounded w-fit ${
                              isDebt
                                ? "bg-orange-100 text-orange-700"
                                : r.metode_bayar === "tunai"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {isDebt ? "HUTANG" : r.metode_bayar}
                          </span>

                          {/* Label Khusus kalau Hutang */}
                          {isDebt && kurang > 0 && (
                            <span className="text-[10px] font-bold text-red-500">
                              Kurang: Rp {kurang.toLocaleString("id-ID")}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {/* Tombol Edit Khusus Hutang */}
                        {isDebt && (
                          <button
                            onClick={() => openEditDebtModal(r)}
                            className="text-slate-300 hover:text-blue-500 transition-colors p-2 rounded-lg hover:bg-blue-50"
                            title="Edit / Pelunasan Hutang"
                          >
                            <Edit2 size={16} />
                          </button>
                        )}
                        {/* Tombol Hapus */}
                        <button
                          onClick={() => handleDeleteRekap(r.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-50"
                          title="Hapus jika salah ketik/ganda"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>

        {/* ========================================= */}
        {/* MODAL POP-UP HUTANG                       */}
        {/* ========================================= */}
        {isDebtModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative">
              <button
                onClick={() => setIsDebtModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-black mb-1 uppercase flex items-center gap-2 text-orange-500">
                <Wallet /> Input DP / Hutang
              </h2>
              <p className="text-sm font-bold text-slate-500 mb-6">
                Peserta:{" "}
                <span className="text-slate-900">{debtData?.nama_peserta}</span>
              </p>

              <form onSubmit={submitHutang} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Uang Tunai Yang Diterima (Rp)
                  </label>
                  <input
                    type="number"
                    autoFocus
                    required
                    value={partialAmount}
                    onChange={(e) => setPartialAmount(e.target.value)}
                    placeholder="Contoh: 50000"
                    className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold outline-none focus:border-orange-500 text-xl"
                  />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                    Harga Tiket Full: Rp{" "}
                    {(activeLomba?.harga_tiket || 0).toLocaleString("id-ID")}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !partialAmount}
                  className="w-full bg-orange-500 text-white p-4 rounded-2xl font-black shadow-lg hover:bg-orange-600 transition-colors disabled:opacity-50 mt-4"
                >
                  SIMPAN DATA HUTANG
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* MODAL POP-UP EDIT HUTANG                  */}
        {/* ========================================= */}
        {isEditDebtModalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl relative">
              <button
                onClick={() => setIsEditDebtModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-black mb-1 uppercase flex items-center gap-2 text-blue-500">
                <Edit2 /> Edit Pembayaran
              </h2>
              <p className="text-sm font-bold text-slate-500 mb-6">
                Peserta:{" "}
                <span className="text-slate-900">{editDebtData?.nama_peserta}</span>
              </p>

              <form onSubmit={submitEditDebt} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Total Uang Masuk Saat Ini (Rp)
                  </label>
                  <input
                    type="number"
                    required
                    value={editNominal}
                    onChange={(e) => setEditNominal(e.target.value)}
                    className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold outline-none focus:border-blue-500 text-xl"
                  />
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                    Harga Tiket Full: Rp {(activeLomba?.harga_tiket || 0).toLocaleString("id-ID")}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Metode Bayar
                  </label>
                  <select
                    value={editMetodeBayar}
                    onChange={(e) => setEditMetodeBayar(e.target.value)}
                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold outline-none focus:border-blue-500"
                  >
                    <option value="tunai">Tunai</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                    Status Bayar
                  </label>
                  <select
                    value={editStatusBayar}
                    onChange={(e) => setEditStatusBayar(e.target.value)}
                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-2xl font-bold outline-none focus:border-blue-500"
                  >
                    <option value="debt">Masih Hutang / DP</option>
                    <option value="lunas">Udah Lunas</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !editNominal}
                  className="w-full bg-blue-500 text-white p-4 rounded-2xl font-black shadow-lg hover:bg-blue-600 transition-colors disabled:opacity-50 mt-4 uppercase"
                >
                  Simpan Perubahan
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
