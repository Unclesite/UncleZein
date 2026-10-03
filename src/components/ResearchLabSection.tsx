import React, { useState } from 'react';
import { Microscope, Layers, FileText, CheckCircle2, HelpCircle, AlertTriangle, ArrowRight, ShieldCheck, Database, Sliders, Dna, BookOpen, Landmark, Sparkles } from 'lucide-react';
import { RESEARCH_DATA } from '../data/siteData';

export const ResearchLabSection: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'sources' | 'tridisciplinary'>('matrix');

  const selectedLayer = RESEARCH_DATA.fiveLayers[selectedLayerIndex];

  const getLayerColor = (layerNum: number) => {
    switch (layerNum) {
      case 1:
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 2:
        return 'text-blue-400 border-blue-500/40 bg-blue-500/10';
      case 3:
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
      case 4:
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 5:
        return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
      default:
        return 'text-blue-400 border-blue-500/40 bg-blue-500/10';
    }
  };

  return (
    <section id="research" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
            <span>03</span>
            <span aria-hidden="true">/</span>
            <span>OPEN RESEARCH LABORATORY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Laboratorium Riset Terbuka
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Metodologi ketat pembedahan data sejarah tanpa sensor. Mengklasifikasikan setiap argumen ke dalam <strong>Five Layers of Evidence</strong> untuk mencegah bias konfirmasi dan delusi doktrin.
          </p>
        </div>

        {/* Active Project Highlight Banner: Yesus / Isa Al Masih Punya Ayah Kandung? */}
        <div className="glass-card rounded-2xl p-8 sm:p-12 border border-blue-500/40 relative overflow-hidden glow-blue space-y-8 bg-gradient-to-br from-[#0c1428] via-[#070b14] to-black">
          {/* Status and Tag Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
              <span className="text-blue-400 font-bold uppercase tracking-wider">PROYEK RISET AKTIF</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 font-bold text-xs tracking-wider uppercase">
                {RESEARCH_DATA.disciplineTag || 'Biology × Qur’an × History'}
              </span>
            </div>
            <div className="text-xs font-mono-code text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-md bg-emerald-950/40 font-semibold">
              Status: {RESEARCH_DATA.status}
            </div>
          </div>

          {/* Title and Lead Synopsis */}
          <div className="space-y-4">
            <h3 className="text-3xl sm:text-5xl font-black text-white font-display leading-[1.15] tracking-tight">
              {RESEARCH_DATA.title}
            </h3>

            {RESEARCH_DATA.synopsis && (
              <p className="text-base sm:text-xl text-blue-200/90 font-display italic leading-relaxed border-l-2 border-blue-500 pl-4 py-1">
                "{RESEARCH_DATA.synopsis}"
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold">
                  <Dna className="w-4 h-4 text-emerald-400" />
                  <span>01. BIOLOGI REPRODUKSI</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Analisis genetika kromosom XY, hukum pewarisan biologis mamalia, serta batas-batas partenogenesis alami.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>02. TEKS AL-QUR'AN</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Pembedahan leksikografi ayat mutasyabihat, konsep *kalimah*, *ruh*, dan dialektika genealogis Maryam tanpa bias tafsir abad pertengahan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-bold">
                  <Landmark className="w-4 h-4 text-amber-400" />
                  <span>03. SEJARAH KUNO</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Audit manuskrip Kristen awal (Surat Paulus ~50 M), tradisi silsilah Daud melalui Yusuf, gulungan Qumran, dan kronologi Helenistik.
                </p>
              </div>
            </div>
          </div>

          {/* Sub-nav switcher inside Lab */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer font-mono-code ${
                activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              5 Layers of Evidence Visualizer
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer font-mono-code ${
                activeTab === 'sources' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              Katalog Manuskrip Primer
            </button>
          </div>
        </div>

        {/* Tab 1: 5 Layers of Evidence Visualizer */}
        {activeTab === 'matrix' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Layer Selector Stack */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider mb-2">
                Pilih Lapisan Bukti (Layer 1 - 5):
              </div>
              {RESEARCH_DATA.fiveLayers.map((layer, index) => {
                const isSelected = selectedLayerIndex === index;
                const colorClasses = getLayerColor(layer.layer);

                return (
                  <button
                    key={layer.layer}
                    onClick={() => setSelectedLayerIndex(index)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                        : 'border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono-code font-bold px-2 py-0.5 rounded border ${colorClasses}`}>
                          LAYER 0{layer.layer}
                        </span>
                        <span className="text-xs font-bold text-white font-display">
                          {layer.name.split(':')[1] || layer.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Confidence: <span className="text-slate-200 font-mono-code font-semibold">{layer.confidence}%</span>
                      </div>
                    </div>

                    <div className="w-16 h-2 rounded-full bg-black/40 border border-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${layer.confidence > 70 ? 'bg-blue-400' : layer.confidence > 40 ? 'bg-amber-400' : 'bg-rose-400'}`}
                        style={{ width: `${layer.confidence}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Layer Deep Dive Card */}
            <div className="lg:col-span-7 glass-card p-8 rounded-2xl border border-white/10 space-y-6 glow-blue">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className={`text-xs font-mono-code font-bold px-2.5 py-1 rounded-md border ${getLayerColor(selectedLayer.layer)}`}>
                    LAYER {selectedLayer.layer} // {selectedLayer.level}
                  </span>
                  <h4 className="text-xl font-bold text-white font-display mt-2">
                    {selectedLayer.name}
                  </h4>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black font-mono-code text-blue-400">
                    {selectedLayer.confidence}%
                  </div>
                  <div className="text-[10px] font-mono-code text-slate-400 uppercase">Tingkat Kepastian</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono-code text-slate-400 uppercase">Definisi Metodologis:</div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedLayer.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                  <div className="text-xs font-mono-code text-blue-400 font-bold uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Aplikasi Nyata Pada Proyek Riset Yesus / Isa:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {selectedLayer.applicationInProject}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Primary Sources Catalogue */}
        {activeTab === 'sources' && (
          <div className="space-y-4">
            <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Manuskrip Fisik & Sumber Primer yang Digunakan dalam Audit:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESEARCH_DATA.primarySources.map((source, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white font-display">
                      {source.name}
                    </h4>
                    <span className="text-[11px] font-mono-code text-blue-400 px-2 py-0.5 rounded bg-blue-950/40 border border-blue-500/30">
                      {source.language}
                    </span>
                  </div>
                  <div className="text-xs font-mono-code text-slate-400">
                    Periodisasi: <strong className="text-slate-200">{source.period}</strong>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2">
                    {source.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
