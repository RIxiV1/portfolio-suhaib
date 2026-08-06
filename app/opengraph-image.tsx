import { ImageResponse } from 'next/og'
import { Logo } from '@/components/ui/logo'
import { siteConfig } from '@/data/site'

export const alt = `${siteConfig.name} — ${siteConfig.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '68px 72px',
        background: 'linear-gradient(140deg, #0d0d14 0%, #09090b 55%)',
        color: '#fafafa',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Logo size={54} color="#fafafa" accent="#818cf8" />
          <span
            style={{
              fontSize: 21,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#a1a1aa',
            }}
          >
            Portfolio
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 19,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#818cf8',
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: '#34d399',
            }}
          />
          Available for internships
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div
          style={{
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          Shaik Suhaib
        </div>
        <div
          style={{
            fontSize: 38,
            fontWeight: 400,
            color: '#a1a1aa',
            letterSpacing: '-0.01em',
          }}
        >
          {`${siteConfig.role} · ${siteConfig.focus}`}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 21,
          color: '#71717a',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        <span>{siteConfig.location}</span>
        <span>shaikuhaibdev.vercel.app</span>
      </div>
    </div>,
    { ...size },
  )
}
