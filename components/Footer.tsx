import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-black/[0.12] px-4 py-4 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[960px] flex-wrap items-center justify-between gap-2">
        <span className="text-[11px]" style={{ color: '#6b7280' }}>
          © 2026 AI Civic Commons · Open access · No ads · No single funder controls
        </span>
        <div className="flex items-center gap-3">
          <Link
            href="https://aiciviccommons.org"
            className="text-[11px] no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333] rounded"
            style={{ color: '#6b7280' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            aiciviccommons.org
            <span className="sr-only"> (opens in new tab)</span>
          </Link>
          <span
            className="rounded-full border border-black/[0.12] px-2 py-0.5 text-[10px] font-medium"
            style={{ color: '#6b7280' }}
          >
            PILOT v0.1
          </span>
        </div>
      </div>
    </footer>
  )
}
