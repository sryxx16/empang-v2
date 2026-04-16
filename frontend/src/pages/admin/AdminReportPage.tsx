import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  FileText,
  Printer,
  Wallet,
  Users,
  CheckCircle,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminReportPage() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const response = await axios.get("http://localhost/api/admin/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (err) {
      console.error("Gagal mengambil laporan", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate("/admin/login");
  };

  const handlePrint = () => {
    window.print(); // Memanggil fitur cetak bawaan browser
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-xl">
        Memuat Laporan...
      </div>
    );

  return (
    <AdminLayout>
      {/* Sidebar - Disembunyikan saat di-print (print:hidden) */}

      {/* Main Content */}
      <main className="flex-grow p-8 bg-white print:p-0 print:m-0">
        <header className="flex justify-between items-center mb-8 print:hidden">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Laporan & Rekap
            </h1>
            <p className="text-slate-500 font-medium">
              Rekapitulasi pendapatan dan peserta valid.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg"
          >
            <Printer size={20} /> CETAK LAPORAN
          </button>
        </header>

        {/* Kop Surat Khusus Print (Hanya muncul saat dicetak) */}
        <div className="hidden print:block text-center mb-8 border-b-2 border-black pb-4">
          <h1 className="text-3xl font-black uppercase">
            LAPORAN PEMANCINGAN COMBRO
          </h1>
          <p className="text-lg">Rekapitulasi Peserta & Pendapatan Tiket</p>
        </div>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-50 border border-green-200 p-6 rounded-2xl print:border-black print:bg-white">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-green-700 print:text-black">
                Total Pendapatan
              </p>
              <Wallet className="text-green-600 print:hidden" size={24} />
            </div>
            <h2 className="text-3xl font-black text-green-800 print:text-black">
              Rp {data?.statistik.pendapatan.toLocaleString("id-ID")}
            </h2>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl print:border-black print:bg-white">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-blue-700 print:text-black">
                Peserta Lunas (Siap Tanding)
              </p>
              <CheckCircle className="text-blue-600 print:hidden" size={24} />
            </div>
            <h2 className="text-3xl font-black text-blue-800 print:text-black">
              {data?.statistik.lunas} Orang
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl print:border-black print:bg-white">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold text-slate-700 print:text-black">
                Peserta Pending
              </p>
              <Users className="text-slate-600 print:hidden" size={24} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 print:text-black">
              {data?.statistik.pending} Orang
            </h2>
          </div>
        </div>

        {/* Tabel Peserta Lunas */}
        <div>
          <h3 className="text-xl font-black mb-4 uppercase print:text-black">
            Daftar Peserta Terverifikasi
          </h3>
          <div className="border border-slate-200 rounded-2xl overflow-hidden print:border-black">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 print:border-black print:bg-white">
                <tr>
                  <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest print:text-black">
                    No
                  </th>
                  <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest print:text-black">
                    Nama Peserta
                  </th>
                  <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest print:text-black">
                    Tanggal Lomba
                  </th>
                  <th className="p-4 font-black text-slate-500 text-xs uppercase tracking-widest print:text-black">
                    No Lapak
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 print:divide-black">
                {data?.peserta.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center font-bold">
                      Belum ada peserta lunas.
                    </td>
                  </tr>
                ) : (
                  data?.peserta.map((p: any, index: number) => (
                    <tr key={p.id}>
                      <td className="p-4 font-bold">{index + 1}</td>
                      <td className="p-4 font-bold text-slate-800">
                        {p.nama_peserta}
                      </td>
                      <td className="p-4">{p.tanggal_lomba}</td>
                      <td className="p-4 font-black text-lg">
                        {p.nomor_lapak}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
