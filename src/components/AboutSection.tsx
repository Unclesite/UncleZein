import React, { useState } from 'react';
import { Compass, MapPin, Target, Zap, Anchor, ArrowRight, ShieldCheck, BookOpen, Volume2, Sparkles, Camera, PenTool, Search, Briefcase, ExternalLink, Code2, HelpCircle } from 'lucide-react';
import { PASSIONS_DATA, Passion, ABOUT_MANIFESTO, ABOUT_LINKS, WHAT_I_DO_DATA, WhatIDoItem } from '../data/siteData';

interface AboutSectionProps {
  onSelectPassion: (passion: Passion) => void;
  onNavigate: (tab: string, path?: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onSelectPassion, onNavigate }) => {
  const [guitarError, setGuitarError] = useState(false);
  const [horseError, setHorseError] = useState(false);
  const [activePhoto, setActivePhoto] = useState<'horse' | 'guitar'>('horse');

  const getPassionIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5" />;
      case 'Target':
        return <Target className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const getWhatIDoIcon = (iconName: string) => {
    switch (iconName) {
      case 'PenTool':
        return <PenTool className="w-5 h-5" />;
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const handleWhatIDoClick = (item: WhatIDoItem) => {
    if (item.linkKey === 'writing') {
      onNavigate('ideas', '/ideas');
    } else if (item.linkKey === 'research') {
      onNavigate('research', '/research');
    } else {
      const link = ABOUT_LINKS[item.linkKey];
      if (link && !link.startsWith('#')) {
        window.open(link, '_blank');
      }
    }
  };

  return (
    <section id="about" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-24">
        {/* 1. SECTION HEADER & HUMBLE REFLECTIVE MANIFESTO */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>ABOUT // RUANG PERENUNGAN BERSAMA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display text-balance leading-[1.1]">
            {ABOUT_MANIFESTO.credo}
          </h1>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            <p className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-slate-200">
              {ABOUT_MANIFESTO.lead}
            </p>
            <p className="text-slate-300 border-l-2 border-blue-500/60 pl-5 italic text-sm sm:text-base">
              "{ABOUT_MANIFESTO.secondary}"
            </p>
          </div>
        </div>

        {/* 2. WHAT I DO SECTION (Pillars & Editable Placeholders) */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div className="space-y-1">
              <div className="text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
                02 // WHAT I DO
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                What I Do
              </h2>
              <p className="text-sm text-slate-400">
                Empat hal yang dikerjakan, masing-masing dengan jalurnya sendiri.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <Code2 className="w-3.5 h-3.5 text-blue-400" />
              <span>ABOUT_LINKS Configuration Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_I_DO_DATA.map((item) => (
              <div
                key={item.id}
                onClick={() => handleWhatIDoClick(item)}
                className="glass-card rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between space-y-6 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {getWhatIDoIcon(item.iconName)}
                    </div>
                    <span className={`text-[11px] font-mono-code px-2.5 py-0.5 rounded-full border ${
                      item.isExternalPlaceholder
                        ? 'text-slate-400 border-white/10 bg-white/[0.02]'
                        : 'text-blue-300 border-blue-500/30 bg-blue-950/30'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-blue-400 font-mono-code mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono-code">
                    {item.isExternalPlaceholder ? 'Tautan dapat diedit' : 'Buka Halaman'}
                  </span>
                  <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {item.isExternalPlaceholder ? (
                      <>Tautan Eksternal <ExternalLink className="w-3.5 h-3.5" /></>
                    ) : (
                      <>Jelajahi <ArrowRight className="w-3.5 h-3.5" /></>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Editable Placeholders Guide Banner */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 flex items-center gap-3 text-xs text-slate-300 font-mono-code">
            <HelpCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Editable placeholders:</strong> Tautan <em>Business</em>, <em>Travel</em>, dan <em>Creative Projects</em> saat ini berupa placeholder. Ganti nilai pada <code className="text-blue-300 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">ABOUT_LINKS</code> di <code className="text-blue-300 bg-black/40 px-1.5 py-0.5 rounded border border-white/10">src/data/siteData.ts</code> untuk mengarahkannya.
            </span>
          </div>
        </div>

        {/* 3. NARRATIVE REFLECTION & AUTHENTIC PORTRAIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Story Narrative */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-2xl border border-white/10 space-y-6">
            <h3 className="text-2xl font-bold text-white font-display">
              Menemukan Kejernihan di Luar Ruang Kuliah & Mimbar Tradisional
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Dunia saat ini dipenuhi oleh dua kutub ekstrem: mereka yang menelan dogma tanpa saringan akal sehat karena takut dikutuk, dan akademisi menara gading yang berteori rumit namun terputus total dari realitas keras kehidupan nyata.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Saya memilih jalur ketiga: <strong>Jalur Penyelidik Lapangan Merdeka</strong>. Membaca naskah kuno dalam bahasa aslinya, memeriksa lapisan arkeologi, dan sekaligus menguji ketajaman insting di alam liar—melalui menyelam di palung laut, menunggang kuda di savana terbuka, dan melacak jejak di rimba sunyi.
            </p>

            {/* Authentic Photographic Documentation (Dual Mode Showcase) */}
            <div className="space-y-3 my-5">
              {/* Photo Selector Switcher */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono-code">
                  <button
                    type="button"
                    onClick={() => setActivePhoto('horse')}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                      activePhoto === 'horse'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    01. Berkuda & Lapangan
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhoto('guitar')}
                    className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-bold ${
                      activePhoto === 'guitar'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                        : 'bg-white/[0.03] text-slate-400 border-white/10 hover:text-white'
                    }`}
                  >
                    02. Refleksi & Kontemplasi
                  </button>
                </div>
                <span className="text-[10px] font-mono-code text-slate-400 hidden sm:inline">
                  DOKUMENTASI ASLI
                </span>
              </div>

              {/* Photo Container */}
              <div className="rounded-2xl overflow-hidden border border-white/15 relative aspect-[16/11] sm:aspect-[16/10] bg-slate-950 shadow-2xl">
                {activePhoto === 'horse' ? (
                  !horseError ? (
                    <img
                      src="1001610070-ttH5C.jpg"
                      alt="Uncle Zein Berkuda di Arena Equestrian"
                      className="w-full h-full object-cover filter contrast-105 transition-all duration-500"
                      style={{ objectPosition: 'center 38%' }}
                      onError={() => setHorseError(true)}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-2">
                        <span className="text-xl font-bold text-white">UZ</span>
                      </div>
                      <span className="text-xs font-mono-code text-blue-400">Equestrian Field Photo</span>
                    </div>
                  )
                ) : (
                  !guitarError ? (
                    <img
                      src="1001627970-82AvF.jpg"
                      alt="Uncle Zein Contemplative Portrait with Guitar"
                      className="w-full h-full object-cover object-center filter contrast-105 transition-all duration-500"
                      onError={() => setGuitarError(true)}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-center">
                      <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-2">
                        <span className="text-xl font-bold text-white">UZ</span>
                      </div>
                      <span className="text-xs font-mono-code text-blue-400">Contemplative Reflection</span>
                    </div>
                  )
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono-code text-slate-200">
                  <span className="bg-black/70 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>
                      {activePhoto === 'horse' ? 'EQUESTRIAN ARENA // UNCLE ZEIN' : 'REFLEKSI & KONTEMPLASI // UNCLE ZEIN'}
                    </span>
                  </span>
                  <span className="bg-blue-600/80 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    {activePhoto === 'horse' ? 'OUTDOOR FIELD' : 'PRIVATE JOURNAL'}
                  </span>
                </div>
              </div>

              {/* Photo Caption Requested by User */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold text-xs tracking-wide">Independent thinker</div>
                  <div className="text-blue-400 font-mono-code text-[11px] font-medium">Est. pertanyaan tanpa akhir</div>
                </div>
                <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                  Uncle Zein Journal
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-blue-400 font-mono-code mb-1 font-bold">01. KEJUJURAN</div>
                <div className="text-xs text-slate-300">Setia pada pertanyaan yang jujur, bukan klaim kesimpulan absolut.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-blue-400 font-mono-code mb-1 font-bold">02. METODOLOGI</div>
                <div className="text-xs text-slate-300">Membedakan fakta, interpretasi, hipotesis, dan spekulasi.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-blue-400 font-mono-code mb-1 font-bold">03. KETERBUKAAN</div>
                <div className="text-xs text-slate-300">Siap dikritik dan dibantah jika ada data primer yang lebih valid.</div>
              </div>
            </div>
          </div>

          {/* Protocol card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-4 glow-blue">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-blue-400 uppercase font-bold">Framework Penyelidikan</span>
                <span className="text-xs text-slate-400 font-mono-code">Prinsip 4 Langkah</span>
              </div>

              <h4 className="text-lg font-bold text-white font-display">
                Protokol Uji Klaim Intelektual
              </h4>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">1</span>
                  <span><strong>Tolak Asumsi Awal:</strong> Anggap semua klaim teologis atau historis belum terbukti sampai data primer dihadirkan.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">2</span>
                  <span><strong>Audit Naskah Tertua:</strong> Periksa manuskrip fisik terawal, varian bacaan (*textual variants*), dan bahasa aslinya.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">3</span>
                  <span><strong>Uji Silang Lapangan:</strong> Validasi dengan catatan geologi, arkeologi, dan teks pihak ketiga yang netral.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 font-mono-code font-bold">4</span>
                  <span><strong>Uji Logika Non-Kontradiksi:</strong> Singkirkan spekulasi yang memuat cacat nalar formal (*fallacy*).</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('research', '/research')}
                className="w-full mt-4 py-2.5 px-4 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs font-mono-code font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Lihat Implementasi di Lab Riset</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4. PERSONAL PASSIONS GRID (Enhanced Bento Box with Horseback Riding Photo) */}
        <div className="space-y-8 pt-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
                PERSONAL PASSIONS & WILDERNESS CRAFT
              </div>
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white font-display">
                Disiplin Mental di Alam Liar
              </h3>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Bagi Uncle Zein, hobi bukan sekadar rekreasi pelarian, melainkan laboratorium fisik untuk melatih ketajaman batin, kesabaran primal, dan kerendahan hati di hadapan hukum semesta.
              </p>
            </div>

            <div className="text-xs text-slate-400 font-mono-code">
              Pilih kartu untuk membuka catatan lapangan & audio ambiance
            </div>
          </div>

          {/* Asymmetrical Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PASSIONS_DATA.map((passion, index) => {
              const isHorseback = passion.id === 'horseback';

              return (
                <div
                  key={passion.id}
                  onClick={() => onSelectPassion(passion)}
                  className={`glass-card rounded-2xl border border-white/10 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:border-blue-500/60 hover:scale-[1.01] flex flex-col justify-between ${
                    isHorseback ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#0e1628] via-[#080d18] to-black border-blue-500/30 glow-blue' : 'p-6 sm:p-7'
                  }`}
                >
                  {isHorseback ? (
                    // Special 2-Column Showcase Layout for Berkuda with Photo and Fallback
                    <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                      {/* Photo Column */}
                      <div className="md:col-span-6 relative aspect-[4/3] md:aspect-auto md:h-full min-h-[260px] overflow-hidden bg-slate-950">
                        {!horseError ? (
                          <img
                            src="1001610070-ttH5C.jpg"
                            alt="Uncle Zein Berkuda / Equestrian"
                            className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                            style={{ objectPosition: 'center 38%' }}
                            onError={() => setHorseError(true)}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-950 via-slate-900 to-black text-center">
                            <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-2">
                              <span className="text-xl font-bold text-white">UZ</span>
                            </div>
                            <span className="text-xs font-mono-code text-blue-400">Equestrian Discipline</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#080d18] pointer-events-none" />
                        <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-md border border-white/10 text-[11px] font-mono-code text-blue-300 backdrop-blur-sm">
                          <Camera className="w-3.5 h-3.5 text-blue-400" />
                          <span>FIELD PHOTO // EQUESTRIAN</span>
                        </div>
                      </div>

                      {/* Content Column */}
                      <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                              {getPassionIcon(passion.iconName)}
                            </div>
                            <span className="text-xs font-mono-code text-blue-400 font-bold">
                              DISIPLIN 04
                            </span>
                          </div>

                          <div>
                            <h4 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                              {passion.title}
                            </h4>
                            <p className="text-xs text-blue-400 font-mono-code mt-0.5">
                              {passion.subtitle}
                            </p>
                          </div>

                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                            {passion.description}
                          </p>

                          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-blue-200 font-serif-title italic">
                            "{passion.quote}"
                          </div>
                        </div>

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono-code">Equestrian Journal Ready</span>
                          <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Buka Jurnal Lapangan <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Standard Bento Card
                    <>
                      {/* Subtle Vector Backdrop Graphics */}
                      <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                        {getPassionIcon(passion.iconName)}
                      </div>

                      <div className="space-y-4">
                        {/* Top Header */}
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {getPassionIcon(passion.iconName)}
                          </div>
                          <span className="text-[11px] font-mono-code text-slate-400 group-hover:text-blue-300 transition-colors">
                            0{index + 1}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors font-display">
                            {passion.title}
                          </h4>
                          <p className="text-xs text-blue-400 font-mono-code mt-0.5">
                            {passion.subtitle}
                          </p>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                          {passion.description}
                        </p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-mono-code">Field Journal Ready</span>
                          <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            Buka Jurnal <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
