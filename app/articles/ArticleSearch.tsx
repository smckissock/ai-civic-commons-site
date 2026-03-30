'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Article } from '@/lib/queries/articles'

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

interface Props {
  articles: Article[]
}

export default function ArticleSearch({ articles }: Props) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))).sort(),
    [articles]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return articles.filter((a) => {
      const matchesCategory = activeCategory === null || a.category === activeCategory
      if (!matchesCategory) return false
      if (!q) return true
      return (
        a.name.toLowerCase().includes(q) ||
        a.source_org.toLowerCase().includes(q) ||
        (a.summary ?? '').toLowerCase().includes(q)
      )
    })
  }, [articles, query, activeCategory])

  return (
    <div>
      {/* Search + filter bar */}
      <div
        className="mb-5 flex flex-col gap-3 rounded-xl p-4"
        style={{ background: SEC_BG, border: `0.5px solid ${BORDER}` }}
      >
        {/* Search input */}
        <div className="relative">
          <span
            className="pointer-events-none absolute inset-y-0 left-3 flex items-center"
            aria-hidden="true"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke={MUTED} strokeWidth="1.4" />
              <path d="M10.5 10.5l3.5 3.5" stroke={MUTED} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, source, or summary…"
            aria-label="Search articles"
            className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] outline-none"
            style={{
              background: '#ffffff',
              border: `0.5px solid ${BORDER}`,
              color: SL,
            }}
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
          <button
            onClick={() => setActiveCategory(null)}
            className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
            style={{
              background: activeCategory === null ? SL : '#ffffff',
              color: activeCategory === null ? '#ffffff' : MUTED,
              border: `0.5px solid ${activeCategory === null ? SL : BORDER}`,
            }}
            aria-pressed={activeCategory === null}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
              style={{
                background: activeCategory === cat ? SL : '#ffffff',
                color: activeCategory === cat ? '#ffffff' : MUTED,
                border: `0.5px solid ${activeCategory === cat ? SL : BORDER}`,
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mb-3 text-[11px]" style={{ color: MUTED }}>
        {filtered.length === articles.length
          ? `${articles.length} article${articles.length !== 1 ? 's' : ''}`
          : `Showing ${filtered.length} of ${articles.length} article${articles.length !== 1 ? 's' : ''}`}
      </p>

      {/* Article rows */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl py-10 text-center text-[13px]"
          style={{ border: `0.5px solid ${BORDER}`, color: MUTED }}
        >
          No articles match your search.
        </div>
      ) : (
        <div>
          {filtered.map((article, i) => (
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
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                    style={{ background: SEC_BG, color: MUTED }}
                  >
                    {article.category}
                  </span>
                  <span
                    className="article-title text-[12px] font-medium leading-snug"
                    style={{ color: SL }}
                  >
                    {article.name}
                  </span>
                </div>
                <span className="text-[10px]" style={{ color: MUTED }}>
                  {article.source_org}
                </span>
                {article.summary && (
                  <span
                    className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {article.summary}
                  </span>
                )}
              </div>

              {/* Date + new-tab notice */}
              <div className="flex flex-shrink-0 flex-col items-end gap-0.5 pt-0.5">
                <span
                  className="whitespace-nowrap text-[10px]"
                  style={{ color: MUTED }}
                >
                  {formatDate(article.date_published)}
                </span>
                <span
                  className="whitespace-nowrap text-[9px]"
                  style={{ color: AM }}
                  aria-hidden="true"
                >
                  ↗ external
                </span>
                <span className="sr-only">(opens in new tab)</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .article-row:hover .article-title {
          color: ${AM};
        }
      `}</style>
    </div>
  )
}
