'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side: Info */}
        <div className="flex flex-col">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-primary font-mono text-sm uppercase tracking-widest mb-4"
          >
            Connection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Let's build <br /> something <span className="text-primary">great</span>.
          </motion.h2>
          <p className="text-muted text-lg max-w-lg mb-12">
            I'm currently looking for new opportunities and interesting projects to collaborate on. If you have a question or just want to say hi, my inbox is always open.
          </p>

          <div className="flex flex-col gap-6">
            <a href="mailto:hello@example.com" className="flex items-center gap-4 group">
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-mono text-muted uppercase tracking-wider">Email Me</p>
                <p className="text-lg font-medium">hello@example.com</p>
              </div>
            </a>
            
            <div className="flex gap-4 mt-6">
              {[
                { icon: Github, link: "https://github.com/RIxiV1" },
                { icon: Linkedin, link: "https://www.linkedin.com/in/shaiksuhaib" },
                { icon: Twitter, link: "https://x.com/suhaibX0" },
                { icon: MessageSquare, link: "#" },
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.link} 
                  className="p-4 glass rounded-2xl hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all hover:-translate-y-1"
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass p-10 rounded-[2.5rem]"
        >
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-muted uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono text-muted uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-muted uppercase tracking-widest">Subject</label>
              <input 
                type="text" 
                placeholder="Project Inquiry"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-muted uppercase tracking-widest">Message</label>
              <textarea 
                rows={5}
                placeholder="Tell me about your project..."
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              />
            </div>
            <button className="w-full py-4 bg-primary text-black font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
