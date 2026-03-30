'use client'

import { useState, useMemo } from 'react'
import type { Program } from '@/lib/queries/programs'

const RATING_TOPICS: { key: keyof Program; label: string }[] = [
  { key: 'emotional_readiness',   label: 'Emotional Readiness' },
  { key: 'misinformation',        label: 'Misinformation' },
  { key: 'human_ai_interaction',  label: 'Human-AI Interaction' },
  { key: 'ethics_in_practice',    label: 'Ethics in Practice' },
  { key: 'systems_thinking',      label: 'Systems Thinking' },
  { key: 'workforce_guidance',    label: 'Workforce Guidance' },
  { key: 'equity_access',         label: 'Equity & Access' },
  { key: 'trust_calibration',     label: 'Trust Calibration' },
  { key: 'failure_literacy',      label: 'Failure Literacy' },
  { key: 'behavioral_norms',      label: 'Behavioral Norms' },
]

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

const LEVEL_ORDER = [
  'All Levels',
  'Beginner',
  'Beginner-Intermediate',
  'Intermediate',
  'Intermediate-Advanced',
  'Advanced',
]

const RATING_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  High:        { bg: '#e6f4ea', color: '#1a6b30', label: 'H' },
  Medium:      { bg: '#fff8e1', color: '#8a5a00', label: 'M' },
  Low:         { bg: '#f1f3f4', color: MUTED,     label: 'L' },
  Unspecified: { bg: 'transparent', color: 'transparent', label: '' },
}

function RatingDot({ value, label }: { value: string; label: string }) {
  const s = RATING_STYLE[value] ?? RATING_STYLE.Unspecified
  if (!s.label) return null
  return (
    <span title={`${label}: ${value}`} className="flex flex-col items-center gap-0.5">
      <span
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
        style={{ background: s.bg, color: s.color }}
      >
        {s.label}
      </span>
      <span className="text-[8px] leading-tight text-center max-w-[38px]" style={{ color: MUTED }}>
        {label.replace(' & ', '\u00a0& ')}
      </span>
    </span>
  )
}

interface Props {
  programs: Program[]
  initialOrg?: string
}

