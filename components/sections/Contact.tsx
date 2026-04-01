'use client';

import { useState } from 'react';
import { Mail, Github, Linkedin, Twitter, BookOpen, Send } from 'lucide-react';
import { useScrollReveal } from '@/lib/useScrollReveal';

const socials = [
  { icon: Github, href: 'https://github.com/RIxiV1', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/shaiksuhaib', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/suhaibX0', label: 'Twitter/X' },
  { icon: BookOpen, href: 'https://medium.com/@shaiksuhaib360', label: 'Medium' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const headerRef = useScrollReveal();
  const leftRef = useScrollReveal();
  const rightRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:shaiksuhaib360@gmail.com?subject=Portfolio inquiry from ${form.name}&body=${encodeURIComponent(form.message)}`;
    window.open(mailto);
    setSent(true);
  };

  return (
    <section id="contact" className="section-padding container-narrow">
      <div ref={headerRef} className="reveal-up flex flex-col mb-10">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500 mb-3">
          Say Hello
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Let's connect.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: info */}
        <div ref={leftRef} className="reveal-left lg:col-span-2 flex flex-col gap-6">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-white/5 text-white border border-white/10">
                <Mail className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                Email
              </span>
            </div>
            <a
              href="mailto:shaiksuhaib360@gmail.com"
              className="text-lg font-medium text-white hover:text-neutral-300 transition-colors"
            >
              shaiksuhaib360@gmail.com
            </a>
          </div>

          <div className="card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-5">
              Find me on
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl transition-colors hover:bg-white hover:text-black hover:border-white text-neutral-300"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div ref={rightRef} className="reveal-right lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="card p-8 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 outline-none transition-all placeholder:text-neutral-600 text-sm text-white focus:border-white/50"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 outline-none transition-all placeholder:text-neutral-600 text-sm text-white focus:border-white/50"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about your project or idea..."
                required
                className="w-full px-4 py-3.5 rounded-xl bg-black border border-white/10 outline-none transition-all resize-none placeholder:text-neutral-600 text-sm text-white focus:border-white/50"
              />
            </div>
            <button
              type="submit"
              className={`flex items-center justify-center gap-2 py-4 rounded-xl font-mono uppercase tracking-wider text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                sent ? 'bg-emerald-500 text-white' : 'bg-white text-black'
              }`}
            >
              <Send className="w-4 h-4" />
              {sent ? 'Message sent! 🎉' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
