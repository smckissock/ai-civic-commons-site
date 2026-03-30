import Link from 'next/link'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getStats } from '@/lib/queries/stats'
import { getArticles } from '@/lib/queries/articles'

export const revalidate = 60

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

function formatDate(d: Date | string): string {
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function IconBuilding() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="5.5" width="13" height="9.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5.5 15V10.5h5V15" stroke="currentColor" strokeWidth="1.25" />
      <rect x="4.5" y="1.5" width="7" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function IconBook() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 2.5h7a1 1 0 011 1v9a1 1 0 01-1 1H3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3 2.5a1 1 0 00-1 1v9a1 1 0 001 1" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M3 13.5h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <path d="M6 5.5h3M6 8h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5L2.5 3.5v4c0 3 2.5 5.5 5.5 6.5 3-1 5.5-3.5 5.5-6.5v-4L8 1.5z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <path d="M5.5 8l1.5 1.5 3-3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconDocument() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2.5" y="1.5" width="11" height="13" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.25" />
      <ellipse cx="8" cy="8" rx="2.5" ry="6.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M1.5 8h13M2.5 5h11M2.5 11h11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function IconTag() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8.5 1.5h4a1 1 0 011 1v4l-6 6-5-5 6-6z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="11" cy="5" r="1" fill="currentColor" />
    </svg>
  )
}

