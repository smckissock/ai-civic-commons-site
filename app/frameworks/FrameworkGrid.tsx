'use client'

import { useState, useMemo } from 'react'
import type { Framework } from '@/lib/queries/frameworks'

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

const BINDING_STYLE: Record<string, { bg: string; color: string }> = {
  Binding:     { bg: '#fce8e6', color: '#9c2a20' },
  'Soft Law':  { bg: '#fff3e0', color: '#8a4a00' },
  Voluntary:   { bg: '#e6f4ea', color: '#1a6b30' },
  Unspecified: { bg: SEC_BG,    color: MUTED },
}

const TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  'Advisory Report':              { bg: '#e8f0fe', color: '#1a56b0' },
  'Code of Conduct':              { bg: '#e0f7fa', color: '#006064' },
  'Multi-stakeholder Initiative': { bg: '#f3e8fd', color: '#6a1b9a' },
  'Principles':                   { bg: '#f9fbe7', color: '#558b2f' },
  'Regulation':                   { bg: '#fce8e6', color: '#9c2a20' },
  'Standard':                     { bg: '#fff8e1', color: '#8a5a00' },
  'Treaty':                       { bg: '#fce4ec', color: '#880e4f' },
}

function bindingStyle(t: string) {
  return BINDING_STYLE[t] ?? BINDING_STYLE.Unspecified
}

function typeStyle(t: string) {
  return TYPE_STYLE[t] ?? { bg: SEC_BG, color: MUTED }
}

interface Props {
  frameworks: Framework[]
}

