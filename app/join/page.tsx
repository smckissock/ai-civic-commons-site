import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getAllOrganizations } from '@/lib/queries/organizations'
import JoinForm from './JoinForm'

export const metadata: Metadata = {
  title: 'Join the Community | AI Civic Commons',
  description:
    'Join the AI Civic Commons — a shared commons for nonprofits, libraries, faith communities, and universities working on AI education and public advocacy.',
}

export const revalidate = 3600

const SL = '#1c2333'
const MUTED = '#6b7280'
const BORDER = 'rgba(28, 35, 51, 0.12)'

export default async function JoinPage() {
  const orgs = await getAllOrganizations()
  const orgNames = orgs.map((o) => o.name)

  return (
    <>
      <NavBar />

      <main
        id="main-content"
        className="mx-auto w-full max-w-[960px] px-4 py-8 md:px-6 lg:px-8"
      >
        {/* Page header */}
        <div
          className="mb-8 pb-5"
          style={{ borderBottom: `0.5px solid ${BORDER}` }}
        >
          <h1
            className="mb-1 text-[22px] font-semibold leading-tight tracking-tight"
            style={{ color: SL }}
          >
            Join the Community
          </h1>
          <p className="max-w-prose text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Connect with hundreds of nonprofits, libraries, faith communities, and
            universities working together on AI education and public advocacy.
            Tell us about yourself and we&apos;ll be in touch.
          </p>
        </div>

        {/* Form — constrained width */}
        <div className="max-w-[640px]">
          <JoinForm orgNames={orgNames} />
        </div>
      </main>

      <Footer />
    </>
  )
}
