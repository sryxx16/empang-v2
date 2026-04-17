import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Banknote,
  Users,
  CreditCard,
  Wallet,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  Filter,
  RefreshCw,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";

export default function AdminReportPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [metodeBayar, setMetodeBayar] = useState("semua");
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async (
    start?: string,
    end?: string,
    metode?: string,
  ) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (start) params.append("start_date", start);
      if (end) params.append("end_date", end);
      if (metode && metode !== "semua") params.append("metode_bayar", metode);

      const res = await axios.get(
        `http://localhost/api/admin/reports?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setData(res.data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilter = () => {
    fetchReports(startDate, endDate, metodeBayar);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setMetodeBayar("semua");
    fetchReports();
  };

  if (loading)
    return (
      <AdminLayout>
        <div className="p-8 font-black uppercase animate-pulse">
          Menghitung Cuan...
        </div>
      </AdminLayout>
    );

  if (!data || !data.summary)
    return (
      <AdminLayout>
        <div className="p-8 font-black uppercase text-red-500">
          Gagal memuat data laporan. Silakan refresh halaman.
        </div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <main className="flex-grow p-8 bg-slate-50 min-h-screen">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              Laporan Keuangan
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              Data real-time berdasarkan peserta yang sudah lunas (Rekap).
            </p>
          </div>
          <button
            onClick={() => fetchReports(startDate, endDate, metodeBayar)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition"
          >
            <RefreshCw size={16} /> Refresh
          </button>
        </div>

        {/* FILTER SECTION */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 mb-10 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={18} className="text-slate-400" />
            <h3 className="font-black text-slate-800 uppercase">Filter</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">
                Dari Tanggal
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">
                Sampai Tanggal
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase mb-2 block">
                Metode Bayar
              </label>
              <select
                value={metodeBayar}
                onChange={(e) => setMetodeBayar(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
              >
                <option value="semua">Semua Metode</option>
                <option value="tunai">Tunai (Cash)</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div className="flex gap-2 pt-6">
              <button
                onClick={handleApplyFilter}
                className="flex-1 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Terapkan
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* 1. RINGKASAN KARTU UTAMA */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-slate-900 text-white p-6 rounded-[32px] shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/10 p-3 rounded-2xl">
                <Banknote size={24} />
              </div>
              <span className="text-[10px] font-black bg-green-500 px-2 py-1 rounded-full uppercase">
                Total Omzet
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Pendapatan Kotor
            </p>
            <h3 className="text-2xl font-black mt-1">
              Rp {data.summary.total_revenue.toLocaleString("id-ID")}
            </h3>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
                <Users size={24} />
              </div>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Total Peserta
            </p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {data.summary.total_peserta} Orang
            </h3>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Wallet className="text-green-500" size={14} /> Tunai
            </p>
            <h3 className="text-xl font-black text-slate-900">
              Rp {data.summary.cash.toLocaleString("id-ID")}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              {data.summary.persen_cash}% dari total
            </p>
          </div>

          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <CreditCard className="text-blue-500" size={14} /> Transfer
            </p>
            <h3 className="text-xl font-black text-slate-900">
              Rp {data.summary.transfer.toLocaleString("id-ID")}
            </h3>
            <p className="text-xs text-slate-500 mt-2">
              {data.summary.persen_transfer}% dari total
            </p>
          </div>
        </div>

        {/* 2. STATISTIK TAMBAHAN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-[32px] shadow-lg">
            <p className="text-xs font-bold text-purple-100 uppercase tracking-widest mb-2">
              Rata-rata per Transaksi
            </p>
            <h3 className="text-3xl font-black">
              Rp {data.summary.avg_per_transaksi?.toLocaleString("id-ID")}
            </h3>
          </div>

          {data.summary.trending_day && (
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-[32px] shadow-lg">
              <p className="text-xs font-bold text-amber-100 uppercase tracking-widest mb-2 flex items-center gap-2">
                <TrendingUp size={14} /> Hari Terbanyak
              </p>
              <h3 className="text-2xl font-black">
                {data.summary.trending_day.tanggal}
              </h3>
              <p className="text-sm text-amber-100 mt-1">
                Rp{" "}
                {Number(
                  data.summary.trending_day.total_pendapatan,
                ).toLocaleString("id-ID")}
              </p>
            </div>
          )}

          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
              Distribusi Pembayaran
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">Tunai</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${data.summary.persen_cash}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    {data.summary.persen_cash}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-slate-700">
                  Transfer
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${data.summary.persen_transfer}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    {data.summary.persen_transfer}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. BREAKDOWN PER LOMBA */}
        {data.by_lomba && data.by_lomba.length > 0 && (
          <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm mb-10">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Calendar size={18} className="text-[#ff4d4d]" /> Breakdown Per
                Lomba
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <tr>
                    <th className="p-4">Nama Lomba</th>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Peserta</th>
                    <th className="p-4 text-right">Total Pendapatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.by_lomba.map((lomba: any) => (
                    <tr
                      key={lomba.id}
                      className="hover:bg-slate-50 transition-colors font-bold text-sm"
                    >
                      <td className="p-4 text-slate-800">{lomba.nama_lomba}</td>
                      <td className="p-4 text-slate-600">
                        {new Date(lomba.tanggal_lomba).toLocaleDateString(
                          "id-ID",
                        )}
                      </td>
                      <td className="p-4 text-slate-600">
                        {lomba.jumlah_peserta} Orang
                      </td>
                      <td className="p-4 text-right text-green-600">
                        Rp{" "}
                        {Number(lomba.total_pendapatan).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. LAPORAN HARIAN DAN BULANAN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LAPORAN HARIAN */}
          <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <Calendar size={18} className="text-[#ff4d4d]" /> Laporan Harian
              </h2>
            </div>
            <div className="overflow-x-auto max-h-96">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest sticky top-0">
                  <tr>
                    <th className="p-4">Tanggal</th>
                    <th className="p-4">Peserta</th>
                    <th className="p-4 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-sm">
                  {data.daily.map((d: any) => (
                    <tr
                      key={d.tanggal}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="p-4 text-slate-700">{d.tanggal}</td>
                      <td className="p-4 text-slate-500">
                        {d.jumlah_peserta} Orang
                      </td>
                      <td className="p-4 text-right text-green-600">
                        Rp {Number(d.total_pendapatan).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* LAPORAN BULANAN */}
          <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                <ArrowUpRight size={18} className="text-blue-500" /> Rekap
                Bulanan
              </h2>
            </div>
            <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
              {data.monthly.map((m: any) => (
                <div
                  key={m.bulan}
                  className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition"
                >
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      {m.bulan}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {m.jumlah_peserta} peserta
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">
                      Rp {Number(m.total_pendapatan).toLocaleString("id-ID")}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Tunai: Rp {Number(m.cash).toLocaleString("id-ID")} | TF:
                      Rp {Number(m.transfer).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
}
