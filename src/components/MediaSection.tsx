import React, { useState } from 'react';
import { Youtube, Instagram, Share2, Play, ExternalLink, Sparkles, MessageSquare } from 'lucide-react';
import { MEDIA_CHANNELS } from '../data/siteData';

export const MediaSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; desc: string; url: string } | null>(null);

  const featuredClips = [
    {
      id: 'clip-1',
      title: 'Membongkar Mitos Kelahiran Abad ke-1: Fakta Naskah P46 & Galatia 4',
      duration: '18:42',
      views: '84K Views',
      channel: 'YouTube Long-form',
      summary: 'Analisis kata demi kata dari fragmen tertua papirus Yunani mengenai klaim keturunan Daud.',
      embedUrl: 'https://www.youtube.com'
    },
    {
      id: 'clip-2',
      title: 'Mengapa Logika Fallacy Begitu Efektif Membodohi Orang Banyak?',
      duration: '01:00',
      views: '240K Views',
      channel: 'TikTok Short Logic',
      summary: 'Dekonstruksi taktik ad hominem dan appeal to emotion dalam panggung perdebatan agama.',
      embedUrl: 'https://www.tiktok.com'
    },
    {
      id: 'clip-3',
      title: 'Di Bawah 20 Meter: Pelajaran Kejujuran dari Free-Diving Palung Laut',
      duration: '04:15',
      views: '115K Views',
      channel: 'Instagram Reel',
      summary: 'Refleksi sinematik saat menahan napas di kedalaman laut biru tanpa alat bantu pernapasan.',
      embedUrl: 'https://www.instagram.com'
    }
  ];

  return (
    <section id="media" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest">
            <span>05</span>
            <span aria-hidden="true">/</span>
            <span>DIGITAL CHANNELS & BROADCASTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Kanal Media & Arsip Audio-Visual
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Eksplorasi gagasan dalam format video esai, bedah logika kilat, dan dokumentasi visual ekspedisi alam liar.
          </p>
        </div>

        {/* Channels Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MEDIA_CHANNELS.map((ch, idx) => (
            <div
              key={ch.name}
              className="glass-card rounded-2xl p-7 border border-white/10 hover:border-blue-500/40 transition-all duration-300 group flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {ch.name.includes('YouTube') ? (
                      <Youtube className="w-6 h-6" />
                    ) : ch.name.includes('Instagram') ? (
                      <Instagram className="w-6 h-6" />
                    ) : (
                      <Share2 className="w-6 h-6" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono-code text-blue-400">
                    {ch.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                    {ch.name}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono-code mt-0.5">{ch.handle}</div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono-code">{ch.metrics}</span>
                <a
                  href={ch.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>Kunjungi Kanal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Curated Key Video Discussions */}
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white font-display">
              Sorotan Diskusi & Esai Pilihan
            </h3>
            <span className="text-xs text-slate-400 font-mono-code">Arsip Terbaru</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredClips.map((clip) => (
              <div
                key={clip.id}
                className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono-code">
                    <span className="text-blue-400">{clip.channel}</span>
                    <span>{clip.duration}</span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display line-clamp-2">
                    {clip.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {clip.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono-code">{clip.views}</span>
                  <a
                    href={clip.embedUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Putar Video</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
