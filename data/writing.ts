export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'Engineering' | 'Tutorial' | 'Career';
  readTime: string;
  date: string;
  href: string;
  featured?: boolean;
}

export const articles: Article[] = [
  {
    id: "build-break",
    title: "Why I Build Things That Break",
    excerpt: "The best way to learn is to build something until it fails, then figure out why. Here's how I approach debugging as a learning tool and why intentional failure is essential for growth.",
    category: "Engineering",
    readTime: "5 min read",
    date: "Feb 2026",
    href: "https://medium.com/@shaiksuhaib360",
    featured: true
  },
  {
    id: "chrome-ext",
    title: "Building a Chrome Extension in 2025",
    excerpt: "From manifest V3 to publishing on the Chrome Web Store — a complete walkthrough of building the InfoBlend extension and lessons learned along the way.",
    category: "Tutorial",
    readTime: "8 min read",
    date: "Jan 2026",
    href: "https://medium.com/@shaiksuhaib360"
  },
  {
    id: "freelance-survival",
    title: "The Freelance Developer's Survival Guide",
    excerpt: "Lessons from navigating client projects, managing scopes, and handling the business side of code as a junior developer. Practical tips for staying sane and shipping.",
    category: "Career",
    readTime: "6 min read",
    date: "Dec 2025",
    href: "https://medium.com/@shaiksuhaib360"
  }
];
