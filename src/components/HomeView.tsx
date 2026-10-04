import React from 'react';
import { ArrowRight, BookOpen, Compass, ShieldAlert, Sparkles, Layers, Quote, Clock, MapPin, ChevronRight, Zap, PenTool, Search, Briefcase, HelpCircle } from 'lucide-react';
import { ARTICLES_DATA, DAILY_NOTES_DATA, RESEARCH_DATA, PASSIONS_DATA, SITE_CONFIG, ABOUT_MANIFESTO, WHAT_I_DO_DATA, Article, DailyNote } from '../data/siteData';

interface HomeViewProps {
  onNavigate: (tab: string, path?: string) => void;
  onOpenArticle: (article: Article) => void;
  onOpenNote: (note: DailyNote) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenArticle,
  onOpenNote,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [guitarImageError, setGuitarImageError] = React.useState(false);

  const conceptTags = [
    { name: 'QURAN', count: '14 Esai' },
    { name: 'HISTORY', count: '28 Risalah' },
    { name: 'SCIENCE', count: '19 Catatan' },
    { name: 'PHILOSOPHY', count: '32 Esai' },
    { name: 'ANTHROPOLOGY', count: '12 Riset' },
    { name: 'EPISTEMOLOGY', count: '21 Kajian' },
    { name: 'CRITICAL THINKING', count: '45 Catatan' },
    { name: 'HERMENEUTICS', count: '16 Naskah' },
  ];

  const latestArticles = ARTICLES_DATA.slice(0, 3);
  const featuredNote = DAILY_NOTES_DATA[0];

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-28 pb-12 overflow-hidden border-b border-white/5">
        {/* Ambient Subtle Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Typography, Identity & Signature Taglines */}
            <div className="lg:col-span-7 space-y-8">
              {/* Header Badges: Digital Journal + Think. Question. Test. */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-code">
                <div className="flex items-center gap-2 text-blue-400 bg-blue-950/40 px-3 py-1 rounded-full border border-blue-500/30">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="font-bold tracking-wider uppercase">PERSONAL JOURNAL // UNCLE ZEIN.</span>
                </div>
                <div className="text-slate-400 font-semibold tracking-wider">
                  "THINK. QUESTION. TEST."
                </div>
              </div>

              {/* Giant Title */}
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none font-display uppercase">
                UNCLE ZEIN<span className="text-blue-500">.</span>
              </h1>

              {/* Slogan */}
              <div className="space-y-3">
                <p className="text-xl sm:text-3xl font-bold text-slate-200 leading-tight font-display text-balance">
                  "Question everything. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                    Especially the things
                  </span>{' '}
                  you're told not to question."
                </p>
                
                <p className="text-xs sm:text-sm font-mono-code text-blue-300/90 font-medium">
                  Religion. History. Science. Philosophy. And the questions in between.
                </p>
              </div>

              <p className="text-base text-slate-300 font-light leading-relaxed max-w-xl">
                Ini tempat saya menulis, mencari tahu hal-hal yang menarik, jalan-jalan, dan mencatat apa yang ditemukan—dari sejarah, teks keagamaan, sains, hingga keseharian di alam terbuka.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('books', '/books')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold font-mono-code tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-98 cursor-pointer"
                >
                  <span>Explore the Books</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('ideas', '/ideas')}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-bold font-mono-code tracking-wider uppercase text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-xl transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Read Ideas</span>
                </button>
              </div>

