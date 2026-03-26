"use client";

import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'PRODUCT', href: '#' },
    { label: 'STORE', href: '#' },
    { label: 'ABOUT US', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <div className="w-full bg-black">
      <MinimalistHero
        logoText="mnmlst."
        navLinks={navLinks}
        mainText="The beauty of simplicity is that it allows the core essence of a product to shine. We focus on what truly matters."
        readMoreLink="#"
        imageSrc="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
        imageAlt="Minimalist fashion portrait"
        overlayText={{
          part1: 'less is',
          part2: 'more.',
        }}
        socialLinks={socialLinks}
        locationText="Arlington Heights, IL"
      />
    </div>
  );
};

export default MinimalistHeroDemo;
