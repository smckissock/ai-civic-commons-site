import pool from '@/lib/db'
import Link from 'next/link'

export const revalidate = 300

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

interface Stats {
  programs: number
  frameworks: number
  orgs: number
  projects: number
}

interface Article {
  name: string
  url: string
  date_published: Date
  category: string
  source_org: string
}

async function getStats(): Promise<Stats> {
  const { rows } = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM ai.educational_programs WHERE id != 1) as programs,
      (SELECT COUNT(*) FROM ai.governance_frameworks WHERE id != 1) as frameworks,
      (SELECT COUNT(*) FROM ai.organizations WHERE id != 1) as orgs,
      (SELECT COUNT(*) FROM ai.intl_projects WHERE id != 1) as projects
  `)
  return {
    programs: Number(rows[0].programs),
    frameworks: Number(rows[0].frameworks),
    orgs: Number(rows[0].orgs),
    projects: Number(rows[0].projects),
  }
}

async function getArticles(): Promise<Article[]> {
  const { rows } = await pool.query(`
    SELECT a.name, a.url, a.date_published, a.summary,
           ac.name as category, o.name as source_org
    FROM ai.articles a
    JOIN ai.article_categories ac ON ac.id = a.article_category_id
    JOIN ai.organizations o ON o.id = a.source_org_id
    WHERE a.workflow_status_id = 2
      AND a.id != 1
    ORDER BY a.date_published DESC
    LIMIT 4
  `)
  return rows
}

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

const pillars = [
  {
    Icon: IconBuilding,
    title: 'Organization registry',
    desc: 'Nonprofits, libraries, think tanks, and intergovernmental bodies working on AI education and the public interest.',
    link: '52 organizations →',
    href: '/organizations',
    iconBg: `rgba(28, 35, 51, 0.06)`,
  },
  {
    Icon: IconBook,
    title: 'Program library',
    desc: 'Curated AI education programs for professionals, faith communities, and youth — from Helsinki to Harvard.',
    link: '53 programs →',
    href: '/programs',
    iconBg: `rgba(186, 117, 23, 0.08)`,
  },
  {
    Icon: IconShield,
    title: 'Policy frameworks',
    desc: 'International, national, and industry AI policy instruments — from OECD principles to the EU AI Act.',
    link: '41 frameworks →',
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
    link: '15 projects →',
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

export default async function Home() {
  const [stats, articles] = await Promise.all([getStats(), getArticles()])

  return (
    <>
      {/* Navigation */}
      <nav
        style={{
          borderBottom: `0.5px solid ${BORDER}`,
          background: '#fff',
          padding: '13px 20px',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', flexShrink: 0 }}>
            <svg width="52" height="52" viewBox="0 0 44 44" fill="none" aria-label="AI Civic Commons">
              <circle cx="22" cy="22" r="19" stroke={SL} strokeWidth="3.5" fill="none" />
              <text x="22" y="29" textAnchor="middle" fontSize="19" fontWeight="600" fill={SL} letterSpacing="2">AI</text>
            </svg>
            <div style={{ maxWidth: 220 }}>
              <div style={{ fontSize: 22, fontWeight: 500, color: SL, lineHeight: 1.3 }}>AI Civic Commons</div>
              <div style={{ fontSize: 13, color: MUTED, lineHeight: 1.4 }}>Open resources for AI education<br />and public advocacy</div>
            </div>
          </Link>

          {/* Center nav links */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              margin: '0 auto',
              alignItems: 'center',
            }}
            className="hidden md:flex"
          >
            {[
              ['Organization Registry', '/organizations'],
              ['Program Library', '/programs'],
              ['Policy Frameworks', '/frameworks'],
              ['Article Repository', '/articles'],
              ['International Development', '/projects'],
            ].map(([label, href]) => (
              <Link
                key={label}
                href={href}
                style={{
                  fontSize: 12,
                  color: MUTED,
                  textDecoration: 'none',
                  textAlign: 'center',
                  maxWidth: 72,
                  lineHeight: 1.35,
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/join"
            style={{
              marginLeft: 'auto',
              background: AM,
              color: '#fff',
              fontSize: 11,
              fontWeight: 500,
              padding: '6px 14px',
              borderRadius: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Join the Community
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', width: '100%', padding: '0 20px' }}>

        {/* Hero */}
        <section
          style={{
            paddingTop: 44,
            paddingBottom: 36,
            borderBottom: `0.5px solid ${BORDER}`,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 28,
              alignItems: 'start',
            }}
            className="hero-grid"
          >
            {/* Left */}
            <div>
              {/* Eyebrow */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: AM,
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: AM,
                    fontWeight: 500,
                  }}
                >
                  Permanent · Neutral · Open access
                </span>
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontSize: 27,
                  fontWeight: 500,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.25,
                  color: SL,
                  margin: '0 0 16px',
                }}
              >
                The shared commons for{' '}
                <span style={{ color: AM }}>AI education</span>
                {' '}and the public interest
              </h1>

              {/* Body */}
              <p
                style={{
                  fontSize: 13,
                  color: MUTED,
                  lineHeight: 1.7,
                  maxWidth: 380,
                  margin: '0 0 24px',
                }}
              >
                Hundreds of nonprofits, libraries, faith communities, and universities are working
                to address the AI knowledge gap — in silos. The AI Civic Commons is where they
                find each other, share what works, and demonstrate together what they cannot
                show alone.
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <Link
                  href="/explore"
                  style={{
                    background: SL,
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '9px 18px',
                    borderRadius: 8,
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  Explore the commons
                </Link>
                <Link
                  href="/organizations"
                  style={{
                    color: MUTED,
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '9px 4px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >
                  For organizations →
                </Link>
              </div>
            </div>

            {/* Right — stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 10,
              }}
            >
              {[
                { value: stats.programs, plus: true, label: 'Programs in the library' },
                { value: stats.frameworks, plus: false, label: 'Policy frameworks' },
                { value: stats.orgs, plus: false, label: 'Organizations registered' },
                { value: stats.projects, plus: false, label: 'International dev projects' },
              ].map(({ value, plus, label }) => (
                <div
                  key={label}
                  style={{
                    background: SEC_BG,
                    borderRadius: 8,
                    padding: '16px 18px',
                  }}
                >
                  <div
                    style={{
                      fontSize: 26,
                      fontWeight: 500,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      color: SL,
                      marginBottom: 4,
                    }}
                  >
                    {value}
                    {plus && <span style={{ color: AM }}>+</span>}
                  </div>
                  <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.4 }}>{label}</div>
                </div>
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
          padding: '20px',
        }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 12,
              fontStyle: 'italic',
              color: MUTED,
              maxWidth: 640,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            &ldquo;The people most affected by AI — the workers whose jobs are being transformed,
            the seniors navigating AI customer service, the students using tools they barely
            understand — deserve reliable, trustworthy information about what AI is, what it
            does, and how to engage with it on their own terms.&rdquo;
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', width: '100%', padding: '0 20px' }}>

        {/* Browse the commons */}
        <section style={{ padding: '36px 0', borderBottom: `0.5px solid ${BORDER}` }}>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: SL,
              margin: '0 0 16px',
              letterSpacing: '-0.01em',
            }}
          >
            Browse the commons
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
            }}
            className="pillars-grid"
          >
            {pillars.map(({ Icon, title, desc, link, href, iconBg }) => (
              <Link
                key={title}
                href={href}
                style={{
                  border: `0.5px solid ${BORDER}`,
                  borderRadius: 12,
                  padding: 16,
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  transition: 'border-color 0.15s',
                  color: 'inherit',
                }}
                className="pillar-card"
              >
                {/* Icon */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: SL,
                    flexShrink: 0,
                  }}
                >
                  <Icon />
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: SL,
                    margin: 0,
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>

                {/* Desc */}
                <p
                  style={{
                    fontSize: 11,
                    color: MUTED,
                    lineHeight: 1.55,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {desc}
                </p>

                {/* Count link */}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 500,
                    color: AM,
                  }}
                >
                  {link}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Article repository */}
        <section style={{ padding: '36px 0 48px' }}>
          {/* Section header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 16,
            }}
          >
            <h2
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: SL,
                margin: 0,
                letterSpacing: '-0.01em',
              }}
            >
              Article repository
            </h2>
            <Link
              href="/articles"
              style={{ fontSize: 12, color: AM, textDecoration: 'none', fontWeight: 500 }}
            >
              View all →
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
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 16,
                  padding: '12px 0',
                  borderTop: i === 0 ? `0.5px solid ${BORDER}` : undefined,
                  borderBottom: `0.5px solid ${BORDER}`,
                  textDecoration: 'none',
                  color: 'inherit',
                }}
                className="article-row"
              >
                {/* Left */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                  {/* Category pill + title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: 9,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        background: SEC_BG,
                        color: MUTED,
                        padding: '2px 7px',
                        borderRadius: 4,
                        whiteSpace: 'nowrap',
                        fontWeight: 500,
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: SL,
                        lineHeight: 1.4,
                      }}
                    >
                      {article.name}
                    </span>
                  </div>
                  {/* Source */}
                  <span style={{ fontSize: 10, color: MUTED }}>{article.source_org}</span>
                </div>

                {/* Date */}
                <span
                  style={{
                    fontSize: 10,
                    color: MUTED,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {formatDate(article.date_published)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: `0.5px solid ${BORDER}`,
          padding: '16px 20px',
          marginTop: 'auto',
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: MUTED }}>
            © 2026 AI Civic Commons · Open access · No ads · No single funder controls
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link
              href="https://aiciviccommons.org"
              style={{ fontSize: 11, color: MUTED, textDecoration: 'none' }}
            >
              aiciviccommons.org
            </Link>
            <span
              style={{
                fontSize: 10,
                color: MUTED,
                border: `0.5px solid ${BORDER}`,
                borderRadius: 20,
                padding: '2px 8px',
                fontWeight: 500,
              }}
            >
              PILOT v0.1
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .pillars-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .pillars-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .pillar-card:hover {
          border-color: rgba(28, 35, 51, 0.28) !important;
        }
        .article-row:hover .article-title {
          color: #BA7517;
        }
      `}</style>
    </>
  )
}
