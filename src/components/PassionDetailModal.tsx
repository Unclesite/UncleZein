import React, { useState } from 'react';
import { X, Compass, MapPin, Target, Zap, Anchor, Volume2, VolumeX, Shield, Sparkles, Check, Camera } from 'lucide-react';
import { Passion } from '../data/siteData';
import { soundscape } from '../utils/audioSynth';

interface PassionDetailModalProps {
  passion: Passion | null;
  onClose: () => void;
}

export const PassionDetailModal: React.FC<PassionDetailModalProps> = ({ passion, onClose }) => {
  const [isPlayingAmbiance, setIsPlayingAmbiance] = useState(false);

  if (!passion) return null;

  const toggleSound = () => {
    if (isPlayingAmbiance) {
      soundscape.stop();
      setIsPlayingAmbiance(false);
    } else {
      soundscape.play(passion.ambientType);
      setIsPlayingAmbiance(true);
    }
  };

  const handleClose = () => {
    if (isPlayingAmbiance) {
      soundscape.stop();
      setIsPlayingAmbiance(false);
    }
    onClose();
  };

  const getIcon = (iconName: string) => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-card rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-[#090c13] flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#07090e]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400">
            <div className="p-1 rounded-md bg-blue-600/20 text-blue-400">
              {getIcon(passion.iconName)}
            </div>
            <span>WILDERNESS CRAFT & PASSION DISCIPLINE</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                isPlayingAmbiance
                  ? 'bg-blue-600/20 text-blue-300 border-blue-500 shadow-sm'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {isPlayingAmbiance ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  <span>Ambiance Aktif ({passion.ambientType})</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Putar Suara Alam ({passion.ambientType})</span>
                </>
              )}
            </button>

            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8">
          {/* Authentic Photograph if available */}
          {passion.imageSrc && (
            <div className="rounded-2xl overflow-hidden border border-white/15 relative aspect-[16/10] sm:aspect-[21/9] bg-slate-950 shadow-2xl">
              <img
                src={passion.imageSrc}
                alt={passion.title}
                className="w-full h-full object-cover object-top filter contrast-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono-code text-slate-200">
                <span className="bg-black/60 px-2.5 py-1 rounded-md border border-white/10 backdrop-blur-sm flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  <span>DOKUMENTASI LAPANGAN // UNCLE ZEIN</span>
                </span>
                <span className="text-blue-300 font-semibold">{passion.title}</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="space-y-3">
            <span className="text-xs font-mono-code text-blue-400 uppercase tracking-widest">
              {passion.subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              {passion.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {passion.description}
            </p>
          </div>

          {/* Quote Block */}
          <div className="p-6 rounded-2xl bg-blue-950/20 border border-blue-500/20">
            <p className="text-base text-blue-200 font-serif-title italic leading-relaxed">
              "{passion.quote}"
            </p>
          </div>

          {/* Field Journal */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Fragmen Catatan Lapangan (Field Journal)</span>
            </h4>
            <div className="p-6 rounded-2xl glass-card border border-white/10 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {passion.fieldJournal}
            </div>
          </div>

          {/* 2-Column: Elements & Gear List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Core Elements */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <h5 className="text-xs font-mono-code text-blue-400 uppercase tracking-wider">
                Prinsip Latihan Mental
              </h5>
              <div className="space-y-2">
                {passion.elements.map((elem, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{elem}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gear List */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <h5 className="text-xs font-mono-code text-blue-400 uppercase tracking-wider">
                Peralatan Lapangan (Field Kit)
              </h5>
              <div className="space-y-2">
                {passion.gearList.map((gear, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{gear}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono-code text-slate-400">
              Dokumentasi Otentik Uncle Zein
            </span>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Tutup Pratinjau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
