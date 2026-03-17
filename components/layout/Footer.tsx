'use client';

import { Github, Linkedin, Twitter, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[var(--muted)]">
          Built by <span className="text-white font-medium">Suhaib</span> · Designed with care · {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4">
          {[
            { href: 'https://github.com/RIxiV1', icon: Github },
            { href: 'https://www.linkedin.com/in/shaiksuhaib', icon: Linkedin },
            { href: 'https://x.com/suhaibX0', icon: Twitter },
            { href: 'https://medium.com/@shaiksuhaib360', icon: BookOpen },
          ].map(({ href, icon: Icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer"
              className="text-[var(--muted)] hover:text-white transition-colors">
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
