'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Org, OrgProgram, OrgFramework, OrgArticle, OrgProject } from '@/lib/queries/organizations'

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

const MAX_INLINE = 3

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  'Academic Institution':         { bg: '#e8f0fe', color: '#1a56b0' },
  'Civil Society':                { bg: '#e6f4ea', color: '#1a6b30' },
  'Company':                      { bg: '#fce8e6', color: '#9c2a20' },
  'Government Body':              { bg: '#f3e8fd', color: '#6a1b9a' },
  'Intergovernmental':            { bg: '#fff3e0', color: '#8a4a00' },
  'Multi-stakeholder Initiative': { bg: '#e0f7fa', color: '#006064' },
  'Standards Body':               { bg: '#fce4ec', color: '#880e4f' },
  'Think Tank':                   { bg: '#f9fbe7', color: '#558b2f' },
}

function typeStyle(orgType: string) {
  return TYPE_COLORS[orgType] ?? { bg: SEC_BG, color: MUTED }
}

/* ---------- inline content sections ---------- */

function SectionHeader({
  label,
  count,
  viewAllHref,
}: {
  label: string
  count: number
  viewAllHref: string
}) {
  return (
    <div className="flex items-baseline justify-between gap-2">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.07em]"
        style={{ color: MUTED }}
      >
        {label}
      </span>
      {count > MAX_INLINE && (
        <Link
          href={viewAllHref}
          className="shrink-0 text-[10px] no-underline hover:underline focus:outline-none focus:ring-1 focus:ring-[#1c2333] rounded"
          style={{ color: AM }}
        >
          View all {count} →
        </Link>
      )}
    </div>
  )
}

