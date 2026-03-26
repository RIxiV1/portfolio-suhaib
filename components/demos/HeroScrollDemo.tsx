"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden bg-black py-20">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col gap-4">
             <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-mono text-sm uppercase tracking-[0.3em]"
            >
              Excellence in Craft
            </motion.span>
            <h1 className="text-5xl md:text-[5rem] lg:text-[7rem] font-bold tracking-tighter leading-[0.9] text-white">
              The Art of <br />
              <span className="text-gradient">Digital Motion</span>
            </h1>
          </div>
        }
      >
        <div className="relative h-full w-full group">
          <Image
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3544&auto=format&fit=crop"
            alt="hero"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
          
          <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end backdrop-blur-md bg-white/5 p-6 rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            <div>
               <h3 className="text-xl font-bold text-white">Project Zero</h3>
               <p className="text-sm text-white/60">Full-stack Cloud Infrastructure</p>
            </div>
            <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors">
              Explore
            </button>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