export default function ProgramGrid({ programs, initialOrg }: Props) {
  const [query, setQuery] = useState('')
  const [activeLevel, setActiveLevel] = useState<string | null>(null)
  const [activeAudience, setActiveAudience] = useState<string | null>(null)
  const [activeOrg, setActiveOrg] = useState<string | null>(initialOrg ?? null)

  const levels = useMemo(
    () =>
      LEVEL_ORDER.filter((l) => programs.some((p) => p.level === l)),
    [programs]
  )

  const audiences = useMemo(
    () => Array.from(new Set(programs.map((p) => p.audience))).sort(),
    [programs]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return programs.filter((p) => {
      if (activeOrg !== null && p.provider !== activeOrg) return false
      if (activeLevel !== null && p.level !== activeLevel) return false
      if (activeAudience !== null && p.audience !== activeAudience) return false
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.provider.toLowerCase().includes(q)
      )
    })
  }, [programs, query, activeLevel, activeAudience, activeOrg])

  return (
    <div>
      {/* Search + filter bar */}
      <div
        className="mb-6 flex flex-col gap-3 rounded-xl p-4"
        style={{ background: SEC_BG, border: `0.5px solid ${BORDER}` }}
      >
        {/* Search */}
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="4.5" stroke={MUTED} strokeWidth="1.4" />
              <path d="M10.5 10.5l3.5 3.5" stroke={MUTED} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, description, or provider…"
            aria-label="Search programs"
            className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] outline-none"
            style={{ background: '#ffffff', border: `0.5px solid ${BORDER}`, color: SL }}
          />
        </div>

        {/* Level filter */}
        <div>
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
            Level
          </span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by level">
            <button
              onClick={() => setActiveLevel(null)}
              className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
              style={{
                background: activeLevel === null ? SL : '#ffffff',
                color: activeLevel === null ? '#ffffff' : MUTED,
                border: `0.5px solid ${activeLevel === null ? SL : BORDER}`,
              }}
              aria-pressed={activeLevel === null}
            >All</button>
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setActiveLevel(activeLevel === l ? null : l)}
                className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
                style={{
                  background: activeLevel === l ? SL : '#ffffff',
                  color: activeLevel === l ? '#ffffff' : MUTED,
                  border: `0.5px solid ${activeLevel === l ? SL : BORDER}`,
                }}
                aria-pressed={activeLevel === l}
              >{l}</button>
            ))}
          </div>
        </div>

        {/* Audience filter */}
        <div>
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
            Audience
          </span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by audience">
            <button
              onClick={() => setActiveAudience(null)}
              className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
              style={{
                background: activeAudience === null ? SL : '#ffffff',
                color: activeAudience === null ? '#ffffff' : MUTED,
                border: `0.5px solid ${activeAudience === null ? SL : BORDER}`,
              }}
              aria-pressed={activeAudience === null}
            >All</button>
            {audiences.map((a) => (
              <button
                key={a}
                onClick={() => setActiveAudience(activeAudience === a ? null : a)}
                className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
                style={{
                  background: activeAudience === a ? SL : '#ffffff',
                  color: activeAudience === a ? '#ffffff' : MUTED,
                  border: `0.5px solid ${activeAudience === a ? SL : BORDER}`,
                }}
                aria-pressed={activeAudience === a}
              >{a}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Org filter banner */}
      {activeOrg && (
        <div
          className="mb-4 flex items-center justify-between rounded-lg px-3 py-2 text-[12px]"
          style={{ background: '#fff8e1', border: `0.5px solid rgba(186,117,23,0.3)` }}
        >
          <span style={{ color: '#8a5a00' }}>
            Showing programs from <span className="font-semibold">{activeOrg}</span>
          </span>
          <button
            onClick={() => setActiveOrg(null)}
            className="ml-3 shrink-0 rounded px-2 py-0.5 text-[11px] font-medium transition-colors hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
            style={{ color: '#8a5a00' }}
          >
            Clear ×
          </button>
        </div>
      )}

      {/* Result count */}
      <p className="mb-4 text-[11px]" style={{ color: MUTED }}>
        {filtered.length === programs.length
          ? `${programs.length} program${programs.length !== 1 ? 's' : ''}`
          : `Showing ${filtered.length} of ${programs.length} program${programs.length !== 1 ? 's' : ''}`}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl py-12 text-center text-[13px]"
          style={{ border: `0.5px solid ${BORDER}`, color: MUTED }}
        >
          No programs match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((prog) => {
            const hasLink = Boolean(prog.url)
            const ratedTopics = RATING_TOPICS.filter(
              (t) => prog[t.key] && prog[t.key] !== 'Unspecified'
            )

            return (
              <div
                key={prog.slug}
                className="flex flex-col gap-3 rounded-xl p-5"
                style={{ border: `0.5px solid ${BORDER}`, background: '#ffffff' }}
              >
                {/* Level + audience badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                    style={{ background: SEC_BG, color: MUTED }}
                  >
                    {prog.level}
                  </span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                    style={{ background: '#e8f0fe', color: '#1a56b0' }}
                  >
                    {prog.audience}
                  </span>
                </div>

                {/* Name */}
                {hasLink ? (
                  <a
                    href={prog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1 no-underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333] rounded"
                  >
                    <span
                      className="text-[14px] font-semibold leading-snug tracking-tight group-hover:underline"
                      style={{ color: SL }}
                    >
                      {prog.name}
                    </span>
                    <span className="mt-0.5 shrink-0 text-[10px] opacity-50" style={{ color: AM }} aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                ) : (
                  <span className="text-[14px] font-semibold leading-snug tracking-tight" style={{ color: SL }}>
                    {prog.name}
                  </span>
                )}

                {/* Provider */}
                <span className="text-[11px]" style={{ color: MUTED }}>
                  Provided by <span style={{ color: SL }}>{prog.provider}</span>
                </span>

                {/* Description */}
                {prog.description && (
                  <p className="m-0 text-[12px] leading-relaxed" style={{ color: MUTED }}>
                    {prog.description}
                  </p>
                )}

                {/* Topic coverage ratings */}
                {ratedTopics.length > 0 && (
                  <div
                    className="border-t pt-3"
                    style={{ borderColor: BORDER }}
                  >
                    <span
                      className="mb-2 block text-[10px] font-medium uppercase tracking-[0.06em]"
                      style={{ color: MUTED }}
                    >
                      Topic coverage
                    </span>
                    <div className="flex flex-wrap gap-x-2 gap-y-2">
                      {RATING_TOPICS.map((t) => (
                        <RatingDot
                          key={t.key}
                          value={prog[t.key] as string}
                          label={t.label}
                        />
                      ))}
                    </div>
                    {/* Legend */}
                    <div className="mt-2 flex gap-3">
                      {(['High', 'Medium', 'Low'] as const).map((r) => {
                        const s = RATING_STYLE[r]
                        return (
                          <span key={r} className="flex items-center gap-1 text-[9px]" style={{ color: MUTED }}>
                            <span
                              className="inline-flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold"
                              style={{ background: s.bg, color: s.color }}
                            >
                              {s.label}
                            </span>
                            {r}
                          </span>
                        )
                      })}
                    </div>
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
