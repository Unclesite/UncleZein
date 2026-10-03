import React, { useState } from 'react';
import { Microscope, Layers, FileText, CheckCircle2, HelpCircle, AlertTriangle, ArrowRight, ShieldCheck, Database, Sliders } from 'lucide-react';
import { RESEARCH_DATA } from '../data/siteData';

export const ResearchLabSection: React.FC = () => {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'matrix' | 'sources' | 'hypotheses'>('matrix');

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
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest">
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

        {/* Active Project Highlight Banner */}
        <div className="glass-card rounded-2xl p-8 sm:p-10 border border-blue-500/30 relative overflow-hidden glow-blue space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              <span>PROYEK RISET AKTIF 2026</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-300">HISTORIOGRAFI TIMUR TENGAH</span>
            </div>
            <div className="text-xs font-mono-code text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-md bg-emerald-950/30">
              Status: {RESEARCH_DATA.status}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display leading-tight">
              {RESEARCH_DATA.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
              <strong>Tesis Utama:</strong> {RESEARCH_DATA.leadThesis}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-4xl">
              {RESEARCH_DATA.background}
            </p>
          </div>

          {/* Sub-nav switcher inside Lab */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                activeTab === 'matrix' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white bg-white/5'
              }`}
            >
              5 Layers of Evidence Visualizer
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
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

              {RESEARCH_DATA.fiveLayers.map((item, idx) => {
                const isSelected = selectedLayerIndex === idx;
                return (
                  <button
                    key={item.layer}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'glass-card-active border-blue-500 shadow-md'
                        : 'glass-card border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono-code font-bold px-2 py-0.5 rounded border ${getLayerColor(item.layer)}`}>
                          L{item.layer}
                        </span>
                        <span className="text-sm font-bold text-white">
                          {item.name.split(':')[1]?.trim() || item.name}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{item.level}</p>
                    </div>

                    <div className="text-right font-mono-code text-xs text-slate-300 tabular-nums">
                      {item.confidence}%
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Layer Detail & Evidence Application */}
            <div className="lg:col-span-7 glass-card p-8 rounded-2xl border border-white/10 space-y-6 glow-blue">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${getLayerColor(selectedLayer.layer)}`}>
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-display">
                      {selectedLayer.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono-code">
                      {selectedLayer.level}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono-code text-slate-400">Confidence Score</div>
                  <div className="text-xl font-bold font-mono-code text-blue-400 tabular-nums">
                    {selectedLayer.confidence}%
                  </div>
                </div>
              </div>

              {/* Theoretical Description */}
              <div className="space-y-2">
                <span className="text-xs font-mono-code text-blue-400 uppercase tracking-wider">
                  Definisi Metodologis
                </span>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedLayer.description}
                </p>
              </div>

              {/* Concrete Application in Isa / Jesus Project */}
              <div className="p-5 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 font-semibold uppercase">
                  <Microscope className="w-4 h-4" />
                  <span>Aplikasi Konkret Pada Riset Ini</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedLayer.applicationInProject}
                </p>
              </div>

              {/* Scientific Rigor Note */}
              <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono-code">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Seluruh analisis diverifikasi melalui naskah Greek LXX, Masoretik, dan fragmen Qumran.</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Primary Sources Manuscript Catalog */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div className="text-sm text-slate-300">
              Dokumen dan naskah primer yang menjadi rujukan langsung dalam proyek penelitian:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESEARCH_DATA.primarySources.map((source, index) => (
                <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                    <span className="text-blue-400 font-semibold">{source.language}</span>
                    <span className="text-slate-400">{source.period}</span>
                  </div>

                  <h4 className="text-base font-bold text-white font-display">
                    {source.name}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
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
