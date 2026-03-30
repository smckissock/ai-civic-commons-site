'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Project } from '@/lib/queries/projects'

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

function formatYears(start: number | null, end: number | null): string {
  if (!start) return ''
  if (end === null) return `${start}–ongoing`
  if (end === start) return String(start)
  return `${start}–${end}`
}

function formatBudget(raw: string | number): string {
  const n = Number(raw)
  if (!n) return ''
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${n.toLocaleString()}`
}

interface Props {
  projects: Project[]
}

export default function ProjectSearch({ projects }: Props) {
  const [query, setQuery] = useState('')
  const [activeSector, setActiveSector] = useState<string | null>(null)

  const sectors = useMemo(
    () => Array.from(new Set(projects.map((p) => p.sector))).sort(),
    [projects]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects.filter((p) => {
      if (activeSector !== null && p.sector !== activeSector) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.donors.toLowerCase().includes(q) ||
        p.implementing_orgs.toLowerCase().includes(q) ||
        p.countries.toLowerCase().includes(q)
      )
    })
  }, [projects, query, activeSector])

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
            placeholder="Search by name, description, country, or organization…"
            aria-label="Search projects"
            className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] outline-none"
            style={{
              background: '#ffffff',
              border: `0.5px solid ${BORDER}`,
              color: SL,
            }}
          />
        </div>

        {/* Sector pills */}
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by sector">
          <button
            onClick={() => setActiveSector(null)}
            className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
            style={{
              background: activeSector === null ? SL : '#ffffff',
              color: activeSector === null ? '#ffffff' : MUTED,
              border: `0.5px solid ${activeSector === null ? SL : BORDER}`,
            }}
            aria-pressed={activeSector === null}
          >
            All sectors
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSector(activeSector === s ? null : s)}
              className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
              style={{
                background: activeSector === s ? SL : '#ffffff',
                color: activeSector === s ? '#ffffff' : MUTED,
                border: `0.5px solid ${activeSector === s ? SL : BORDER}`,
              }}
              aria-pressed={activeSector === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="mb-3 text-[11px]" style={{ color: MUTED }}>
        {filtered.length === projects.length
          ? `${projects.length} project${projects.length !== 1 ? 's' : ''}`
          : `Showing ${filtered.length} of ${projects.length} project${projects.length !== 1 ? 's' : ''}`}
      </p>

      {/* Project rows */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl py-10 text-center text-[13px]"
          style={{ border: `0.5px solid ${BORDER}`, color: MUTED }}
        >
          No projects match your search.
        </div>
      ) : (
        <div>
          {filtered.map((project, i) => {
            const years = formatYears(project.year_start, project.year_end)
            const budget = formatBudget(project.budget_usd)
            const hasLink = project.url && project.url !== ''

            const inner = (
              <>
                {/* Left */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="whitespace-nowrap rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                      style={{ background: SEC_BG, color: MUTED }}
                    >
                      {project.sector}
                    </span>
                    <span
                      className="project-title text-[12px] font-medium leading-snug"
                      style={{ color: SL }}
                    >
                      {project.name}
                    </span>
                  </div>

                  {project.description && (
                    <span
                      className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed"
                      style={{ color: MUTED }}
                    >
                      {project.description}
                    </span>
                  )}

                  <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-0.5">
                    {project.scope && project.scope !== 'Global' && (
                      <span className="text-[10px]" style={{ color: MUTED }}>
                        {project.scope}
                      </span>
                    )}
                    {project.countries && (
                      <span className="text-[10px]" style={{ color: MUTED }}>
                        {project.countries}
                      </span>
                    )}
                    {project.donors && (
                      <span className="text-[10px]" style={{ color: MUTED }}>
                        Donor: {project.donors}
                      </span>
                    )}
                    {project.implementing_orgs && (
                      <span className="text-[10px]" style={{ color: MUTED }}>
                        Implementer: {project.implementing_orgs}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right — years + budget */}
                <div className="flex flex-shrink-0 flex-col items-end gap-0.5 pt-0.5">
                  {years && (
                    <span className="whitespace-nowrap text-[10px]" style={{ color: MUTED }}>
                      {years}
                    </span>
                  )}
                  {budget && (
                    <span className="whitespace-nowrap text-[10px] font-medium" style={{ color: AM }}>
                      {budget}
                    </span>
                  )}
                  {hasLink && (
                    <>
                      <span className="whitespace-nowrap text-[9px]" style={{ color: AM }} aria-hidden="true">
                        ↗ external
                      </span>
                      <span className="sr-only">(opens in new tab)</span>
                    </>
                  )}
                </div>
              </>
            )

            const rowStyle = {
              borderTop: i === 0 ? `0.5px solid ${BORDER}` : undefined,
              borderBottom: `0.5px solid ${BORDER}`,
              color: 'inherit',
            }

            if (hasLink) {
              return (
                <Link
                  key={project.name}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-row flex flex-wrap items-start justify-between gap-4 py-3 no-underline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1c2333]"
                  style={rowStyle}
                >
                  {inner}
                </Link>
              )
            }

            return (
              <div
                key={project.name}
                className="project-row flex flex-wrap items-start justify-between gap-4 py-3"
                style={rowStyle}
              >
                {inner}
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        .project-row:hover .project-title {
          color: ${AM};
        }
      `}</style>
    </div>
  )
}
