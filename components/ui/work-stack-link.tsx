import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Project = {
  title: string
  year: string
  slug: string
  description: string
  hook?: string
  metric?: string
  image?: string
  imagePosition?: string
  tech: string[]
  href: string
  liveUrl?: string
  caseStudy?: unknown
}

function Preview({
  p,
  className,
  sizes,
}: {
  p: Project
  className?: string
  sizes: string
}) {
  return (
    <div className={cn('relative overflow-hidden bg-muted', className)}>
      {p.image && (
        <Image
          src={p.image}
          alt={`${p.title} preview`}
          fill
          sizes={sizes}
          style={{ objectPosition: p.imagePosition ?? 'top' }}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/5" />
    </div>
  )
}

function TechChips({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-md border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground"
        >
          {t}
        </li>
      ))}
    </ul>
  )
}

function Actions({ p }: { p: Project }) {
  const hasCaseStudy = !!p.caseStudy
  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
      {hasCaseStudy && (
        <Link
          href={`/projects/${p.slug}`}
          className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent"
        >
          Case study <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
      {p.liveUrl && (
        <a
          href={p.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          Live <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      )}
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
      >
        Source <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

const cardBase =
  'group relative overflow-hidden rounded-2xl border border-border bg-elevated transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-[var(--card-shadow)] has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-accent has-[a:focus-visible]:ring-offset-2 has-[a:focus-visible]:ring-offset-background'

// The one project that gets star treatment — a wide split card.
export function FeaturedProject({ project: p }: { project: Project }) {
  return (
    <article className={cardBase}>
      <div className="grid md:grid-cols-2">
        <Preview
          p={p}
          className="aspect-[16/11] border-b border-border md:border-b-0 md:border-r"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <span className="eyebrow text-accent">Featured</span>
            <span className="eyebrow text-subtle-foreground">{p.year}</span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight">
            <Link
              href={`/projects/${p.slug}`}
              className="transition-colors after:absolute after:inset-0 hover:text-accent"
            >
              {p.title}
            </Link>
          </h3>
          <p className="leading-relaxed text-muted-foreground">
            {p.description}
          </p>
          {p.metric && <p className="eyebrow text-foreground/70">{p.metric}</p>}
          <TechChips tech={p.tech} />
          <div className="mt-auto pt-2">
            <Actions p={p} />
          </div>
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className={cn(cardBase, 'flex flex-col')}>
      <Preview
        p={p}
        className="aspect-[16/10] border-b border-border"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight">
            <Link
              href={`/projects/${p.slug}`}
              className="transition-colors after:absolute after:inset-0 hover:text-accent"
            >
              {p.title}
            </Link>
          </h3>
          <span className="eyebrow shrink-0 text-subtle-foreground">
            {p.year}
          </span>
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {p.description}
        </p>
        {p.metric && <p className="eyebrow text-foreground/60">{p.metric}</p>}
        <TechChips tech={p.tech} />
        <div className="mt-auto pt-2">
          <Actions p={p} />
        </div>
      </div>
    </article>
  )
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.title} project={p} />
      ))}
    </div>
  )
}
