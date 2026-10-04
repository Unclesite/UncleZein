import React from 'react';
import { X, Share2, PlusSquare, Smartphone, Check, ArrowRight } from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
  onNativeInstall?: () => void;
  isInstallable?: boolean;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
  isIOS,
  onNativeInstall,
  isInstallable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md rounded-2xl glass-card border border-blue-500/30 bg-[#0b101c] p-6 sm:p-8 shadow-2xl relative overflow-hidden glow-blue"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            <span className="text-xl font-black font-display text-white">UZ</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Pasang Uncle Zein
            </h3>
            <p className="text-xs text-blue-400 font-mono-code">
              Aplikasi Web Progresif (PWA)
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-sm text-slate-300">
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            Pasang Uncle Zein langsung di layar utama perangkat Anda untuk akses cepat, membaca lebih nyaman tanpa bilah browser, dan dukungan saat koneksi tidak stabil.
          </p>

          {isIOS ? (
            /* iOS Safari Instructions */
            <div className="space-y-3 bg-white/[0.03] border border-white/10 rounded-xl p-4">
              <div className="text-xs font-mono-code text-blue-300 font-bold uppercase tracking-wider mb-2">
                Petunjuk Pemasangan di iPhone / iPad:
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <strong>Langkah 1:</strong> Tekan tombol <strong>Share / Bagikan</strong> di bilah navigasi bawah Safari.
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong>Langkah 2:</strong> Gulir ke bawah lalu pilih menu <strong>"Add to Home Screen"</strong> (Tambah ke Layar Utama).
                </div>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-200">
                <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <strong>Langkah 3:</strong> Tekan <strong>"Add" / "Tambah"</strong> di pojok kanan atas.
                </div>
              </div>
            </div>
          ) : isInstallable && onNativeInstall ? (
            /* Chromium / Android / Desktop Install Action */
            <div className="space-y-3">
              <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-xs text-slate-300 space-y-1.5 font-mono-code">
                <div className="flex items-center gap-2 text-blue-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Mendukung mode layar penuh & standalone</span>
                </div>
                <div className="flex items-center gap-2 text-blue-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Dapat dibuka di HP, Tablet, Laptop, & Desktop</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onNativeInstall();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-md cursor-pointer"
              >
                <Smartphone className="w-4 h-4" />
                <span>Pasang Uncle Zein</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* General Browser Instructions */
            <div className="space-y-3 bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs text-slate-300">
              <p>
                Gunakan menu browser Anda (titik tiga di kanan atas atau ikon instalasi pada address bar) lalu pilih <strong>"Install Uncle Zein"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
              </p>
            </div>
          )}
        </div>

        {/* Footer Close */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-mono-code text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