export default function FrameworkGrid({ frameworks }: Props) {
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState<string | null>(null)
  const [activeBinding, setActiveBinding] = useState<string | null>(null)

  const types = useMemo(
    () => Array.from(new Set(frameworks.map((f) => f.framework_type).filter(Boolean))).sort(),
    [frameworks]
  )

  const bindings = useMemo(
    () => Array.from(new Set(frameworks.map((f) => f.binding_type).filter(Boolean))).sort(),
    [frameworks]
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return frameworks.filter((f) => {
      if (activeType !== null && f.framework_type !== activeType) return false
      if (activeBinding !== null && f.binding_type !== activeBinding) return false
      if (!q) return true
      return (
        f.name.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.key_principles.toLowerCase().includes(q) ||
        f.issuing_org.toLowerCase().includes(q) ||
        f.scope.toLowerCase().includes(q)
      )
    })
  }, [frameworks, query, activeType, activeBinding])

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
            placeholder="Search by name, description, principles, or issuing org…"
            aria-label="Search frameworks"
            className="w-full rounded-lg py-2 pl-9 pr-3 text-[13px] outline-none"
            style={{ background: '#ffffff', border: `0.5px solid ${BORDER}`, color: SL }}
          />
        </div>

        {/* Framework type filter */}
        <div>
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
            Type
          </span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by framework type">
            <button
              onClick={() => setActiveType(null)}
              className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
              style={{
                background: activeType === null ? SL : '#ffffff',
                color: activeType === null ? '#ffffff' : MUTED,
                border: `0.5px solid ${activeType === null ? SL : BORDER}`,
              }}
              aria-pressed={activeType === null}
            >All</button>
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
                >{t}</button>
              )
            })}
          </div>
        </div>

        {/* Binding type filter */}
        <div>
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.06em]" style={{ color: MUTED }}>
            Legal status
          </span>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by legal status">
            <button
              onClick={() => setActiveBinding(null)}
              className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
              style={{
                background: activeBinding === null ? SL : '#ffffff',
                color: activeBinding === null ? '#ffffff' : MUTED,
                border: `0.5px solid ${activeBinding === null ? SL : BORDER}`,
              }}
              aria-pressed={activeBinding === null}
            >All</button>
            {bindings.map((b) => {
              const active = activeBinding === b
              const bs = bindingStyle(b)
              return (
                <button
                  key={b}
                  onClick={() => setActiveBinding(active ? null : b)}
                  className="rounded px-2.5 py-1 text-[11px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333]"
                  style={{
                    background: active ? bs.bg : '#ffffff',
                    color: active ? bs.color : MUTED,
                    border: `0.5px solid ${active ? bs.bg : BORDER}`,
                  }}
                  aria-pressed={active}
                >{b}</button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="mb-4 text-[11px]" style={{ color: MUTED }}>
        {filtered.length === frameworks.length
          ? `${frameworks.length} framework${frameworks.length !== 1 ? 's' : ''}`
          : `Showing ${filtered.length} of ${frameworks.length} framework${frameworks.length !== 1 ? 's' : ''}`}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div
          className="rounded-xl py-12 text-center text-[13px]"
          style={{ border: `0.5px solid ${BORDER}`, color: MUTED }}
        >
          No frameworks match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((fw) => {
            const hasLink = Boolean(fw.url)
            const ts = typeStyle(fw.framework_type)
            const bs = bindingStyle(fw.binding_type)
            const yearStr =
              fw.year_adopted && fw.year_updated && fw.year_updated !== fw.year_adopted
                ? `${fw.year_adopted}, updated ${fw.year_updated}`
                : fw.year_adopted
                ? String(fw.year_adopted)
                : ''

            return (
              <div
                key={fw.slug}
                className="flex flex-col gap-3 rounded-xl p-5"
                style={{ border: `0.5px solid ${BORDER}`, background: '#ffffff' }}
              >
                {/* Type + binding badges */}
                <div className="flex flex-wrap gap-1.5">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                    style={{ background: ts.bg, color: ts.color }}
                  >
                    {fw.framework_type}
                  </span>
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em]"
                    style={{ background: bs.bg, color: bs.color }}
                  >
                    {fw.binding_type}
                  </span>
                </div>

                {/* Name */}
                {hasLink ? (
                  <a
                    href={fw.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-1 no-underline focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#1c2333] rounded"
                  >
                    <span
                      className="text-[14px] font-semibold leading-snug tracking-tight group-hover:underline"
                      style={{ color: SL }}
                    >
                      {fw.name}
                    </span>
                    <span className="mt-0.5 shrink-0 text-[10px] opacity-50" style={{ color: AM }} aria-hidden="true">↗</span>
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                ) : (
                  <span className="text-[14px] font-semibold leading-snug tracking-tight" style={{ color: SL }}>
                    {fw.name}
                  </span>
                )}

                {/* Meta row: issuing org · scope · year */}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {fw.issuing_org && fw.issuing_org !== 'Unknown Organization' && (
                    fw.issuing_org_url ? (
                      <a
                        href={fw.issuing_org_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] no-underline hover:underline focus:outline-none focus:ring-1 focus:ring-[#1c2333] rounded"
                        style={{ color: MUTED }}
                      >
                        {fw.issuing_org}
                      </a>
                    ) : (
                      <span className="text-[11px]" style={{ color: MUTED }}>{fw.issuing_org}</span>
                    )
                  )}
                  {fw.scope && fw.scope !== 'Global' && (
                    <span className="text-[11px]" style={{ color: MUTED }}>{fw.scope}</span>
                  )}
                  {yearStr && (
                    <span className="text-[11px]" style={{ color: MUTED }}>{yearStr}</span>
                  )}
                </div>

                {/* Description */}
                {fw.description && (
                  <p className="m-0 text-[12px] leading-relaxed" style={{ color: MUTED }}>
                    {fw.description}
                  </p>
                )}

                {/* Key principles */}
                {fw.key_principles && (
                  <div className="border-t pt-3" style={{ borderColor: BORDER }}>
                    <span
                      className="mb-1 block text-[10px] font-medium uppercase tracking-[0.06em]"
                      style={{ color: MUTED }}
                    >
                      Key principles
                    </span>
                    <p className="m-0 text-[12px] leading-relaxed" style={{ color: SL }}>
                      {fw.key_principles}
                    </p>
                  </div>
                )}

                {/* Notes */}
                {fw.notes && (
                  <div className="border-t pt-3" style={{ borderColor: BORDER }}>
                    <span
                      className="mb-1 block text-[10px] font-medium uppercase tracking-[0.06em]"
                      style={{ color: MUTED }}
                    >
                      Notes
                    </span>
                    <p className="m-0 text-[12px] italic leading-relaxed" style={{ color: MUTED }}>
                      {fw.notes}
                    </p>
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
