import React from 'react';
import { ArrowRight, BookOpen, Compass, ShieldAlert, Sparkles, Layers, Quote, Clock, MapPin, ChevronRight, Zap } from 'lucide-react';
import { ARTICLES_DATA, DAILY_NOTES_DATA, RESEARCH_DATA, PASSIONS_DATA, SITE_CONFIG, Article, DailyNote } from '../data/siteData';

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
            {/* Left: Typography & Slogan */}
            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span>INDEPENDENT SCHOLARSHIP & CRITICAL RESEARCH</span>
              </div>

              {/* Giant Title */}
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-white leading-none font-display uppercase">
                UNCLE ZEIN<span className="text-blue-500">.</span>
              </h1>

              {/* Slogan */}
              <p className="text-xl sm:text-3xl font-bold text-slate-200 leading-tight font-display text-balance">
                "Question everything. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">
                  Especially the things
                </span>{' '}
                you're told not to question."
              </p>

              <p className="text-base text-slate-400 font-light leading-relaxed max-w-xl">
                Sebuah ruang eksperimentasi gagasan tanpa jerat dogmatisme. Membedah teks kuno, sejarah peradaban, dan prinsip rasionalitas melalui sains, logika murni, dan pengalaman lapangan.
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
                  <strong className="text-white font-bold tabular-nums">468 Hal</strong> Monograf
                </div>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <div>
                  <strong className="text-white font-bold tabular-nums">5 Layer</strong> Bukti Ilmiah
                </div>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <div>
                  <strong className="text-white font-bold tabular-nums">100%</strong> Non-Partisan
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
                  <div className="aspect-[4/5] rounded-lg overflow-hidden relative flex flex-col justify-between bg-gradient-to-b from-[#111624] via-[#090d18] to-black">
                    {!imageError ? (
                      <img
                        src="1001610070-ttH5C.jpg"
                        alt="Uncle Zein Berkuda"
                        className="absolute inset-0 w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                        onError={() => setImageError(true)}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-blue-950/40 via-slate-900 to-black">
                        <div className="w-24 h-24 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                          <span className="text-3xl font-black font-display text-white">UZ</span>
                        </div>
                        <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest">Equestrian Discipline</span>
                      </div>
                    )}

                    {/* Gradient Contrast Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                    {/* Top Badge */}
                    <div className="relative z-10 flex justify-between items-center text-[11px] font-mono-code text-blue-300 p-4">
                      <span className="bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm">
                        UNCLE ZEIN // EQUESTRIAN & FIELD
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
                    </div>

                    {/* Bottom Metadata Lockup */}
                    <div className="relative z-10 p-5 mt-auto bg-gradient-to-t from-black via-black/80 to-transparent">
                      <h3 className="text-2xl font-bold text-white font-display tracking-tight">
                        Uncle Zein
                      </h3>
                      <p className="text-xs font-mono-code text-blue-400 uppercase tracking-wider mt-0.5">
                        Independent Thinker & Field Explorer
                      </p>
                      <div className="border-t border-white/15 pt-2.5 mt-2 flex items-center justify-between text-[11px] font-mono-code text-slate-300">
                        <span>Credo</span>
                        <span className="text-blue-300 italic">"Bukan Ustaz. Bukan Akademisi."</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MANIFESTO BANNER */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-2xl glass-card border border-blue-500/30 p-8 sm:p-12 glow-blue text-center relative overflow-hidden bg-gradient-to-b from-blue-950/20 via-black to-slate-950">
          <div className="max-w-4xl mx-auto space-y-4">
            <span className="text-xs font-mono-code text-blue-400 font-bold uppercase tracking-widest block">
              THE CORE MANIFESTO
            </span>
            <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display uppercase tracking-tight leading-snug">
              "THIS IS NOT A WEBSITE ABOUT HAVING ALL THE ANSWERS. IT IS A PLACE TO QUESTION THE ANSWERS WE THINK WE ALREADY HAVE."
            </p>
            <div className="pt-2 flex justify-center">
              <span className="w-16 h-0.5 bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. LATEST THINKING SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
              01 // LATEST THINKING
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Pemikiran & Risalah Terbaru
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

      {/* 4. PERSONAL PASSIONS & FIELD EXPEDITIONS SPOTLIGHT (Guitar Portrait with Fallback) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-2xl glass-card border border-white/10 overflow-hidden glow-blue">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left: Contemplative Guitar Portrait Photo with Fallback */}
            <div className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] overflow-hidden bg-slate-950">
              {!guitarImageError ? (
                <img
                  src="1001627970-82AvF.jpg"
                  alt="Uncle Zein Contemplative Portrait"
                  className="w-full h-full object-cover object-center filter contrast-105 hover:scale-105 transition-transform duration-700"
                  onError={() => setGuitarImageError(true)}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-indigo-950 via-slate-900 to-black">
                  <div className="w-20 h-20 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-white">UZ</span>
                  </div>
                  <span className="text-xs font-mono-code text-blue-400">Contemplative Reflection</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-[#07090e] pointer-events-none" />
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[11px] font-mono-code font-bold bg-black/70 text-blue-400 px-3 py-1 rounded-md border border-blue-500/30 backdrop-blur-sm">
                  REFLECTION & FIELD NOTES
                </span>
              </div>
            </div>

            {/* Right: Personal Passions Narrative */}
            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
                  <Zap className="w-4 h-4" />
                  <span>WILDERNESS CRAFT & PASSIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                  Koneksi Jiwa, Tenaga, & Kendali Diri di Alam Bebas
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  "Menunggu di atas air atau melintasi savana bukan berarti membuang waktu; itu adalah saat di mana pikiranmu berhenti berbicara dan mulai menyimak alam."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <strong className="text-white block font-mono-code text-blue-400 mb-0.5">5 DISIPLIN:</strong>
                  Spearfishing, Eksplorasi, Berburu, Berkuda, Memancing.
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                  <strong className="text-white block font-mono-code text-blue-400 mb-0.5">PRINSIP:</strong>
                  Ketepatan, kesabaran, & kerendahan hati di hadapan semesta.
                </div>
              </div>

              <button
                onClick={() => onNavigate('about', '/about')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase transition-all shadow-md cursor-pointer"
              >
                <span>Lihat Jurnal Lapangan & 5 Passions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW I READ & CURRENT RESEARCH SECTION (2-Column Grid) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* How I Read Section */}
          <div className="lg:col-span-6 glass-card rounded-2xl p-8 sm:p-10 border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>02 // HOW I READ</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Metodologi Membaca & Kritik Hermeneutika
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                "Membaca bukan untuk mencari pembenaran atas apa yang sudah kita yakini, melainkan untuk membongkar fondasi rapuh yang kita sebut kenyamanan intelektual."
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono-code font-bold shrink-0">1</span>
                  <span><strong>Audit Naskah Primer:</strong> Telusuri manuskrip tertua dalam bahasa aslinya (Aram, Ibrani, Koine Greek, Arab).</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono-code font-bold shrink-0">2</span>
                  <span><strong>Pisahkan Teologi dari Bahasa:</strong> Jangan memasukkan doktrin ke dalam leksikon kata.</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-blue-600/20 text-blue-400 flex items-center justify-center font-mono-code font-bold shrink-0">3</span>
                  <span><strong>Uji Non-Kontradiksi Logika:</strong> Tolak argumen yang cacat logika formal.</span>
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
              <div className="flex items-center justify-between text-xs font-mono-code text-blue-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="font-bold">03 // CURRENT RESEARCH</span>
                </div>
                <span className="text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded bg-emerald-950/30">
                  Riset Aktif
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
                {RESEARCH_DATA.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {RESEARCH_DATA.leadThesis}
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span>Five Layers of Evidence:</span>
                  <span className="text-blue-400 font-bold">Layer 1 - 5 Terverifikasi</span>
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
              <span>Buka Laboratorium Riset Penuh</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. CONCEPT MAP / TAGS GRID */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-6">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
            04 // CONCEPT MAP
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Peta Konsep & Klaster Penyelidikan
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

      {/* 7. QUOTES & DAILY NOTES SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Quote */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-12 border border-white/10 space-y-4">
            <Quote className="w-10 h-10 text-blue-500/30" />
            <p className="text-xl sm:text-2xl font-bold text-white font-display italic leading-relaxed text-balance">
              "Jangan mencari pembenaran atas apa yang sudah kamu percaya. Carilah kebenaran, bahkan jika itu meruntuhkan seluruh gedung keyakinan yang kamu bangun selama ini."
            </p>
            <div className="pt-2 text-xs font-mono-code text-blue-400">
              — UNCLE ZEIN // FIELD NOTES 2026
            </div>
          </div>

          {/* Daily Note Preview */}
          <div className="lg:col-span-5 glass-card rounded-2xl p-8 border border-white/10 space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span className="text-blue-400 font-bold">NOTES & FIELD JOURNAL</span>
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
              <span>Baca Catatan Harian Lengkap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