function ProgramItems({ items, orgName }: { items: OrgProgram[]; orgName: string }) {
  if (!items.length) return null
  const shown = items.slice(0, MAX_INLINE)
  const href = `/programs?org=${encodeURIComponent(orgName)}`
  return (
    <div className="flex flex-col gap-2">
      <SectionHeader label="Programs" count={items.length} viewAllHref={href} />
      {shown.map((p) => (
        <div key={p.name} className="flex flex-col gap-0.5">
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-0.5 no-underline focus:outline-none focus:ring-1 focus:ring-[#1c2333] rounded"
            >
              <span
                className="text-[12px] font-medium leading-snug group-hover:underline"
                style={{ color: SL }}
              >
                {p.name}
              </span>
              <span className="shrink-0 text-[9px] opacity-40 mt-px" style={{ color: AM }} aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="text-[12px] font-medium leading-snug" style={{ color: SL }}>{p.name}</span>
          )}
          <span className="text-[10px]" style={{ color: MUTED }}>
            {p.level}{p.audience ? ` · ${p.audience}` : ''}
          </span>
          {p.description && (
            <p className="m-0 line-clamp-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>
              {p.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function FrameworkItems({ items, orgName }: { items: OrgFramework[]; orgName: string }) {
  if (!items.length) return null
  const shown = items.slice(0, MAX_INLINE)
  const href = `/frameworks?org=${encodeURIComponent(orgName)}`
  return (
    <div className="flex flex-col gap-2">
      <SectionHeader label="Policy Frameworks" count={items.length} viewAllHref={href} />
      {shown.map((f) => (
        <div key={f.name} className="flex flex-col gap-0.5">
          {f.url ? (
            <a
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-0.5 no-underline focus:outline-none focus:ring-1 focus:ring-[#1c2333] rounded"
            >
              <span
                className="text-[12px] font-medium leading-snug group-hover:underline"
                style={{ color: SL }}
              >
                {f.name}
              </span>
              <span className="shrink-0 text-[9px] opacity-40 mt-px" style={{ color: AM }} aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="text-[12px] font-medium leading-snug" style={{ color: SL }}>{f.name}</span>
          )}
          <span className="text-[10px]" style={{ color: MUTED }}>
            {f.framework_type}{f.year_adopted ? ` · ${f.year_adopted}` : ''}
          </span>
          {f.description && (
            <p className="m-0 line-clamp-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>
              {f.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function ArticleItems({ items, orgName }: { items: OrgArticle[]; orgName: string }) {
  if (!items.length) return null
  const shown = items.slice(0, MAX_INLINE)
  const href = `/articles?org=${encodeURIComponent(orgName)}`
  return (
    <div className="flex flex-col gap-2">
      <SectionHeader label="Articles" count={items.length} viewAllHref={href} />
      {shown.map((a) => (
        <div key={a.url} className="flex flex-col gap-0.5">
          <a
            href={a.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-start gap-0.5 no-underline focus:outline-none focus:ring-1 focus:ring-[#1c2333] rounded"
          >
            <span
              className="text-[12px] font-medium leading-snug group-hover:underline"
              style={{ color: SL }}
            >
              {a.name}
            </span>
            <span className="shrink-0 text-[9px] opacity-40 mt-px" style={{ color: AM }} aria-hidden="true">↗</span>
          </a>
          <span className="text-[10px]" style={{ color: MUTED }}>{a.category}</span>
          {a.summary && (
            <p className="m-0 line-clamp-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>
              {a.summary}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectItems({ items, orgName }: { items: OrgProject[]; orgName: string }) {
  if (!items.length) return null
  const shown = items.slice(0, MAX_INLINE)
  const href = `/projects?org=${encodeURIComponent(orgName)}`
  return (
    <div className="flex flex-col gap-2">
      <SectionHeader label="Development Projects" count={items.length} viewAllHref={href} />
      {shown.map((p) => (
        <div key={p.name} className="flex flex-col gap-0.5">
          {p.url ? (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-0.5 no-underline focus:outline-none focus:ring-1 focus:ring-[#1c2333] rounded"
            >
              <span
                className="text-[12px] font-medium leading-snug group-hover:underline"
                style={{ color: SL }}
              >
                {p.name}
              </span>
              <span className="shrink-0 text-[9px] opacity-40 mt-px" style={{ color: AM }} aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="text-[12px] font-medium leading-snug" style={{ color: SL }}>{p.name}</span>
          )}
          <span className="text-[10px]" style={{ color: MUTED }}>{p.sector}</span>
          {p.description && (
            <p className="m-0 line-clamp-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>
              {p.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

/* ---------- main grid ---------- */

interface Props {
  orgs: Org[]
}

export default function OrgGrid({ orgs }: Props) {
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState<string | null>(null)

  const types = useMemo(
    () => Array.from(new Set(orgs.map((o) => o.org_type).filter(Boolean))).sort(),
    [orgs]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return orgs.filter((o) => {
      if (activeType !== null && o.org_type !== activeType) return false
      if (!q) return true
      return (
        o.name.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.focus_areas.toLowerCase().includes(q) ||
        o.country.toLowerCase().includes(q) ||
        o.region.toLowerCase().includes(q)
      )
    })
  }, [orgs, query, activeType])

  return (
    <div>
      {/* Search + filter bar */}
      <div
        className="mb-6 flex flex-col gap-3 rounded-xl p-4"
        style={{ background: SEC_BG, border: `0.5px solid ${BORDER}` }}
      >
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
            placeholder="Search by name, description, focus area, or country…"
            aria-label="Search organizations"
            className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] outline-none"
            style={{ background: '#ffffff', border: `0.5px solid ${BORDER}`, color: SL }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by organization type">
          <button
            onClick={() => setActiveType(null)}
            className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
            style={{
              background: activeType === null ? SL : '#ffffff',
              color: activeType === null ? '#ffffff' : MUTED,
              border: `0.5px solid ${activeType === null ? SL : BORDER}`,
            }}
            aria-pressed={activeType === null}
          >
            All types
          </button>
          {types.map((t) => {
            const active = activeType === t
            const ts = typeStyle(t)
            return (
              <button
                key={t}
                onClick={() => setActiveType(active ? null : t)}
                className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
                style={{
                  background: active ? ts.bg : '#ffffff',
                  color: active ? ts.color : MUTED,
                  border: `0.5px solid ${active ? ts.bg : BORDER}`,
                }}
                aria-pressed={active}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {/* Result count */}
      <p className="mb-4 text-[11px]" style={{ color: MUTED }}>
        {filtered.length === orgs.length
          ? `${orgs.length} organization${orgs.length !== 1 ? 's' : ''}`
          : `Showing ${filtered.length} of ${orgs.length} organization${orgs.length !== 1 ? 's' : ''}`}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl py-12 text-center text-[13px]"
          style={{ border: `0.5px solid ${BORDER}`, color: MUTED }}
        >
          No organizations match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((org) => {
            const ts = typeStyle(org.org_type)
            const hasLink = Boolean(org.url)
            const hasContent =
              org.programs.length > 0 ||
              org.frameworks.length > 0 ||
              org.articles.length > 0 ||
              org.projects.length > 0

            return (
              <div
                key={org.slug}
                className="org-card flex flex-col gap-3 rounded-xl p-5"
                style={{
                  border: `0.5px solid ${BORDER}`,
                  background: '#ffffff',
                }}
              >
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    {/* Type badge */}
                    <span
                      className="w-fit rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                      style={{ background: ts.bg, color: ts.color }}
                    >
                      {org.org_type || 'Unspecified'}
                    </span>

                    {/* Name */}
                    {hasLink ? (
                      <a
                        href={org.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-1 no-underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333] rounded"
                      >
                        <span
                          className="text-[15px] font-semibold leading-snug tracking-tight group-hover:underline"
                          style={{ color: SL }}
                        >
                          {org.name}
                        </span>
                        <span
                          className="mt-px shrink-0 text-[10px] opacity-50"
                          style={{ color: AM }}
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                        <span className="sr-only">(opens in new tab)</span>
                      </a>
                    ) : (
                      <span
                        className="text-[15px] font-semibold leading-snug tracking-tight"
                        style={{ color: SL }}
                      >
                        {org.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="inline-flex items-center gap-1 text-[11px]"
                    style={{ color: MUTED }}
                  >
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path
                        d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5Z"
                        stroke={MUTED}
                        strokeWidth="1.25"
                      />
                      <circle cx="8" cy="6" r="1.5" stroke={MUTED} strokeWidth="1.1" />
                    </svg>
                    {org.country === 'Unknown' ? org.region : `${org.country}${org.region && org.region !== 'Unknown' ? ` · ${org.region}` : ''}`}
                  </span>
                  {org.parent_org && (
                    <span
                      className="inline-flex items-center gap-1 text-[11px]"
                      style={{ color: MUTED }}
                    >
                      <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M8 3v10M4 9l4 4 4-4" stroke={MUTED} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Part of {org.parent_org}
                    </span>
                  )}
                </div>

                {/* Description */}
                {org.description && (
                  <p
                    className="m-0 text-[12px] leading-relaxed"
                    style={{ color: MUTED }}
                  >
                    {org.description}
                  </p>
                )}

                {/* Focus areas */}
                {org.focus_areas && (
                  <div>
                    <span
                      className="block mb-1 text-[10px] font-medium uppercase tracking-[0.06em]"
                      style={{ color: MUTED }}
                    >
                      Focus areas
                    </span>
                    <p
                      className="m-0 text-[12px] leading-relaxed"
                      style={{ color: SL }}
                    >
                      {org.focus_areas}
                    </p>
                  </div>
                )}

                {/* Related content */}
                {hasContent && (
                  <div
                    className="flex flex-col gap-4 border-t pt-4"
                    style={{ borderColor: BORDER }}
                  >
                    <ProgramItems   items={org.programs}   orgName={org.name} />
                    <FrameworkItems items={org.frameworks} orgName={org.name} />
                    <ArticleItems   items={org.articles}   orgName={org.name} />
                    <ProjectItems   items={org.projects}   orgName={org.name} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
