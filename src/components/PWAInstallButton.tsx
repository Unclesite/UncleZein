import React, { useState } from 'react';
import { Download, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallModal } from './PWAInstallModal';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'drawer' | 'banner';
  onInstalled?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'nav', onInstalled }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);

  // Do not display if already running inside installed standalone PWA
  if (isInstalled) {
    return null;
  }

  // If browser doesn't support install and not iOS, only show if variant is drawer or banner
  const isAvailable = isInstallable || isIOS;
  if (!isAvailable && variant === 'nav') {
    return null;
  }

  const handleClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success && onInstalled) {
        onInstalled();
      }
    } else {
      setShowModal(true);
    }
  };

  if (variant === 'drawer') {
    return (
      <>
        <button
          onClick={handleClick}
          className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-blue-600/15 border border-blue-500/30 text-xs font-mono-code font-bold text-blue-300 hover:bg-blue-600/25 transition-all cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-blue-400" />
            <span>PASANG UNCLE ZEIN</span>
          </span>
          <Download className="w-3.5 h-3.5 text-blue-400" />
        </button>

        <PWAInstallModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          isIOS={isIOS}
          onNativeInstall={install}
          isInstallable={isInstallable}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-code rounded-lg border border-blue-500/30 bg-blue-950/30 text-blue-300 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-white transition-all cursor-pointer shadow-sm"
        title="Pasang Uncle Zein sebagai Aplikasi Web (PWA)"
      >
        <Download className="w-3.5 h-3.5 text-blue-400" />
        <span>PASANG</span>
      </button>

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
