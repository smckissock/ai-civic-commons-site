'use client'

import { useState, useMemo } from 'react'
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'

const SL = '#1c2333'
const AM = '#BA7517'
const MUTED = '#6b7280'
const SEC_BG = '#f7f7f5'
const BORDER = 'rgba(28, 35, 51, 0.12)'

const ADD_NEW = '__add_new__'

const INTERESTS = [
  'AI Education & Literacy',
  'AI Policy & Governance',
  'Ethics & Bias',
  'Workforce & Labor',
  'Youth & Schools',
  'Faith Communities',
  'Health & Medicine',
  'International Development',
]

interface Props {
  orgNames: string[]
}

export default function JoinForm({ orgNames }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [orgQuery, setOrgQuery] = useState('')
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null)
  const [newOrgName, setNewOrgName] = useState('')
  const [interests, setInterests] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filteredOrgs = useMemo(() => {
    const q = orgQuery.trim().toLowerCase()
    const matches = q
      ? orgNames.filter((o) => o.toLowerCase().includes(q))
      : orgNames
    return matches
  }, [orgQuery, orgNames])

  function toggleInterest(interest: string) {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div
        className="rounded-xl px-6 py-8 text-center"
        style={{ background: SEC_BG, border: `0.5px solid ${BORDER}` }}
      >
        <div
          className="mb-2 text-[32px]"
          aria-hidden="true"
        >
          ✓
        </div>
        <h2 className="mb-2 text-[18px] font-semibold" style={{ color: SL }}>
          Thanks for your interest!
        </h2>
        <p className="mb-4 text-[13px] leading-relaxed" style={{ color: MUTED }}>
          This is a demo form — no data has been saved. When this feature
          launches, your submission will be reviewed by the AI Civic Commons
          team.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="rounded-lg px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BA7517]"
          style={{ background: AM }}
        >
          Back to form
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7">

      {/* Demo notice */}
      <p
        className="rounded-lg px-4 py-3 text-[12px] leading-relaxed"
        style={{ background: SEC_BG, color: MUTED, border: `0.5px solid ${BORDER}` }}
      >
        <strong style={{ color: SL }}>Demo form</strong> — this form is for
        illustration purposes only. Submissions are not saved.
      </p>

      {/* Name + Email */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-name" className="text-[12px] font-medium" style={{ color: SL }}>
            Full name <span style={{ color: AM }} aria-hidden="true">*</span>
          </label>
          <input
            id="join-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Smith"
            className="rounded-lg px-3 py-2.5 text-[13px] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#1c2333] focus-visible:ring-offset-1"
            style={{
              border: `1px solid ${BORDER}`,
              color: SL,
              background: '#fff',
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="join-email" className="text-[12px] font-medium" style={{ color: SL }}>
            Email address <span style={{ color: AM }} aria-hidden="true">*</span>
          </label>
          <input
            id="join-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@example.org"
            className="rounded-lg px-3 py-2.5 text-[13px] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#1c2333] focus-visible:ring-offset-1"
            style={{
              border: `1px solid ${BORDER}`,
              color: SL,
              background: '#fff',
            }}
          />
        </div>
      </div>

      {/* Organization */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium" style={{ color: SL }}>
          Organization
        </label>
        <p className="text-[11px]" style={{ color: MUTED }}>
          Search existing organizations, or choose &ldquo;Add New Organization&rdquo; at the bottom of the list.
        </p>

        <Combobox
          value={selectedOrg}
          onChange={(val) => {
            setSelectedOrg(val)
            if (val !== ADD_NEW) setNewOrgName('')
          }}
        >
          <div className="relative">
            <ComboboxInput
              className="w-full rounded-lg py-2.5 pl-3 pr-10 text-[13px] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#1c2333] focus-visible:ring-offset-1"
              style={{
                border: `1px solid ${BORDER}`,
                color: SL,
                background: '#fff',
              }}
              placeholder="Search organizations…"
              displayValue={(val: string | null) =>
                val === ADD_NEW ? 'Add New Organization' : (val ?? '')
              }
              onChange={(e) => setOrgQuery(e.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 5l4 4 4-4" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </ComboboxButton>
          </div>

          <ComboboxOptions
            className="absolute z-10 mt-1 max-h-52 w-full overflow-auto rounded-lg py-1 text-[13px] shadow-lg focus:outline-none"
            style={{
              background: '#fff',
              border: `1px solid ${BORDER}`,
            }}
          >
            {filteredOrgs.map((org) => (
              <ComboboxOption
                key={org}
                value={org}
                className="cursor-pointer select-none px-3 py-2 data-[focus]:bg-[#f7f7f5]"
                style={{ color: SL }}
              >
                {org}
              </ComboboxOption>
            ))}
            <ComboboxOption
              value={ADD_NEW}
              className="cursor-pointer select-none border-t px-3 py-2 font-medium data-[focus]:bg-[#f7f7f5]"
              style={{ color: AM, borderColor: BORDER }}
            >
              + Add New Organization
            </ComboboxOption>
          </ComboboxOptions>
        </Combobox>

        {selectedOrg === ADD_NEW && (
          <div className="mt-2 flex flex-col gap-1.5">
            <label htmlFor="join-new-org" className="text-[12px] font-medium" style={{ color: SL }}>
              New organization name
            </label>
            <input
              id="join-new-org"
              type="text"
              value={newOrgName}
              onChange={(e) => setNewOrgName(e.target.value)}
              placeholder="Enter organization name"
              className="rounded-lg px-3 py-2.5 text-[13px] outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#1c2333] focus-visible:ring-offset-1"
              style={{
                border: `1px solid ${BORDER}`,
                color: SL,
                background: '#fff',
              }}
            />
          </div>
        )}
      </div>

      {/* Interests */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-[12px] font-medium" style={{ color: SL }}>
          Areas of interest
        </legend>
        <p className="text-[11px]" style={{ color: MUTED }}>
          Select all that apply.
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {INTERESTS.map((interest) => (
            <label
              key={interest}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 transition-colors"
              style={{
                border: `1px solid ${interests.includes(interest) ? AM : BORDER}`,
                background: interests.includes(interest) ? 'rgba(186,117,23,0.06)' : '#fff',
              }}
            >
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => toggleInterest(interest)}
                className="h-3.5 w-3.5 rounded accent-[#BA7517] focus-visible:ring-2 focus-visible:ring-[#BA7517]"
              />
              <span className="text-[12px] leading-snug" style={{ color: SL }}>
                {interest}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Description */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="join-description" className="text-[12px] font-medium" style={{ color: SL }}>
          Describe your interest in AI policy and education
        </label>
        <p className="text-[11px]" style={{ color: MUTED }}>
          What draws you to this work? What are you hoping to contribute or learn?
        </p>
        <textarea
          id="join-description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about your background, the communities you serve, and how you engage with AI policy…"
          className="resize-y rounded-lg px-3 py-2.5 text-[13px] leading-relaxed outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-[#1c2333] focus-visible:ring-offset-1"
          style={{
            border: `1px solid ${BORDER}`,
            color: SL,
            background: '#fff',
            minHeight: '110px',
          }}
        />
      </div>

      {/* Submit */}
      <div
        className="flex items-center justify-between gap-4 rounded-xl px-5 py-4"
        style={{ background: SEC_BG, border: `0.5px solid ${BORDER}` }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: MUTED }}>
          By submitting, you agree to be contacted by the AI Civic Commons
          team. No data is stored in this demo.
        </p>
        <button
          type="submit"
          className="flex-shrink-0 rounded-lg px-5 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BA7517]"
          style={{ background: AM }}
        >
          Submit
        </button>
      </div>

    </form>
  )
}
