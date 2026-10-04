import React, { useState } from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isDismissed, install, dismiss } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // If already installed, dismissed, or not supported, do not show
  if (isInstalled || isDismissed || (!isInstallable && !isIOS)) {
    return null;
  }

  const handleAction = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <aside 
        aria-label="Pemasangan Aplikasi"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 animate-slideUp"
      >
        <div className="rounded-2xl glass-card border border-blue-500/40 bg-[#080d1a]/95 p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3.5 glow-blue">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/40 flex items-center justify-center shrink-0 shadow-sm">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white font-display truncate">
                Pasang Uncle Zein
              </div>
              <div className="text-[11px] font-mono-code text-slate-300 truncate">
                Akses cepat di HP & Desktop
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleAction}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-sm cursor-pointer active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pasang</span>
            </button>
            <button
              onClick={dismiss}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              title="Tutup"
              aria-label="Tutup notifikasi pasang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <PWAInstallModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isIOS={isIOS}
        onNativeInstall={install}
        isInstallable={isInstallable}
      />
    </>
  );
};