              {/* Meta stats */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono-code border-t border-white/5">
                <div>
                  <strong className="text-white font-bold tabular-nums">400+ Hal</strong> Catatan
                </div>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <div>
                  <strong className="text-white font-bold tabular-nums">5 Tingkat</strong> Bukti
                </div>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <div>
                  <strong className="text-white font-bold tabular-nums">Catatan</strong> Pribadi
                </div>
              </div>
            </div>

            {/* Right: Authentic Horseback Riding Photo in Hero with Fallback */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md group">
                {/* Electric Blue Accent Framing Box */}
                <div className="absolute -inset-2 rounded-2xl border-2 border-blue-500/50 -rotate-2 group-hover:rotate-0 transition-transform duration-500 pointer-events-none" />
                <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-blue-400 z-20" />
                <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-blue-400 z-20" />

                <div className="relative rounded-xl overflow-hidden glass-card p-2 bg-[#0a0d14] border border-white/10 glow-blue shadow-2xl">
                  <div className="aspect-[3/4] sm:aspect-[4/5] rounded-lg overflow-hidden relative flex flex-col justify-between bg-gradient-to-b from-[#111624] via-[#090d18] to-black">
                    {!imageError ? (
                      <img
                        src="1001610070-ttH5C.jpg"
                        alt="Uncle Zein Berkuda"
                        className="absolute inset-0 w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                        style={{ objectPosition: 'center 58%' }}
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-blue-950/40 via-slate-900 to-black">
                        <div className="w-24 h-24 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                          <span className="text-3xl font-black font-display text-white">UZ</span>
                        </div>
                        <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest">Outdoor Photo</span>
                      </div>
                    )}

                    {/* Gradient Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

                    {/* Bottom Metadata Lockup */}
                    <div className="relative z-10 p-4 mt-auto bg-gradient-to-t from-black/90 via-black/50 to-transparent space-y-1.5 backdrop-blur-[2px] rounded-b-lg">
                      <div>
                        <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                          Uncle Zein
                        </h3>
                        <p className="text-xs font-semibold text-slate-200 mt-0.5">
                          Independent thinker
                        </p>
                        <p className="text-[11px] font-mono-code text-blue-400">
                          Est. pertanyaan tanpa akhir
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO BANNER: Open Inquiry & Workbench */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-2xl glass-card border border-blue-500/30 p-8 sm:p-14 glow-blue relative overflow-hidden bg-gradient-to-b from-blue-950/20 via-black to-slate-950">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono-code text-blue-400 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>CATATAN UNCLE ZEIN // RUANG TERBUKA</span>
            </div>

            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display uppercase tracking-tight leading-snug text-balance">
              "This is not a website about having all the answers. It is a place to question the answers we think we already have."
            </p>

            <div className="w-16 h-0.5 bg-blue-500 mx-auto rounded-full" />

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Website ini adalah tempat mencatat dan berbagi—pertanyaan diajukan dengan santai tapi jujur, sumber dibaca dengan tenang, dan apa yang ditemukan ditulis apa adanya.
            </p>
          </div>
        </div>
      </section>

      {/* 3. LATEST THINKING / TULISAN DAN ESAI SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
              01 // TULISAN & ESAI
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Tulisan dan Esai Terbaru
            </h2>
          </div>

          <button
            onClick={() => onNavigate('ideas', '/ideas')}
            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase cursor-pointer"
          >
            <span>View All Ideas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((art, idx) => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className="glass-card rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span className="text-blue-400 font-semibold">{art.essayNumber || `0${idx + 1}`}</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors font-display line-clamp-2 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono-code">{art.category}</span>
                <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Baca Esai <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHAT I DO SECTION (Pillars on Home) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
              02 // WHAT I DO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Beberapa Hal yang Dikerjakan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Dari menulis esai, membaca riset sejarah, mengurus usaha, hingga jalan-jalan ke laut dan gunung.
            </p>
          </div>

          <button
            onClick={() => onNavigate('about', '/about')}
            className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase cursor-pointer"
          >
            <span>Selengkapnya di About</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHAT_I_DO_DATA.slice(0, 4).map((item) => (
            <div
              key={item.id}
              onClick={() => {
                if (item.linkKey === 'writing') onNavigate('ideas', '/ideas');
                else if (item.linkKey === 'research') onNavigate('research', '/research');
                else onNavigate('about', '/about');
              }}
              className="p-5 rounded-2xl glass-card border border-white/10 hover:border-blue-500/40 hover:bg-white/[0.03] transition-all flex flex-col justify-between space-y-4 group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-code text-blue-400 font-bold uppercase">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono-code text-slate-400">
                    {item.subtitle}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="text-[11px] font-semibold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform pt-2 border-t border-white/5">
                <span>Lihat</span> <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PERSONAL PASSIONS & FIELD SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl glass-card border border-white/10 overflow-hidden glow-blue bg-gradient-to-br from-[#0b101d] via-[#060911] to-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Contemplative Guitar Portrait Photo with Aesthetic Framing */}
            <div className="lg:col-span-6 relative aspect-[16/11] sm:aspect-[16/10] lg:aspect-auto lg:h-[420px] overflow-hidden bg-slate-950 group">
              {!guitarImageError ? (
                <img
                  src="1001627970-82AvF.jpg"
                  alt="Uncle Zein Santai"
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  onError={() => setGuitarImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
                  <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-white">UZ</span>
                  </div>
                  <span className="text-xs font-mono-code text-blue-400">Personal Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:via-black/20 lg:to-[#07090e] pointer-events-none" />

              {/* Bottom Caption Lockup */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-3 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
                <div>
                  <div className="text-white font-bold text-xs tracking-wide">Independent thinker</div>
                  <div className="text-blue-400 font-mono-code text-[11px] font-medium">Est. pertanyaan tanpa akhir</div>
                </div>
                <div className="text-[10px] font-mono-code text-slate-400 uppercase tracking-wider hidden sm:block">
                  Uncle Zein Journal
                </div>
              </div>
            </div>

            {/* Right: Personal Passions Narrative */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
                  <Zap className="w-4 h-4" />
                  <span>KEGIATAN & PERJALANAN</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight uppercase">
                  JALAN, LIHAT, CATAT
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Ke laut, naik gunung, jalan-jalan, dan sesekali napak tilas sejarah lokal.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <strong className="text-white block font-mono-code text-blue-400 mb-0.5">KEGIATAN:</strong>
                  Spearfishing, jalan-jalan, berburu, berkuda, memancing.
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <strong className="text-white block font-mono-code text-blue-400 mb-0.5">RITME:</strong>
                  Ketenangan, rasa ingin tahu, dan menikmati hidup.
                </div>
              </div>

              <button
                onClick={() => onNavigate('about', '/about')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-md cursor-pointer"
              >
                <span>Lihat Catatan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW I READ & CURRENT RESEARCH SECTION (2-Column Grid) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* How I Read Section */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>03 // CARA SAYA MEMBACA</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Cara Membaca dan Memahami Catatan Lama
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                "Membaca bukan untuk mencari pembenaran atas apa yang sudah kita percaya, melainkan untuk melihat berbagai hal dengan lebih jernih dan terbuka."
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono-code font-bold shrink-0">1</span>
                  <span><strong>Periksa Teks Aslinya:</strong> Melihat langsung bahasa dan naskah awalnya untuk memahami konteks aslinya.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono-code font-bold shrink-0">2</span>
                  <span><strong>Pisahkan Fakta dari Tafsir:</strong> Membedakan apa yang tertulis jelas dari apa yang baru berupa interpretasi.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono-code font-bold shrink-0">3</span>
                  <span><strong>Gunakan Nalar yang Masuk Akal:</strong> Mencari penjelasan yang runtut dan tidak bertentangan dengan akal sehat.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('about', '/about')}
              className="mt-6 inline-flex items-center gap-2 text-xs font-mono-code font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase cursor-pointer"
            >
              <span>Pelajari Kerangka Pikir Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Current Research Section */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-8 sm:p-10 border border-blue-500/30 glow-blue space-y-6 flex flex-col justify-between bg-gradient-to-br from-[#0c1324] via-slate-950 to-black">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-code text-blue-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="font-bold">04 // RISET & CATATAN</span>
                </div>
                <span className="text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded bg-blue-950/40 font-semibold">
                  {RESEARCH_DATA.disciplineTag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                {RESEARCH_DATA.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed italic">
                "{RESEARCH_DATA.synopsis}"
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span>Five Layers of Evidence:</span>
                  <span className="text-blue-400 font-bold">5 Tingkat Bukti</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {[96, 84, 72, 55, 18].map((score, i) => (
                    <div key={i} className="h-1.5 rounded-full bg-blue-500/30 overflow-hidden">
                      <div className="h-full bg-blue-400" style={{ width: `${score}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('research', '/research')}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-md cursor-pointer self-start"
            >
              <span>Buka Catatan Riset Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. CONCEPT MAP / TAGS GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
            05 // CONCEPT MAP
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Topik dan Hal yang Sering Dipikirkan
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {conceptTags.map((tag) => (
            <button
              key={tag.name}
              onClick={() => onNavigate('ideas', '/ideas')}
              className="p-4 rounded-xl glass-card border border-white/5 hover:border-blue-500/40 hover:bg-blue-600/10 transition-all text-left group cursor-pointer"
            >
              <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors font-mono-code">
                #{tag.name}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {tag.count}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 8. QUOTES & DAILY NOTES SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Quote */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-12 border border-white/10 space-y-4 glow-blue">
            <Quote className="w-10 h-10 text-blue-500/30" />
            <p className="text-xl sm:text-2xl font-bold text-white font-display italic leading-relaxed text-balance">
              "Jangan mencari pembenaran atas apa yang sudah kamu percaya. Cari tahu apakah hal itu masih masuk akal ketika diuji."
            </p>
            <div className="pt-2 text-xs font-mono-code text-blue-400">
              — UNCLE ZEIN // CATATAN HARIAN
            </div>
          </div>

          {/* Daily Note Preview */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-8 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span className="text-blue-400 font-bold">NOTES & CATATAN</span>
                <span>{featuredNote.date}</span>
              </div>

              <h4 className="text-lg font-bold text-white font-display">
                {featuredNote.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-300 font-serif-title italic leading-relaxed line-clamp-3">
                "{featuredNote.snippet}"
              </p>
            </div>

            <button
              onClick={() => onOpenNote(featuredNote)}
              className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase cursor-pointer pt-2"
            >
              <span>Baca Catatan Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
