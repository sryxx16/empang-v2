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
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminLombaPage() {
  const [lombas, setLombas] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newLomba, setNewLomba] = useState({
    nama_lomba: "",
    tanggal_lomba: "",
    harga_tiket: 150000,
    kuota: 34,
  });
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchLombas();
  }, []);

  const fetchLombas = async () => {
    try {
      const res = await axios.get("http://localhost/api/admin/lombas", {
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
      await axios.post("http://localhost/api/admin/lombas", newLomba, {
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
      await axios.delete(`http://localhost/api/admin/lombas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLombas();
    } catch (err) {
      alert("Gagal menghapus");
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
                <button
                  onClick={() => handleDelete(l.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase mb-1">
                {l.nama_lomba}
              </h3>
              <p className="text-slate-500 font-bold text-sm mb-4">
                {l.tanggal_lomba}
              </p>

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
                <input
                  type="date"
                  className="w-full p-4 bg-slate-50 border rounded-2xl font-bold outline-none focus:border-[#ff4d4d]"
                  onChange={(e) =>
                    setNewLomba({ ...newLomba, tanggal_lomba: e.target.value })
                  }
                  required
                />
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
