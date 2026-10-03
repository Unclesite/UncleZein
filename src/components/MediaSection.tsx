import React from 'react';
import { Youtube, Instagram, ExternalLink, Play, Sparkles } from 'lucide-react';
import { MEDIA_CHANNELS } from '../data/siteData';

export const MediaSection: React.FC = () => {
  return (
    <section id="media" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
            <span>05</span>
            <span aria-hidden="true">/</span>
            <span>KANAL MEDIA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Video & Media Sosial
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Berbagi cerita lewat video santai, pembahasan naskah, sejarah lokal, dan dokumentasi jalan-jalan di alam terbuka.
          </p>
        </div>

        {/* Channels Grid (YouTube & Instagram) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MEDIA_CHANNELS.map((ch) => (
            <div
              key={ch.name}
              className="glass-card rounded-3xl p-8 border border-white/10 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between space-y-6 bg-gradient-to-br from-[#0c1428] via-[#070b14] to-black"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {ch.name.includes('YouTube') ? (
                      <Youtube className="w-6 h-6" />
                    ) : (
                      <Instagram className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-xs font-mono-code text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full bg-blue-950/30">
                    {ch.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                    {ch.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono-code mt-0.5">{ch.handle}</div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {ch.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono-code">{ch.metrics}</span>
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase"
                >
                  <span>Buka {ch.name.split(' ')[0]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video Player Embed - Spearfishing & Outdoor */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-blue-500/30 space-y-6 bg-[#080d19]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="text-xs font-mono-code text-blue-400 font-bold uppercase tracking-wider">
                OUTDOOR & SPEARFISHING // YOUTUBE
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white font-display">
                Spearfishing Laut Lepas: Melepas Bosan di Alam Terbuka
              </h3>
            </div>
            <a
              href="https://youtu.be/Z1oKSlakKU4?si=raR_N2o48IqNWo1W"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-sm cursor-pointer"
            >
              <span>Tonton di YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black">
            <iframe
              src="https://www.youtube-nocookie.com/embed/Z1oKSlakKU4"
              title="Spearfishing Laut Lepas - Uncle Zein"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Dokumentasi aktifitas spearfishing di laut lepas — sekadar aktifitas di luar ruang untuk menikmati kebebasan samudra dan melepas bosan di sela rutinitas berpikir.
          </p>
        </div>
      </div>
    </section>
  );
};
