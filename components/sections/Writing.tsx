'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { articles, Article } from '@/data/writing';

const categoryColors = {
  Engineering: {
    color: 'var(--primary)',
    bg: 'rgba(37, 106, 244, 0.1)',
    border: 'rgba(37, 106, 244, 0.2)'
  },
  Tutorial: {
    color: 'var(--accent)',
    bg: 'rgba(139, 92, 246, 0.1)',
    border: 'rgba(139, 92, 246, 0.2)'
  },
  Career: {
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    border: 'rgba(245, 158, 11, 0.2)'
  }
};

function WritingCard({ article, featured }: { article: Article; featured?: boolean }) {
  const colors = categoryColors[article.category];

  return (
    <motion.a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.01, y: -4 }}
      transition={{ duration: 0.2 }}
      className={`group relative glass glass-hover rounded-3xl p-8 flex flex-col h-full overflow-hidden ${
        featured ? 'lg:p-10' : 'p-6'
      }`}
    >
      {/* Decorative top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 opacity-60 transition-opacity group-hover:opacity-100"
        style={{ 
          background: featured 
            ? 'linear-gradient(90deg, var(--primary), var(--accent))' 
            : colors.color 
        }} 
      />

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span 
          className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border"
          style={{ 
            color: colors.color, 
            backgroundColor: colors.bg, 
            borderColor: colors.border 
          }}
        >
          {article.category}
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">
          <Clock className="w-3 h-3" />
          {article.readTime}
        </div>
      </div>

      <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-bold mb-4 group-hover:text-[var(--primary)] transition-colors leading-tight`}>
        {article.title}
      </h3>

      <p className={`text-[var(--muted)] leading-relaxed mb-8 flex-grow ${featured ? 'text-base' : 'text-sm'}`}>
        {article.excerpt}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[var(--muted)]">
          <Calendar className="w-3 h-3" />
          {article.date}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary)]">
          READ ARTICLE
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.a>
  );
}

export default function Writing() {
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const otherArticles = articles.filter(a => a.id !== featuredArticle.id);

  return (
    <section id="writing" className="section-padding container-narrow relative">
       {/* Background orbs - matching Hero/About style */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,var(--primary-glow),transparent)] opacity-[0.05] pointer-events-none rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col mb-14"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)] mb-3 flex items-center gap-2">
          <BookOpen className="w-3 h-3" />
          Thoughts
        </span>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient">
          What I write.
        </h2>
        <p className="mt-4 text-[var(--muted)] max-w-xl">
          Essays, tutorials, and rants from the browser console. Sharing what I learn while building and breaking things.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured - Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <WritingCard article={featuredArticle} featured />
        </motion.div>

        {/* Stacked - Right */}
        <div className="flex flex-col gap-6">
          {otherArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex-1"
            >
              <WritingCard article={article} />
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-end mt-2"
          >
            <a 
              href="https://medium.com/@shaiksuhaib360" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
            >
              View all writing
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
