import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Users, Search, Calendar, Plus, Trophy, Ticket, X } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminDashboard() {
  // State untuk Data Lomba
  const [lombas, setLombas] = useState<any[]>([]);
  const [selectedLombaId, setSelectedLombaId] = useState<string>("");
  const [activeData, setActiveData] = useState<any>(null); // Menyimpan detail lomba yg dipilih

  // State untuk Form Buat Lomba
  const [showModal, setShowModal] = useState(false);
  const [newLomba, setNewLomba] = useState({
    nama_lomba: "",
    tanggal_lomba: "",
    harga_tiket: 150000,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  // 1. Fetch Daftar Lomba saat pertama kali buka
  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchLombas();
  }, []);

  // 2. Fetch Detail Lomba kalau Dropdown berubah
  useEffect(() => {
    if (selectedLombaId) {
      fetchLombaDetail(selectedLombaId);
    }
  }, [selectedLombaId]);

  const fetchLombas = async () => {
    try {
      const res = await axios.get("http://localhost/api/admin/lombas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLombas(res.data);
      if (res.data.length > 0) {
        setSelectedLombaId(res.data[0].id); // Otomatis pilih lomba terbaru
      } else {
        setIsLoading(false); // Berhenti loading kalau kosong
      }
    } catch (err) {
      console.error("Gagal load lomba", err);
    }
  };

  const fetchLombaDetail = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(`http://localhost/api/admin/lombas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveData(res.data);
    } catch (err) {
      console.error("Gagal load detail", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Fungsi Bikin Jadwal Lomba Baru
  const handleCreateLomba = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost/api/admin/lombas",
        newLomba,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      alert("Jadwal Lomba Berhasil Dibuat!");
      setShowModal(false);
      fetchLombas(); // Refresh dropdown
    } catch (err) {
      console.error("Gagal bikin lomba", err);
      alert("Gagal membuat jadwal lomba.");
    }
  };

  // Filter Search
  const filteredBookings =
    activeData?.bookings?.filter((b: any) =>
      b.nama_peserta.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const totalPending =
    activeData?.bookings?.filter((b: any) => b.status === "pending").length ||
    0;
  const totalVerified =
    activeData?.bookings?.filter((b: any) => b.status === "verified").length ||
    0;

  return (
    <AdminLayout>
      <main className="flex-grow p-8">
        {/* HEADER: DROPDOWN & TOMBOL BUAT */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex-grow">
            <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
              Pilih Sesi Lomba
            </label>
            <div className="relative w-full max-w-md">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ff4d4d]"
                size={20}
              />
              <select
                value={selectedLombaId}
                onChange={(e) => setSelectedLombaId(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-red-50 focus:border-[#ff4d4d] outline-none font-bold text-slate-700 appearance-none cursor-pointer"
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

          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
          >
            <Plus size={20} /> BUAT JADWAL BARU
          </button>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="text-center font-bold text-slate-500 py-10">
            Memuat data sesi...
          </div>
        ) : !activeData ? (
          <div className="text-center font-bold text-slate-500 py-10">
            Silakan buat jadwal lomba terlebih dahulu.
          </div>
        ) : (
          <>
            {/* STATS CARDS KHUSUS SESI INI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
                  Tiket Masuk
                </p>
                <h3 className="text-2xl font-black text-slate-900">
                  Rp {activeData.harga_tiket.toLocaleString("id-ID")}
                </h3>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
                  Sisa Slot
                </p>
                <h3 className="text-2xl font-black text-blue-600">
                  {activeData.kuota - (totalVerified + totalPending)} /{" "}
                  {activeData.kuota}
                </h3>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-yellow-400">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
                  Pending (Web)
                </p>
                <h3 className="text-2xl font-black text-yellow-600">
                  {totalPending} Orang
                </h3>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm border-l-4 border-l-green-400">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
                  Booking Valid
                </p>
                <h3 className="text-2xl font-black text-green-600">
                  {totalVerified} Orang
                </h3>
              </div>
            </div>

            {/* TABEL PENDAFTARAN WEB PRA-LOMBA */}
            <div className="mb-4 flex justify-between items-end">
              <div>
                <h2 className="text-xl font-black text-slate-900 uppercase">
                  Data Pendaftaran Web
                </h2>
                <p className="text-sm text-slate-500 font-medium">
                  Fase Pra-Lomba (Menunggu Konfirmasi WA)
                </p>
              </div>

              <div className="relative w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Cari pendaftar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#ff4d4d] font-bold text-sm"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest">
                      Nama Peserta
                    </th>
                    <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest">
                      Status
                    </th>
                    <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest text-right">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-10 text-center font-bold text-slate-400"
                      >
                        Belum ada pendaftar untuk sesi ini.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b: any) => (
                      <tr
                        key={b.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 font-bold text-slate-800">
                          {b.nama_peserta}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                              b.status === "verified"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {b.status === "pending" && (
                            <button className="bg-[#ff4d4d] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-600 transition-colors shadow-md shadow-red-500/20">
                              VERIFIKASI
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* MODAL BUAT JADWAL BARU */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>

              <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase flex items-center gap-2">
                <Trophy className="text-[#ff4d4d]" /> Jadwal Baru
              </h2>

              <form onSubmit={handleCreateLomba} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    NAMA LOMBA
                  </label>
                  <input
                    type="text"
                    required
                    value={newLomba.nama_lomba}
                    onChange={(e) =>
                      setNewLomba({ ...newLomba, nama_lomba: e.target.value })
                    }
                    className="w-full p-3 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                    placeholder="Misal: Lomba Minggu Eksekutif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    TANGGAL LOMBA
                  </label>
                  <input
                    type="date"
                    required
                    value={newLomba.tanggal_lomba}
                    onChange={(e) =>
                      setNewLomba({
                        ...newLomba,
                        tanggal_lomba: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    HARGA TIKET (RP)
                  </label>
                  <div className="relative">
                    <Ticket
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="number"
                      required
                      value={newLomba.harga_tiket}
                      onChange={(e) =>
                        setNewLomba({
                          ...newLomba,
                          harga_tiket: Number(e.target.value),
                        })
                      }
                      className="w-full pl-10 pr-3 p-3 border border-slate-200 rounded-xl font-bold focus:border-[#ff4d4d] outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl font-black mt-4 shadow-lg hover:shadow-xl transition-all"
                >
                  SIMPAN JADWAL
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
