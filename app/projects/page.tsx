import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getAllProjects } from '@/lib/queries/projects'
import ProjectSearch from './ProjectSearch'

export const metadata: Metadata = {
  title: 'International Development Projects | AI Civic Commons',
  description:
    'Browse AI-for-development projects across health, agriculture, education, governance, and more — searchable by sector, country, and organization.',
}

export const revalidate = 60

const SL = '#1c2333'
const MUTED = '#6b7280'
const BORDER = 'rgba(28, 35, 51, 0.12)'

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <>
      <NavBar />

      <main
        id="main-content"
        className="mx-auto w-full max-w-[960px] px-4 py-8 md:px-6 lg:px-8"
      >
        {/* Page header */}
        <div
          className="mb-6 pb-5"
          style={{ borderBottom: `0.5px solid ${BORDER}` }}
        >
          <h1
            className="mb-1 text-[22px] font-semibold leading-tight tracking-tight"
            style={{ color: SL }}
          >
            International Development Projects
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            AI-for-development projects in health, agriculture, education, governance,
            and more — spanning the Global South and beyond.
          </p>
        </div>

        <ProjectSearch projects={projects} />
      </main>

      <Footer />
    </>
  )
}
