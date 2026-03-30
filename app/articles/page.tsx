import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { getAllArticles } from '@/lib/queries/articles'
import ArticleSearch from './ArticleSearch'

export const metadata: Metadata = {
  title: 'Article Repository | AI Civic Commons',
  description:
    'Browse and search the AI Civic Commons article repository — curated resources on AI policy, governance, and civic technology.',
}

export const revalidate = 60

const SL = '#1c2333'
const MUTED = '#6b7280'
const BORDER = 'rgba(28, 35, 51, 0.12)'

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ org?: string }>
}) {
  const [articles, { org }] = await Promise.all([
    getAllArticles(),
    searchParams,
  ])

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
            Article Repository
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>
            Curated articles on AI policy, governance, and civic technology from
            across the commons.
          </p>
        </div>

        <ArticleSearch articles={articles} initialOrg={org} />
      </main>

      <Footer />
    </>
  )
}
