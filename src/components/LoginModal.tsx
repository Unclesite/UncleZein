import React, { useState } from 'react';
import { X, Lock, Mail, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 600);
  };

  const handleGuestAccess = () => {
    setIsSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl glass-card border border-white/10 p-8 sm:p-10 bg-[#090c14] space-y-6 shadow-2xl glow-blue">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold uppercase">
            <Lock className="w-4 h-4" />
            <span>PORTAL PENELITI & ARSIP</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSent ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">Akses Terbuka</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Anda kini memiliki akses ke repositori manuskrip lengkap, draf monograf pra-cetak, dan log laboratorium riset Uncle Zein.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-md"
            >
              Lanjutkan Eksplorasi
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white font-display">
                Masuk ke Ruang Riset
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Akses eksklusif untuk mengunduh naskah lengkap monograf, berpartisipasi dalam verifikasi bukti, dan membaca catatan harian tanpa batas.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono-code text-slate-300 uppercase">
                  Email Afiliasi / Peneliti
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@institusi.org"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <span>Mengautentikasi...</span>
                ) : (
                  <>
                    <span>Kirim Tautan Akses</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 border-t border-white/10 text-center">
              <button
                onClick={handleGuestAccess}
                className="text-xs text-blue-400 hover:text-blue-300 font-mono-code underline cursor-pointer"
              >
                Masuk Langsung sebagai Tamu Riset (Guest Access)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
