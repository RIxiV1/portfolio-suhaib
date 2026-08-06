import Image from 'next/image'
import { Dancing_Script } from 'next/font/google'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { FadeUp } from '@/components/ui/fade-up'
import { Stagger, StaggerItem } from '@/components/ui/reveal'
import { MagneticLink } from '@/components/ui/magnetic-link'
import { ContactForm } from '@/components/ui/contact-form'
import { FeaturedProject, ProjectsList } from '@/components/ui/work-stack-link'
import { SignalField } from '@/components/ui/signal-field'
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
        className="relative mx-auto flex min-h-svh max-w-5xl flex-col justify-center px-6 pt-32 pb-24"
      >
        {/* Live Signal mark — ambient on the right, hover to resolve it. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden items-center justify-end pr-2 lg:flex">
          <SignalField size={430} className="pointer-events-auto opacity-90" />
        </div>

        <Stagger className="relative z-10 max-w-2xl space-y-7">
          <StaggerItem>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-elevated/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full bg-positive/60 motion-safe:animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-positive" />
              </span>
              Available for internships
            </span>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-display text-5xl font-semibold leading-[1.0] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Shaik Suhaib
            </h1>
          </StaggerItem>

          <StaggerItem className="max-w-2xl">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Early in the journey — a software engineer building AI tools that
              make complicated things{' '}
              <span className="italic text-foreground">feel simple</span>.
            </p>
          </StaggerItem>

          <StaggerItem className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticLink
              href="#contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-sm transition-[background-color,box-shadow] duration-300 hover:bg-accent-strong hover:shadow-[0_10px_30px_-10px_var(--accent)]"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticLink>
            <MagneticLink
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-300 hover:bg-muted"
            >
              Résumé
            </MagneticLink>
            <span className="ml-1 flex items-center gap-4 border-l border-border pl-4 text-muted-foreground">
              {siteConfig.socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="transition-colors hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </span>
          </StaggerItem>
        </Stagger>

        <a
          href="#work"
          aria-label="Scroll to work"
          className="eyebrow absolute inset-x-6 bottom-8 mx-auto flex w-fit items-center gap-2 text-subtle-foreground transition-colors hover:text-foreground"
        >
          Scroll
          <ArrowDown className="h-3.5 w-3.5 animate-float" />
        </a>
      </section>

      {/* WORK */}
      <section id="work" className="mx-auto max-w-5xl scroll-mt-24 px-6 py-28">
        <div className="space-y-10">
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
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
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
        </FadeUp>
      </section>

      {/* ABOUT — late, once you've decided you like the work */}
      <section id="about" className="mx-auto max-w-4xl scroll-mt-24 px-6 py-28">
        <FadeUp>
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
        </FadeUp>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-3xl scroll-mt-24 px-6 py-28"
      >
        <FadeUp>
          <div className="space-y-8">
            <header className="space-y-4">
              <SectionEyebrow index="04" label="Contact" />
              <h2 className={sectionHeading}>Say hi.</h2>
              <p className={sectionIntro}>
                I&apos;m looking for internships, and I&apos;m always up for a
                good problem. Email&apos;s the best way to reach me — I actually
                read them.
              </p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2 text-sm">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-underline text-foreground transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
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
            </header>
            <ContactForm />
            <p className="pt-2 text-sm text-muted-foreground">
              Or just say what you&apos;re working on — odds are I&apos;ll want
              to hear about it.
            </p>
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
