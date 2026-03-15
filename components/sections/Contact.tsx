'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, BookOpen, Send } from 'lucide-react';

const socials = [
  { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shaiksuhaib', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/suhaibX0', label: 'Twitter/X' },
  { icon: BookOpen, href: 'https://medium.com/@shaiksuhaib360', label: 'Medium' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:shaiksuhaib360@gmail.com?subject=Portfolio inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`;
    window.open(mailto);
    setSent(true);
  };

  return (
    <section id="contact" className="section-padding container-narrow">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col mb-14"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3">Say Hello</span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">Let's connect.</h2>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 flex flex-col gap-6"
        >
          <div className="glass rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl" style={{ background: 'rgba(37,106,244,0.15)', color: 'var(--primary)' }}>
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">Email</span>
            </div>
            <a href="mailto:shaiksuhaib360@gmail.com"
              className="text-lg font-medium hover:text-[var(--primary)] transition-colors">
              shaiksuhaib360@gmail.com
            </a>
          </div>

          <div className="glass rounded-3xl p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-5">Find me on</p>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 glass glass-hover rounded-xl transition-all hover:text-[var(--primary)]"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3"
        >
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-transparent border outline-none transition-all placeholder:text-[var(--muted)] text-sm"
                  style={{ borderColor: 'var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-transparent border outline-none transition-all placeholder:text-[var(--muted)] text-sm"
                  style={{ borderColor: 'var(--border)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your project or idea..."
                required
                className="w-full px-4 py-3.5 rounded-xl bg-transparent border outline-none transition-all resize-none placeholder:text-[var(--muted)] text-sm"
                style={{ borderColor: 'var(--border)' }}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: sent ? '#10b981' : 'var(--primary)', color: '#fff', boxShadow: '0 0 30px var(--primary-glow)' }}
            >
              <Send className="w-4 h-4" />
              {sent ? 'Message sent! 🎉' : 'Send Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
