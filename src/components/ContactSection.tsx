import React, { useState } from 'react';
import { Send, CheckCircle2, Mail, MessageSquare, Shield, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [topic, setTopic] = useState<'Research' | 'Business' | 'Speaking' | 'Collaboration'>('Research');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-blue-400 uppercase tracking-widest">
            <span>06</span>
            <span aria-hidden="true">/</span>
            <span>CONTACT & DISPATCH DESK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display text-balance">
            Ruang Korespondensi & Kolaborasi
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
            Kirimkan pertanyaan riset, proposal diskusi ilmiah, penerbitan buku, atau undangan ekspedisi independen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card p-8 rounded-2xl border border-white/10 space-y-6 glow-blue">
              <h3 className="text-xl font-bold text-white font-display">
                Protokol Korespondensi
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Untuk menjaga efisiensi riset dan waktu penulisan monograf, seluruh pesan disaring secara teliti. Pesan yang disertai data, argumen terstruktur, atau rujukan manuskrip spesifik akan diprioritaskan.
              </p>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono-code text-slate-400">Direct Inquiries</div>
                    <div className="text-sm font-semibold text-white">desk@unclezein.com</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono-code text-slate-400">Enkripsi & Privasi</div>
                    <div className="text-xs text-slate-300">Data dan identitas penanya dirahasiakan penuh.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Form */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-10 rounded-2xl border border-white/10">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Pesan Berhasil Terkirim
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Terima kasih, <strong>{fullName}</strong>. Pesan dengan topik <strong>{topic}</strong> telah masuk ke meja telaah Uncle Zein. Kami akan merespons dalam 1-3 hari kerja.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 border border-white/10 transition-colors"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Topic Selector Segmented Controls */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono-code text-slate-300 uppercase">
                    Pilih Kategori Kepentingan:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'Research', label: 'Riset & Naskah' },
                      { id: 'Business', label: 'Penerbitan' },
                      { id: 'Speaking', label: 'Keynote Talk' },
                      { id: 'Collaboration', label: 'Ekspedisi' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTopic(item.id as typeof topic)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all text-center cursor-pointer ${
                          topic === item.id
                            ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                            : 'bg-black/30 border-white/10 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono-code text-slate-300 uppercase">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Dr. Salman / Adrian"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-mono-code text-slate-300 uppercase">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. name@example.com"
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono-code text-slate-300 uppercase">
                    Isi Pesan / Argumen / Kerjasama
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Sampaikan rujukan pertanyaan, naskah yang ingin didiskusikan, atau maksud kerjasama..."
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Mengirimkan Enkripsi...</span>
                  ) : (
                    <>
                      <span>Kirim ke Meja Riset</span>
                      <Send className="w-4 h-4" />
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
