import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        // SIMPAN TOKEN KE LOCALSTORAGE
        // Biar kalau direfresh, admin nggak perlu login lagi
        localStorage.setItem("admin_token", response.data.access_token);
        localStorage.setItem("admin_user", JSON.stringify(response.data.user));

        // Pindah ke halaman dashboard admin (kita buat nanti)
        navigate("/admin/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login gagal. Cek email & password.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Tombol Back ke Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold transition-all"
      >
        <ArrowLeft size={20} /> KEMBALI
      </button>

      <div className="max-w-md w-full">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
          {/* Dekorasi Bulat */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-50 rounded-full blur-3xl opacity-50"></div>

          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#ff4d4d] text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-200">
              <Lock size={30} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
              Admin Panel
            </h1>
            <p className="text-slate-500 font-medium">
              Masuk untuk mengelola pendaftaran
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {" "}
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                Email Admin
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                  placeholder="admin@combro.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-slate-400"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-red-100 focus:border-[#ff4d4d] outline-none transition-all font-bold text-slate-700 bg-slate-50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>MASUK SEKARANG</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
