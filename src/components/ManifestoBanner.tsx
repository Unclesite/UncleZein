import React from 'react';
import { Quote, Sparkles, Compass } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteData';

export const ManifestoBanner: React.FC = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="relative rounded-2xl glass-card p-8 sm:p-12 overflow-hidden border border-white/10 glow-blue">
          {/* Background Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-2 flex justify-start lg:justify-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Quote className="w-8 h-8" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest block">
                Manifesto Intelektual Uncle Zein
              </span>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug font-display text-balance">
                "{SITE_CONFIG.readingPhilosophy}"
              </p>
            </div>

            <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 space-y-2">
              <div className="text-xs font-mono-code text-slate-400 uppercase">Core Standard</div>
              <div className="text-sm font-semibold text-white">Rasionalitas & Bukti Material</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Menolak argumentum ad baculum (ancaman) dan argumentum ad verecundiam (pemujaan otoritas).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
