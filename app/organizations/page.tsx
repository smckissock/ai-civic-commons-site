import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getAllOrganizations } from '@/lib/queries/organizations'
import OrgGrid from './OrgGrid'

export const metadata: Metadata = {
  title: 'Organization Registry | AI Civic Commons',
  description:
    'Browse the AI Civic Commons organization registry — nonprofits, think tanks, academic institutions, intergovernmental bodies, and companies working on AI governance and education.',
}

export const revalidate = 60

const SL = '#1c2333'
const MUTED = '#6b7280'
const BORDER = 'rgba(28, 35, 51, 0.12)'

export default async function OrganizationsPage() {
  const orgs = await getAllOrganizations()

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
            Organization Registry
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Nonprofits, think tanks, academic institutions, intergovernmental bodies,
            and companies working on AI governance, policy, and education.
          </p>
        </div>

        <OrgGrid orgs={orgs} />
      </main>

      <Footer />
    </>
  )
}
