import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Trophy,
  Plus,
  Calendar,
  Ticket,
  Trash2,
  Edit3,
  Users,
  PowerOff,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminLombaPage() {
  const [lombas, setLombas] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newLomba, setNewLomba] = useState({
    nama_lomba: "",
    tanggal_lomba: "",
    jam_lomba: "",
    harga_tiket: 150000,
    kuota: 34,
  });
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchLombas();
  }, []);

  const fetchLombas = async () => {
    try {
      const res = await axios.get("/api/admin/lombas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLombas(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateLomba = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/admin/lombas", newLomba, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      fetchLombas();
      alert("Jadwal Berhasil Dibuat!");
    } catch (err) {
      alert("Gagal membuat jadwal");
    }
  };

  const handleDelete = async (id: number) => {
    if (
      !window.confirm(
        "Hapus jadwal ini? Semua data booking di dalamnya akan ikut hilang!",
      )
    )
      return;
    try {
      await axios.delete(`/api/admin/lombas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLombas();
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    if (
      !window.confirm(
        currentStatus
          ? "Tutup pendaftaran untuk sesi ini? (Sesi ini akan hilang dari halaman form booking)"
          : "Buka kembali pendaftaran untuk sesi ini? (Sesi ini akan muncul lagi di halaman form booking)"
      )
    )
      return;
      
    try {
      await axios.patch(
        `/api/admin/lombas/${id}/toggle-status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLombas();
    } catch (err) {
      alert("Gagal merubah status lomba");
    }
  };

  return (
    <AdminLayout>
      <main className="flex-grow p-8 bg-slate-50 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              Kelola Jadwal Lomba
            </h1>
            <p className="text-slate-500 font-medium">
              Atur sesi mancing dan kuota lapak di sini.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#ff4d4d] transition-all shadow-lg"
          >
            <Plus size={20} /> BUAT JADWAL BARU
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lombas.map((l) => (
            <div
              key={l.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-red-50 p-3 rounded-2xl text-[#ff4d4d]">
                  <Calendar size={24} />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleToggleStatus(l.id, l.is_active)}
                    title={l.is_active ? "Tutup Pendaftaran" : "Buka Pendaftaran"}
                    className={`${
                      l.is_active
                        ? "text-slate-400 hover:text-orange-500"
                        : "text-green-500 hover:text-green-600"
                    } transition-colors`}
                  >
                    <PowerOff size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(l.id)}
                    title="Hapus Lomba"
                    className="text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-black text-slate-800 uppercase">
                  {l.nama_lomba}
                </h3>
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest ${
                    l.is_active
                      ? "bg-green-100 text-green-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {l.is_active ? "BUKA" : "TUTUP"}
                </span>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <p className="text-slate-500 font-bold text-sm">
                  {l.tanggal_lomba}
                </p>
                {l.jam_lomba && (
                  <p className="text-blue-500 font-bold text-xs uppercase tracking-widest bg-blue-50 w-max px-2 py-1 rounded-md">
                    {l.jam_lomba}
                  </p>
                )}
              </div>

              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">
                    Tiket
                  </span>
                  <span className="text-slate-700">
                    Rp {l.harga_tiket.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-slate-400 uppercase tracking-widest text-[10px]">
                    Kuota
                  </span>
                  <span className="text-slate-700">{l.kuota} Lapak</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL BUAT JADWAL (Sama seperti sebelumnya tapi lebih rapi) */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
              <h2 className="text-2xl font-black mb-6 uppercase flex items-center gap-2">
                <Trophy className="text-[#ff4d4d]" /> Sesi Baru
              </h2>
              <form onSubmit={handleCreateLomba} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Lomba"
                  className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:border-[#ff4d4d]"
                  onChange={(e) =>
                    setNewLomba({ ...newLomba, nama_lomba: e.target.value })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:border-[#ff4d4d]"
                    onChange={(e) =>
                      setNewLomba({ ...newLomba, tanggal_lomba: e.target.value })
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Jam Lomba (contoh: 08:00 - 15:00)"
                    className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:border-[#ff4d4d]"
                    onChange={(e) =>
                      setNewLomba({ ...newLomba, jam_lomba: e.target.value })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    placeholder="Harga"
                    className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:border-[#ff4d4d]"
                    onChange={(e) =>
                      setNewLomba({
                        ...newLomba,
                        harga_tiket: Number(e.target.value),
                      })
                    }
                    required
                  />
                  <input
                    type="number"
                    placeholder="Kuota"
                    className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:border-[#ff4d4d]"
                    onChange={(e) =>
                      setNewLomba({
                        ...newLomba,
                        kuota: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-100 text-slate-500 p-4 rounded-2xl font-black"
                  >
                    BATAL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-slate-900 text-white p-4 rounded-2xl font-black shadow-lg"
                  >
                    SIMPAN
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
}