export default async function Home() {
  const [stats, articles] = await Promise.all([getStats(), getArticles()])

  const pillars = [
    {
      Icon: IconBuilding,
      title: 'Organization registry',
      desc: 'Nonprofits, libraries, think tanks, and intergovernmental bodies working on AI education and the public interest.',
      link: `${stats.orgs} organizations →`,
      href: '/organizations',
      iconBg: `rgba(28, 35, 51, 0.06)`,
    },
    {
      Icon: IconBook,
      title: 'Program library',
      desc: 'Curated AI education programs for professionals, faith communities, and youth — from Helsinki to Harvard.',
      link: `${stats.programs} programs →`,
      href: '/programs',
      iconBg: `rgba(186, 117, 23, 0.08)`,
    },
    {
      Icon: IconShield,
      title: 'Policy frameworks',
      desc: 'International, national, and industry AI policy instruments — from OECD principles to the EU AI Act.',
      link: `${stats.frameworks} frameworks →`,
      href: '/frameworks',
      iconBg: `rgba(28, 35, 51, 0.06)`,
    },
    {
      Icon: IconDocument,
      title: 'Article repository',
      desc: 'Curated articles, policy developments, and research on AI ethics, governance, and public education.',
      link: 'Updated daily →',
      href: '/articles',
      iconBg: `rgba(186, 117, 23, 0.08)`,
    },
    {
      Icon: IconGlobe,
      title: 'International development',
      desc: 'AI for health, agriculture, education, and governance in the Global South — funded projects with outcomes.',
      link: `${stats.projects} projects →`,
      href: '/projects',
      iconBg: `rgba(28, 35, 51, 0.06)`,
    },
    {
      Icon: IconTag,
      title: 'Tags & topics',
      desc: 'Filter across all content by ethics, bias, equity, workforce guidance, deepfakes, and more.',
      link: 'Browse tags →',
      href: '/tags',
      iconBg: `rgba(186, 117, 23, 0.08)`,
    },
  ]

  return (
    <>
      <NavBar />

      <main id="main-content">
        <div className="mx-auto w-full max-w-[960px] px-4 md:px-6 lg:px-8">

          {/* Hero */}
          <section
            className="py-5"
            style={{ borderBottom: `0.5px solid ${BORDER}` }}
          >
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:items-start">

              {/* Left */}
              <div>
                {/* H1 */}
                <h1
                  className="mb-4 text-xl font-medium leading-tight tracking-tight md:text-2xl lg:text-3xl"
                  style={{ color: SL }}
                >
                  The shared commons for{' '}
                  <span style={{ color: AM }}>AI education</span>
                  {' '}and the public interest
                </h1>

                {/* Body */}
                <p
                  className="mb-6 max-w-prose text-base leading-relaxed md:text-sm"
                  style={{ color: MUTED }}
                >
                  Hundreds of nonprofits, libraries, faith communities, and universities are working
                  to address the AI knowledge gap — in silos. The AI Civic Commons is where they
                  find each other, share what works, and demonstrate together what they cannot
                  show alone.
                </p>
              </div>

              {/* Right — stats */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { value: stats.programs, label: 'Programs in the library', href: '/programs' },
                  { value: stats.frameworks, label: 'Policy frameworks', href: '/frameworks' },
                  { value: stats.orgs, label: 'Organizations registered', href: '/organizations' },
                  { value: stats.projects, label: 'International dev projects', href: '/projects' },
                ].map(({ value, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="stat-card rounded-lg px-4 py-4 no-underline block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333]"
                    style={{ background: SEC_BG }}
                  >
                    <div
                      className="mb-1 text-2xl font-medium leading-tight tracking-tight"
                      style={{ color: SL }}
                    >
                      {value}
                    </div>
                    <div className="text-[13px] font-semibold leading-snug" style={{ color: MUTED }}>{label}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>

        {/* Mission bar — full width */}
        <div
          style={{
            background: SEC_BG,
            borderBottom: `0.5px solid ${BORDER}`,
          }}
          className="px-4 py-5 md:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-[960px]">
            <p
              className="m-0 max-w-2xl text-[13px] italic leading-relaxed"
              style={{ color: MUTED }}
            >
              &ldquo;The people most affected by AI — the workers whose jobs are being transformed,
              the seniors navigating AI customer service, the students using tools they barely
              understand — deserve reliable, trustworthy information about what AI is, what it
              does, and how to engage with it on their own terms.&rdquo;
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[960px] px-4 md:px-6 lg:px-8">

          {/* Browse the commons */}
          <section
            className="py-5"
            style={{ borderBottom: `0.5px solid ${BORDER}` }}
          >
            <h2
              className="mb-4 text-[14px] font-medium tracking-tight"
              style={{ color: SL }}
            >
              Browse the commons
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map(({ Icon, title, desc, link, href, iconBg }) => (
                <Link
                  key={title}
                  href={href}
                  className="pillar-card flex flex-col gap-2.5 rounded-xl p-4 no-underline transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333]"
                  style={{
                    border: `0.5px solid ${BORDER}`,
                    color: 'inherit',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md"
                    style={{ background: iconBg, color: SL }}
                  >
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3
                    className="m-0 text-[12px] font-medium leading-snug"
                    style={{ color: SL }}
                  >
                    {title}
                  </h3>

                  {/* Desc */}
                  <p
                    className="m-0 grow text-[11px] leading-[1.55]"
                    style={{ color: MUTED }}
                  >
                    {desc}
                  </p>

                  {/* Count link */}
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: AM }}
                  >
                    {link}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Article repository */}
          <section className="py-5">
            {/* Section header */}
            <div className="mb-4 flex items-baseline justify-between">
              <h2
                className="m-0 text-[14px] font-medium tracking-tight"
                style={{ color: SL }}
              >
                Article repository
              </h2>
              <Link
                href="/articles"
                className="text-[12px] font-medium no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA7517] rounded"
                style={{ color: AM }}
              >
                View all articles →
              </Link>
            </div>

            {/* Article list */}
            <div>
              {articles.map((article, i) => (
                <Link
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-row flex flex-wrap items-start justify-between gap-4 py-3 no-underline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1c2333]"
                  style={{
                    borderTop: i === 0 ? `0.5px solid ${BORDER}` : undefined,
                    borderBottom: `0.5px solid ${BORDER}`,
                    color: 'inherit',
                  }}
                >
                  {/* Left */}
                  <div className="flex min-w-0 flex-col gap-1">
                    {/* Category pill + title */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                        style={{ background: SEC_BG, color: MUTED }}
                      >
                        {article.category}
                      </span>
                      <span
                        className="text-[12px] font-medium leading-snug"
                        style={{ color: SL }}
                      >
                        {article.name}
                      </span>
                    </div>
                    {/* Source */}
                    <span className="text-[10px]" style={{ color: MUTED }}>{article.source_org}</span>
                  </div>

                  {/* Date + new-tab notice */}
                  <div className="flex flex-shrink-0 flex-col items-end gap-0.5 pt-0.5">
                    <span className="whitespace-nowrap text-[10px]" style={{ color: MUTED }}>
                      {formatDate(article.date_published)}
                    </span>
                    <span className="sr-only">(opens in new tab)</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <style>{`
        .pillar-card:hover {
          border-color: rgba(28, 35, 51, 0.28) !important;
        }
        .article-row:hover span[style*="color: rgb(28"] {
          color: #BA7517;
        }
        .stat-card {
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
        }
        .stat-card:hover {
          background-color: #eeeeed !important;
          box-shadow: 0 2px 8px rgba(28, 35, 51, 0.08);
        }
      `}</style>
    </>
  )
}
