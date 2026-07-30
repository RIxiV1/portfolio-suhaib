import { Github, Linkedin } from 'lucide-react'
import { Medium } from '@/components/ui/medium-icon'

export const siteConfig = {
  name: 'Shaik Mohammed Suhaib',
  role: 'Software engineer',
  focus: 'Full-stack · AI products · n8n automation',
  location: 'Chennai, India',
  email: 'shaiksuhaib360@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shaikuhaibdev.vercel.app',
  status: 'Open to internships & freelance',

  resumeUrl: '/Shaik_Mohammed_Suhaib_Resume.pdf',

  bio: [
    "I'm 20, studying IT at Vel Tech in Chennai. I mostly build things because something annoyed me and I wanted it to stop.",
    "Outside that I'm reading about space, tinkering with browser extensions, or losing at Souls games.",
  ],

  socials: [
    {
      icon: Github,
      href: 'https://github.com/RIxiV1',
      label: 'GitHub',
      handle: '@RIxiV1',
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/shaiksuhaib',
      label: 'LinkedIn',
      handle: 'in/shaiksuhaib',
    },
    {
      icon: Medium,
      href: 'https://medium.com/@shaiksuhaib360',
      label: 'Medium',
      handle: '@shaiksuhaib360',
    },
  ],

  navLinks: [
    { name: 'Work', href: '#work' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ],

  projects: [
    {
      title: 'Caliber',
      year: '2026',
      slug: 'caliber',
      description:
        'First-pass resume screening, handed to a model — upload a resume and a job description, get a scored verdict with the reasons, and review everyone in a live HR dashboard. It started on a course as an n8n flow; I rebuilt it as a self-contained full-stack app I actually own.',
      tech: [
        'React',
        'Supabase',
        'Postgres + RLS',
        'Edge Functions',
        'Gemini',
        'Evals',
      ],
      href: 'https://github.com/RIxiV1/CVibe',
      liveUrl: 'https://cvibe.lovable.app',
      accent: '#b0803f', // brass
      image: '/projects/caliber.png',
      metric: 'Cohen’s κ 0.87 on a 12-resume eval',
      caseStudy: {
        tagline:
          'Upload a resume and a job description; get a structured verdict — score, strengths, gaps, next steps — and review every candidate live in an HR dashboard. Self-contained: no n8n, no webhook, and an eval set that checks the model is actually right.',
        problem:
          "The first pass of screening is the same three checks every time — skills, years, does the resume even match the role. It's mechanical, exactly the kind of thing worth handing to a model. My first version was an n8n flow behind a form, built on a course. It worked, but a hosted webhook that expires isn't something I could stand behind — so I rebuilt it as one app I own end to end.",
        approach:
          'React + Vite on the front, everything else in Supabase. The public form calls one edge function that rate-limits by IP, runs a honeypot and input checks, extracts the real text from the PDF (unpdf), scores it against the JD with Gemini through a fixed tool-call schema, and writes the candidate row itself with the service role — so a screening is never lost even if the browser drops. Postgres streams new rows straight to a realtime HR dashboard. Sending the interview or rejection email is a separate, authenticated step: a human decides after seeing the score, it never fires on its own.',
        decisions: [
          {
            title: 'Killed the n8n dependency',
            body: 'The course version leaned on a hosted n8n webhook. The moment it expired the whole thing was dead, and I couldn’t hand anyone a link that might not resolve. Rebuilding it self-contained — edge function plus Postgres — was more work up front and nothing to expire later. The old workflow JSON is still in the repo; the running product doesn’t need it.',
          },
          {
            title: 'The security is the actual product',
            body: 'Anyone can hit a public form, so nothing public is trusted. The anon key can’t write candidate rows at all — only the edge function inserts, after validation and rate limiting. Row Level Security makes candidate data HR-admin-only, resumes sit in a private bucket opened through short-lived signed URLs, and the first sign-in claims admin while every later one is a no-op. It’s a demo, but it’s built like it holds real people’s resumes — and where a corner is cut (the rate limiter is in-memory, so per-instance rather than a hard global cap) it’s written down in the README, not hidden.',
          },
          {
            title: 'Built an eval instead of trusting the vibe',
            body: '“The AI seems good” isn’t a metric, so there’s a labelled set — twelve resumes against one JD, balanced across interview / hold / reject — scored on verdict agreement, Cohen’s kappa, and score separation. Two things matter more than the headline. First, the errors land the safe way: Reject recall and precision are both 100%, so nobody was wrongly filtered out — the single miss is a false positive, a wasted interview slot, not a person lost. Second, the sharper finding: two “hold” candidates scored identically at 75, but the model interviewed the one with *less* experience — it held the JD’s three-year bar against one and waived it for the other. So the verdict isn’t a stable function of the score; the boundary wobbles. The fix is to derive the verdict from the score with a fixed threshold instead of letting the model choose both.',
          },
        ],
        outcome:
          'Live and self-contained at cvibe.lovable.app — React + Supabase (edge functions, Postgres, RLS, realtime, private storage), Gemini scoring behind a tool-call schema, and human-in-the-loop email via Resend. On the twelve-resume eval it agrees with my labels on 11 (Cohen’s kappa 0.87) and separates the score bands cleanly (interview 92 / hold 65 / reject 25); every model rationale is in eval/results.md. It’s small, synthetic, and labelled by one person — a single flip swings it eight points — so I read 91.7% as an optimistic ceiling, not a promise.',
      },
    },
    {
      title: 'InfoBlend',
      year: '2026',
      slug: 'infoblend',
      hook: 'The best call I made on InfoBlend was killing a feature I loved.',
      description:
        'I was reading with four extensions open and got tired of it, so I built one. Define a word, translate a line, summarise a page — and it still works if you never add an API key. Chrome, Edge, Firefox.',
      tech: ['Manifest V3', 'Shadow DOM', 'JavaScript', 'Zero deps', 'BYOK AI'],
      href: 'https://github.com/RIxiV1/InfoBlend',
      liveUrl: 'https://addons.mozilla.org/en-US/firefox/addon/infoblend/',
      accent: '#59624b', // olive
      image: '/projects/infoblend.png',
      imagePosition: 'center',
      metric: 'Published on Firefox Add-ons · 17 languages',
      caseStudy: {
        tagline:
          'A reading toolkit I built for myself — define, translate, summarise, save. Works without an API key, better with one. Published on Firefox Add-ons; source is on GitHub.',
        problem:
          'My reading setup was four extensions — dictionary, translator, summariser, flashcards. Half of them inject CSS that breaks on Medium and news sites. The other half demand an API key on first launch and just die at the install screen if you don\'t have one. Nobody treated "no key" as a real path, so the free version was always the worst version. I wanted one tool that didn\'t do either.',
        approach:
          "One extension, no runtime dependencies, Chrome + Edge + Firefox. Definitions try six sources in order until one resolves. Summarising runs offline; translation uses your AI key if you've set one, or a free tier if you haven't. Everything you save lands in a local vault you can export. The whole thing had to survive the MV3 service worker, which found new ways to bite the entire build — stale callbacks, sendResponse races, the audio context dying whenever the worker went to sleep.",
        decisions: [
          {
            title: 'BYOK, but the free path has to actually work',
            body: "Most AI extensions demand a key on first launch and die at the install screen if you don't have one. That always felt backwards. InfoBlend works completely without a key — offline summariser, the six-source dictionary, free-tier translation. The key only buys the smarter stuff. You opt in once you know what it's for, not before.",
          },
          {
            title: 'Shadow DOM, after normal CSS lost',
            body: "I tried injecting a normal styled div first. It broke on too many sites — the page's own CSS reached in and wrecked the overlay. Shadow DOM was the boring fix that actually worked: a real style boundary both ways, so the page can't touch the extension and the extension can't leak onto the page. The focus and slot handling took a while to get right, but it held everywhere I shipped it.",
          },
          {
            title: 'Built "Chat with the Page", then killed it',
            body: 'Spent a few days on it and ripped it out right before the v3.1.1 ship. It needed an API key, was single-turn, and didn\'t earn its place next to the simpler Define and Summarise flows. Two commits three days apart: "deepen Chat with the Page" → "rip out Chat with the Page". Bruised the ego, saved the time.',
          },
        ],
        outcome:
          'Published on Firefox Add-ons (MIT, zero-dependency), installable from source on Chrome, Edge, and Brave. 17 translation languages, six-source definitions, a 500-item local vault, and a full no-API-key path — the optional AI key is stored AES-GCM-encrypted, on-device.',
      },
    },
    {
      title: 'SubSentry',
      year: '2025',
      slug: 'subsentry',
      description:
        "A subscription tracker that never asks for your bank login — I didn't want to hand mine over, so it doesn't ask for yours. It also celebrates when you cancel something instead of nagging you about it.",
      tech: [
        'React',
        'Vite',
        'TypeScript',
        'Supabase',
        'Tailwind',
        'Zod',
        'shadcn/ui',
      ],
      href: 'https://github.com/RIxiV1/SubSentry',
      liveUrl: 'https://ssubsentry.lovable.app',
      accent: '#a45a3a', // rust
      image: '/projects/subsentry.png',
      metric: 'Live · per-user RLS isolation',
      caseStudy: {
        tagline:
          'A subscription tracker that never asks for your bank login. Per-user isolation in the database, warm copy instead of scolding, and a confetti burst every time you cancel a sub.',
        problem:
          "The trackers everyone uses — Rocket Money, Truebill — want bank access so they can scrape your transactions. That's a big ask for what's really just a \"remember what I'm paying for\" tool. And the manual ones feel like they're scolding you: red bars, budget warnings, copy that reads like your bank statement is yelling. I wanted the version that does neither — no bank login, and a tone that doesn't make you feel bad for opening it.",
        approach:
          'I scaffolded the first version in Lovable to get moving, then went back and hardened the parts that actually matter — the auth flow and the data model. React + Vite on Supabase Postgres. Row Level Security keeps each user\'s rows isolated in the database — it\'s the standard Supabase pattern, but you still have to build the schema around it for it to mean anything. Forms validate with Zod. After that, most of my time went into tone: warm palette, encouraging copy, swipe gestures on mobile, and a confetti burst plus a "you just saved money" toast every time you cancel a sub.',
        decisions: [
          {
            title: 'Tone is the feature, not a polish pass',
            body: "The hard part of a money app isn't the math — it's getting someone to feel okay opening it. Red bars and warnings don't make people pay attention; they make people close the tab. So the warm copy and the confetti weren't decoration, they were the plan. Two of my early commits are literally \"Amplify Gen Z Vibe\" — the tone work is right there in the history.",
          },
          {
            title: 'Isolation in the database, not the app',
            body: "App-layer checks fail open the second you forget a `WHERE user_id = ?` on one endpoint. RLS is the pattern Supabase recommends anyway — the call was just to actually lean on it instead of scattering checks through the app, so even a buggy query physically can't return another person's rows. Cheap if you build the schema around it from the start.",
          },
          {
            title: 'No bank linking, ever',
            body: "Plaid-style aggregators are a huge privacy ask for a small convenience win. The person worth building for is the one who'd rather just type their subs in than hand bank credentials to an app they've never heard of. Saying no to the \"industry-standard\" feature is the whole point — it's what keeps every other privacy claim honest.",
          },
        ],
        outcome:
          'Live at ssubsentry.lovable.app. Solo build over about three weeks (Nov 11 – Dec 4, 2025), 20-odd commits. Auth, add/edit/delete subs, budgets with caps, spending by category, swipe gestures on mobile, and the confetti moment all work.',
      },
    },
  ],

  experience: [
    {
      role: 'Product & Development Intern',
      org: 'ForMen Digital Clinic — Remote',
      period: 'Mar 2026 — Jul 2026',
      description:
        "Built an AI tool that reads a men's-health blood report and explains it in plain English — so someone can open it, see what's going on, and not panic. Did it end to end: research, PRD, UI, and the build.",
    },
    {
      role: 'Certificate Program — Product Management & Agentic AI',
      org: 'IIT Patna × Masai (Vishlesan i-Hub Foundation) — Online / Hybrid',
      period: 'Apr 2025 — Oct 2025',
      description:
        'Six months on the full product loop — research, scoping an MVP, shipping, iterating. The hands-on part was building the agent workflows in n8n + LLMs.',
    },
    {
      role: 'NPTEL Elite Certification — Big Data Computing',
      org: 'SWAYAM–NPTEL · IIT Kanpur — Online',
      period: 'Completed Oct 2025',
      description:
        'Elite-track NPTEL course on distributed processing, Hadoop, and large-scale data systems.',
    },
  ],

  education: {
    degree: 'B.Tech, Information Technology',
    school: 'Vel Tech High Tech Engineering College, Chennai',
    period: 'Jun 2024 — May 2028 (Expected)',
  },

  metadata: {
    description:
      'I like building software that takes something confusing and makes it make sense — most recently an AI tool at ForMen Digital Clinic that explains blood reports in plain English.',
  },
}
