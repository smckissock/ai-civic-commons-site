import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getAllFrameworks } from '@/lib/queries/frameworks'
import FrameworkGrid from './FrameworkGrid'

export const metadata: Metadata = {
  title: 'Policy Frameworks | AI Civic Commons',
  description:
    'Browse international, national, and industry AI governance frameworks — regulations, principles, standards, and codes of conduct from organizations worldwide.',
}

export const revalidate = 60

const SL = '#1c2333'
const MUTED = '#6b7280'
const BORDER = 'rgba(28, 35, 51, 0.12)'

export default async function FrameworksPage() {
  const frameworks = await getAllFrameworks()

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
            Policy Frameworks
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            International, national, and industry AI governance instruments — regulations,
            principles, standards, codes of conduct, and treaties from organizations worldwide.
          </p>
        </div>

        <FrameworkGrid frameworks={frameworks} />
      </main>

      <Footer />
    </>
  )
}
