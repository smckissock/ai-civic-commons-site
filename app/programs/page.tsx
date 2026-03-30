import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getAllPrograms } from '@/lib/queries/programs'
import ProgramGrid from './ProgramGrid'

export const metadata: Metadata = {
  title: 'Program Library | AI Civic Commons',
  description:
    'Browse curated AI education programs from around the world — filterable by level, audience, and topic coverage across ten dimensions.',
}

export const revalidate = 60

const SL = '#1c2333'
const MUTED = '#6b7280'
const BORDER = 'rgba(28, 35, 51, 0.12)'

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>
}) {
  const [programs, { org }] = await Promise.all([
    getAllPrograms(),
    searchParams,
  ])

  return (
    <>
      <NavBar />

      <main
        id="main-content"
        className="mx-auto w-full max-w-[960px] px-4 py-8 md:px-6 lg:px-8"
      >
        <div
          className="mb-6 pb-5"
          style={{ borderBottom: `0.5px solid ${BORDER}` }}
        >
          <h1
            className="mb-1 text-[22px] font-semibold leading-tight tracking-tight"
            style={{ color: SL }}
          >
            Program Library
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Curated AI education programs from global providers, rated across ten
            topic dimensions including ethics, equity, workforce guidance, and more.
          </p>
        </div>

        <ProgramGrid programs={programs} initialOrg={org} />
      </main>

      <Footer />
    </>
  )
}
