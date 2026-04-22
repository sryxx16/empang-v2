import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      const response = await axios.post("/api/login", {
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Tombol Back ke Home */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-cyan-500 dark:hover:text-cyan-400 font-bold transition-all z-10"
      >
        <ArrowLeft size={20} /> <span className="hidden sm:inline">KEMBALI</span>
      </button>

      <div className="max-w-md w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
          className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 dark:shadow-slate-950/50 relative overflow-hidden"
        >
          {/* Dekorasi Bulat */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 dark:bg-blue-500/10 rounded-full blur-3xl opacity-50"></div>

          <div className="text-center mb-10 relative">
            <motion.div 
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20"
            >
              <Lock size={30} strokeWidth={2.5} />
            </motion.div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase transition-colors">
              Admin Panel
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium transition-colors">
              Masuk untuk mengelola pendaftaran
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-xl text-sm font-bold mb-6 border border-red-100 dark:border-red-500/20 animate-shake shadow-inner">
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest transition-colors">
                Email Admin
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-4 text-slate-400 dark:text-slate-500"
                  size={20}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all font-bold text-slate-700 dark:text-white"
                  placeholder="admin@combro.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-widest transition-colors">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-4 text-slate-400 dark:text-slate-500"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 focus:border-cyan-500 dark:focus:border-cyan-400 outline-none transition-all font-bold text-slate-700 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 group transition-all"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" size={22} />
              ) : (
                <>MASUK SEKARANG</>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
