import { useEffect, useState, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMedia = window.matchMedia('(display-mode: standalone)').matches;
      const isStandaloneNavigator = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      const isStandaloneDoc = document.referrer.includes('android-app://');
      return isStandaloneMedia || isStandaloneNavigator || isStandaloneDoc;
    };

    setIsInstalled(checkStandalone());

    // Check if dismissed before in session/localStorage
    const dismissed = localStorage.getItem('uz_pwa_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 1000 * 60 * 60 * 24 * 7) {
      // Dismissed within last 7 days
      setIsDismissed(true);
    }

    // iOS Detection
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;
    setIsIOS(isIOSDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) {
      return false;
    }
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      } else {
        localStorage.setItem('uz_pwa_dismissed', Date.now().toString());
        setIsDismissed(true);
      }
    } catch {
      // Ignored
    }
    return false;
  }, [deferredPrompt]);

  const dismiss = useCallback(() => {
    localStorage.setItem('uz_pwa_dismissed', Date.now().toString());
    setIsDismissed(true);
  }, []);

  return {
    isInstallable: !!deferredPrompt && !isInstalled,
    isInstalled,
    isIOS: isIOS && !isInstalled,
    isDismissed,
    install,
    dismiss,
  };
}
