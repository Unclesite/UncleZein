import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, Copy, Check, MessageSquare, Sparkles, Compass, ArrowUpRight } from 'lucide-react';
import { MEDIA_CHANNELS } from '../data/siteData';

type TopicType = 'Research' | 'Business' | 'Speaking' | 'Collaboration';

export const ContactSection: React.FC = () => {
  const [topic, setTopic] = useState<TopicType>('Research');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const topics: { id: TopicType; label: string; desc: string }[] = [
    { id: 'Research', label: 'Research', desc: 'Diskusi naskah kuno, biologi, filologi, & historiografi' },
    { id: 'Business', label: 'Business', desc: 'Penerbitan, kemitraan strategis, & proyek profesional' },
    { id: 'Speaking', label: 'Speaking', desc: 'Keynote dialog kritis, seminar, & lokakarya rasionalisme' },
    { id: 'Collaboration', label: 'Collaboration', desc: 'Ekspedisi alam liar, video esai, & proyek bersama' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@unclezein.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest font-bold">
            <span>GET IN TOUCH</span>
            <span aria-hidden="true">/</span>
            <span>UNCLE ZEIN</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-display">
            Contact<span className="text-blue-500">.</span>
          </h2>
          <div className="space-y-1">
            <p className="text-2xl sm:text-3xl font-bold text-white font-display">
              Want to talk?
            </p>
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              Research, business, speaking, collaboration, or simply a good conversation.
            </p>
          </div>
        </div>

        {/* Main Grid: Warm Persona Panel + Interactive Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Warm, Personal & Grounded Side Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6 glow-blue bg-gradient-to-br from-[#0c1428] via-[#070b14] to-black">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                  Pintu Terbuka untuk Percakapan yang Jujur
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  Entah kamu ingin mendiskusikan temuan riset, mengajukan koreksi atas naskah, menjajaki kemitraan bisnis, mengundang bicara, atau sekadar berbagi perspektif kritis — setiap pesan dibaca secara personal.
                </p>
              </div>

              {/* Direct Email Card with One-click Copy */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider">
                  Direct Inquiries / Email
                </div>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href="mailto:info@unclezein.com"
                    className="text-base font-bold text-white hover:text-blue-400 transition-colors font-mono-code"
                  >
                    info@unclezein.com
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-all border border-white/5 cursor-pointer text-xs flex items-center gap-1.5"
                    title="Salin Email"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] text-emerald-400 font-mono-code">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-mono-code hidden sm:inline">Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Grounded Note on Response Time */}
              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-1 text-xs text-slate-300">
                <div className="font-bold text-blue-300 font-mono-code">CATATAN WAKTU RESPON:</div>
                <p className="font-light leading-relaxed">
                  Pesan biasanya direspons dalam 1–2 hari kerja. Jika sedang melakukan observasi lapangan atau berada di laut tanpa sinyal, mohon bersabar sejenak.
                </p>
              </div>

              {/* Social Channels */}
              <div className="pt-2 border-t border-white/10 space-y-3">
                <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
                  Social Touchpoints
                </div>
                <div className="flex flex-wrap gap-2">
                  {MEDIA_CHANNELS.map((ch) => (
                    <a
                      key={ch.name}
                      href={ch.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 font-mono-code"
                    >
                      <span>{ch.name.split(' ')[0]}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Elegant Contact Form */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-12 rounded-3xl border border-white/10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Pesan Berhasil Terkirim
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed font-light">
                    Terima kasih, <strong className="text-white font-semibold">{name}</strong>. Pesan mengenai kategori <strong className="text-blue-400 font-semibold">{topic}</strong> telah masuk ke korespondensi Uncle Zein.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono-code font-bold uppercase text-slate-200 border border-white/10 transition-colors cursor-pointer"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-7">
                {/* 1. What's this about? Topic Selector */}
                <div className="space-y-3">
                  <label className="block text-xs font-mono-code text-blue-400 uppercase tracking-wider font-bold">
                    What's this about
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {topics.map((t) => {
                      const isSelected = topic === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setTopic(t.id)}
                          className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                            isSelected
                              ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] font-bold'
                              : 'bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="text-xs font-mono-code">{t.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-code text-slate-300 uppercase tracking-wider font-semibold">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono-code text-slate-300 uppercase tracking-wider font-semibold">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                    />
                  </div>
                </div>

                {/* 3. Subject */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-code text-slate-300 uppercase tracking-wider font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What would you like to discuss?"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-sans"
                  />
                </div>

                {/* 4. Message */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-code text-slate-300 uppercase tracking-wider font-semibold">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message…"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-y font-sans leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono-code font-bold uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending message…</span>
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
