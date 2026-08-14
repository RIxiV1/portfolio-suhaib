import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { siteConfig } from '@/data/site'
import FadeUp from '@/components/ui/fade-up-loader'
import { Stagger, StaggerItem } from '@/components/ui/reveal-loader'
import MagneticLink from '@/components/ui/magnetic-link-loader'
import { FeaturedProject, ProjectsList } from '@/components/ui/work-stack-link'
import ContactFormLoader from '@/components/ui/contact-form-loader'
import { Signature } from '@/components/ui/signature'

// Script face for the hand-written sign-off in About.
const signatureFont = Dancing_Script({ subsets: ['latin'], weight: '600' })

const sectionHeading =
  'font-display text-3xl font-semibold tracking-tight md:text-4xl'
const sectionIntro = 'max-w-xl leading-relaxed text-muted-foreground'

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="eyebrow text-accent">{index}</span>
      <span className="h-px w-8 bg-border" aria-hidden="true" />
      <span className="eyebrow text-muted-foreground">{label}</span>
    </div>
  )
}

function SectionAction({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex shrink-0 items-center gap-1 whitespace-nowrap pb-1 text-sm text-muted-foreground transition-colors hover:text-accent"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  )
}

const GITHUB_URL = 'https://github.com/RIxiV1'
const MEDIUM_URL = 'https://medium.com/@shaiksuhaib360'

// Feature the published product (InfoBlend); then the two strongest builds.
const PROJECT_ORDER = ['infoblend', 'caliber', 'subsentry']
const orderedProjects = [...siteConfig.projects].sort(
  (a, b) => PROJECT_ORDER.indexOf(a.slug) - PROJECT_ORDER.indexOf(b.slug),
)

export default function Page() {
  return (
    <main id="main" tabIndex={-1} className="relative outline-none">
      {/* HERO */}
      <section
        id="home"
        className="relative isolate mx-auto min-h-screen max-w-[1500px] overflow-hidden px-5 pb-10 pt-24 md:px-8 xl:px-10"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(119,133,255,0.12),transparent_42%)]" />
        <div className="hero-ambient pointer-events-none absolute inset-x-0 top-0 h-[68vh] opacity-75" />
        <div className="pointer-events-none absolute inset-x-[18%] top-24 h-48 rounded-full bg-[radial-gradient(circle,rgba(141,118,255,0.12),transparent_72%)] blur-3xl" />

        <div className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-[660px] px-2 pt-4 md:pt-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--hero-panel-border)] bg-[color:var(--hero-shell)] px-3 py-1.5 text-[10px] tracking-[0.12em] text-[color:var(--hero-soft)] uppercase backdrop-blur-sm">
              <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--hero-primary)] shadow-[0_0_12px_rgba(141,118,255,0.9)]" />
              Available for Internships
            </div>

            <p className="mt-7 text-[12px] font-medium uppercase tracking-[0.2em] text-[color:var(--hero-muted)]">
              {'// hey, i\'m'}
            </p>

            <h1 className="mt-4 leading-[0.7] tracking-[-0.09em] text-[color:var(--hero-text)]">
              <span className="block text-[clamp(4.0rem,6.8vw,10.2rem)] font-semibold">
                Shaik
              </span>
              <span className="block text-[clamp(4.0rem,6.8vw,10.2rem)] font-semibold">
                Suhaib<span className="text-[color:var(--hero-primary)]">.</span>
              </span>
            </h1>

            <p className="mt-8 max-w-[560px] text-[clamp(1.5rem,2vw,2.2rem)] leading-[1.08] tracking-[-0.05em] text-[color:var(--hero-muted)]">
              Early in the journey — a software engineer building AI tools that
              make complicated things feel simple.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticLink
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--hero-primary)] to-[color:var(--hero-primary-strong)] px-5 py-2.75 text-[14px] font-medium text-[#0a0d16] shadow-[0_0_26px_rgba(112,128,255,0.3)] transition-transform duration-300 hover:translate-y-[-1px]"
              >
                View Work
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticLink>

              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--hero-panel-border)] bg-[color:var(--hero-shell)] px-5 py-2.75 text-[14px] font-medium text-[color:var(--hero-text)] transition-colors hover:border-[color:var(--hero-primary)] hover:bg-[color:var(--hero-panel)]"
              >
                Résumé
              </a>

              <div className="ml-1 flex items-center gap-4 border-l border-[color:var(--hero-panel-border)] pl-4 text-[color:var(--hero-muted)]">
                {siteConfig.socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="transition-colors hover:text-[color:var(--hero-text)]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-panel relative hidden h-[min(72vw,720px)] w-full max-w-[760px] rounded-[32px] lg:block">
            <div className="absolute inset-0 rounded-[32px] border border-[color:var(--hero-panel-border)] bg-[color:var(--hero-panel)] shadow-[0_30px_90px_rgba(10,13,22,0.12)]" />
            <div className="absolute inset-[18px] rounded-[24px] border border-[color:var(--hero-panel-border)] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_58%)]" />
            <div className="hero-grid absolute inset-[20px] rounded-[22px] opacity-85" />
            <div className="absolute left-10 top-8 text-[10px] font-medium uppercase tracking-[0.4em] text-[color:var(--hero-soft)]">
              <span className="block">Code.</span>
              <span className="mt-3 block">Build.</span>
              <span className="mt-3 block">Learn.</span>
              <span className="mt-3 block">Repeat.</span>
            </div>
            <div className="absolute right-9 top-8 h-[168px] w-[180px] rounded-[16px] border border-[color:var(--hero-panel-border)] bg-[color:var(--hero-surface)] p-4 shadow-[0_10px_28px_rgba(1,4,14,0.12)] backdrop-blur-sm">
              <div className="mb-3 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.28em] text-[color:var(--hero-soft)]">
                <span>Stack.exe</span>
                <span className="h-2 w-2 rounded-full bg-[color:var(--hero-primary)] shadow-[0_0_10px_rgba(141,118,255,0.8)]" />
              </div>
              <ul className="space-y-1.5 text-[11px] text-[color:var(--hero-muted)]">
                {['React', 'Next.js', 'TypeScript', 'Python', 'Node.js', 'AI / LLMs', 'SQL'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--hero-soft)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute bottom-8 right-9 w-[220px] rounded-[16px] border border-[color:var(--hero-panel-border)] bg-[color:var(--hero-surface)] p-4 shadow-[0_10px_28px_rgba(1,4,14,0.12)] backdrop-blur-sm">
              <div className="mb-2 flex items-center justify-between text-[8px] font-medium uppercase tracking-[0.28em] text-[color:var(--hero-soft)]">
                <span>Status</span>
                <span className="inline-flex items-center gap-2 text-[color:var(--hero-primary)]">
                  <span className="h-2 w-2 rounded-full bg-[color:var(--hero-primary)] shadow-[0_0_10px_rgba(141,118,255,0.8)]" />
                  Open
                </span>
              </div>
              <ul className="space-y-2 text-[11px] text-[color:var(--hero-muted)]">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-[color:var(--hero-soft)]">Building cool stuff</span>
                  <span className="text-[color:var(--hero-primary)]">●</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-[color:var(--hero-soft)]">Location</span>
                  <span>India</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-[color:var(--hero-soft)]">Open to</span>
                  <span>Internships</span>
                </li>
              </ul>
            </div>
            <div className="absolute inset-x-0 bottom-8 flex justify-center">
              <div className="flex flex-col items-center gap-2 text-[10px] font-medium uppercase tracking-[0.38em] text-[color:var(--hero-soft)]">
                <span>Scroll</span>
                <ArrowDown className="h-4 w-4 animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6 md:py-24">
        <div className="section-shell rounded-[34px] p-6 md:p-10">
          <FadeUp>
            <header className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="space-y-2">
                  <SectionEyebrow index="01" label="Work" />
                  <h2 className={sectionHeading}>Things I&apos;ve built.</h2>
                </div>
                <SectionAction href={GITHUB_URL}>All on GitHub</SectionAction>
              </div>
              <p className={sectionIntro}>
                Each one started with something that annoyed me. Click a card
                for the whole story.
              </p>
            </header>
          </FadeUp>
          <div className="space-y-8">
            <FadeUp>
              <FeaturedProject project={orderedProjects[0]} />
            </FadeUp>
            <FadeUp delay={0.08}>
              <ProjectsList projects={orderedProjects.slice(1)} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6 md:py-24"
      >
        <FadeUp>
          <div className="section-shell rounded-[34px] p-6 md:p-10">
            <div className="space-y-8">
              <header className="space-y-2">
                <SectionEyebrow index="02" label="Experience" />
                <h2 className={sectionHeading}>Where I&apos;ve been.</h2>
              </header>
              <ul className="divide-y divide-border border-t border-border">
                {siteConfig.experience.map((item, i) => (
                  <li
                    key={i}
                    className="grid gap-2 py-6 md:grid-cols-[200px_1fr] md:gap-10"
                  >
                    <div className="space-y-1">
                      <p className="font-medium leading-snug">{item.org}</p>
                      <p className="eyebrow text-subtle-foreground">
                        {item.period}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">{item.role}</p>
                      <p className="leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1 border-t border-border pt-6 text-sm sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    Education
                  </span>{' '}
                  <span className="text-foreground">
                    {siteConfig.education.degree}
                  </span>
                  <span className="text-muted-foreground">
                    {' '}
                    · {siteConfig.education.school}
                  </span>
                </p>
                <span className="shrink-0 font-mono text-[11px] tabular-nums text-muted-foreground">
                  {siteConfig.education.period}
                </span>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ABOUT — late, once you've decided you like the work */}
      <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6 md:py-24">
        <FadeUp>
          <div className="section-shell rounded-[34px] p-6 md:p-10">
            <div className="space-y-10">
              <header className="space-y-2">
                <SectionEyebrow index="03" label="About" />
                <h2 className={sectionHeading}>A little about me.</h2>
              </header>
              <div className="grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
                <div className="space-y-6">
                  <div className="overflow-hidden rounded-2xl border border-border bg-elevated">
                    <Image
                      src="/portrait.png"
                      alt="Shaik Mohammed Suhaib"
                      width={280}
                      height={350}
                      priority
                      loading="eager"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-5 text-sm">
                    <div>
                      <dt className="eyebrow text-subtle-foreground">Location</dt>
                      <dd className="mt-1.5 text-foreground">
                        {siteConfig.location}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-subtle-foreground">Status</dt>
                      <dd className="mt-1.5 inline-flex items-center gap-1.5 text-positive">
                        <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                        Open
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="eyebrow text-subtle-foreground">Focus</dt>
                      <dd className="mt-1.5 text-foreground">
                        {siteConfig.focus}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="space-y-6">
                  <div className="space-y-5 text-lg leading-relaxed text-foreground/80">
                    {siteConfig.bio.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    I also write the odd thing on{' '}
                    <a
                      href={MEDIUM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-foreground transition-colors hover:text-accent"
                    >
                      Medium
                    </a>{' '}
                    — usually maths I keep circling back to.
                  </p>
                  <div className="space-y-3 border-t border-border pt-6">
                    <p className="eyebrow text-accent">In my spare time</p>
                    <p className="leading-relaxed text-muted-foreground">
                      I&apos;m probably making tweaks to my portfolio or hanging
                      out on Discord.
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                      Other than that, you&apos;ll find me playing football or
                      gaming, and trying to get my hands on the latest tech.
                    </p>
                    <p className="pt-1 text-foreground">
                      Thanks for stopping by.
                    </p>
                    <Signature
                      name="Suhaib"
                      className={`${signatureFont.className} inline-block pt-1 text-5xl leading-none text-foreground`}
                    />
                  </div>
                </div>
            </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-6 md:py-24"
      >
        <FadeUp>
          <div className="section-shell rounded-[34px] p-6 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
              <header className="space-y-4">
                <div className="space-y-4 lg:sticky lg:top-24">
                  <div className="space-y-3">
                    <SectionEyebrow index="04" label="Contact" />
                    <h2 className={sectionHeading}>Say hi.</h2>
                    <p className={sectionIntro}>
                      I&apos;m looking for internships, and I&apos;m always up for
                      a good problem. Email&apos;s the best way to reach me — I
                      actually read them.
                    </p>
                  </div>
                  <div className="space-y-3 pt-2 text-sm">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="link-underline text-foreground transition-colors hover:text-accent"
                    >
                      {siteConfig.email}
                    </a>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      {siteConfig.socials.map(
                        ({ icon: Icon, href, label, handle }) => (
                          <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {handle}
                          </a>
                        ),
                      )}
                    </div>
                    <p className="pt-2 text-sm text-muted-foreground">
                      Or just say what you&apos;re working on — odds are I&apos;ll
                      want to hear about it.
                    </p>
                  </div>
                </div>
              </header>
              <div className="rounded-[28px] border border-border bg-background/55 p-5 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.5)] backdrop-blur-xl md:p-6">
                <ContactFormLoader />
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-foreground/[0.06]">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2.5 px-6 py-14 text-center">
          <p className="text-sm text-muted-foreground">
            Built &amp; designed by{' '}
            <span className="font-display text-foreground">Suhaib</span>.
          </p>
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Shaik Suhaib
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/45">
            Made in Chennai · powered by curiosity and mild spite
          </p>
          <a
            href="#home"
            className="group mt-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 transition-colors hover:text-accent"
          >
            Back to top{' '}
            <span className="inline-block transition-transform group-hover:-translate-y-0.5">
              ↑
            </span>
          </a>
        </div>
      </footer>
    </main>
  )
}
