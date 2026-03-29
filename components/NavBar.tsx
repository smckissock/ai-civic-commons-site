'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'

const navLinks = [
  { label: 'Organization Registry', href: '/organizations' },
  { label: 'Program Library', href: '/programs' },
  { label: 'Policy Frameworks', href: '/frameworks' },
  { label: 'Article Repository', href: '/articles' },
  { label: 'International Development', href: '/projects' },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <Disclosure as="nav" className="border-b border-black/[0.12] bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto flex max-w-[960px] items-center gap-0 px-4 md:px-6 lg:px-8 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-shrink-0 items-center gap-3 no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333] rounded"
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              <svg width="52" height="52" viewBox="0 0 44 44" fill="none" aria-label="AI Civic Commons home">
                <circle cx="22" cy="22" r="19" stroke="#1c2333" strokeWidth="3.5" fill="none" />
                <text x="22" y="29" textAnchor="middle" fontSize="19" fontWeight="600" fill="#1c2333" letterSpacing="2">AI</text>
              </svg>
              <div className="max-w-[220px]">
                <div className="text-[25px] font-medium leading-[1.3]" style={{ color: '#1c2333', marginTop: '2px' }}>AI Civic Commons</div>
                <div className="text-[13px] leading-[1.2]" style={{ color: '#6b7280', marginTop: '-2px' }}>
                  Open resources for AI education<br />and public advocacy
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6 mx-auto">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className="text-center text-[12px] max-w-[72px] leading-[1.35] no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333] rounded px-1 py-2"
                  style={{
                    color: pathname === href ? '#1c2333' : '#6b7280',
                    fontWeight: pathname === href ? 500 : 400,
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA — desktop */}
            <Link
              href="/join"
              className="ml-auto hidden md:inline-block flex-shrink-0 rounded-lg bg-[#BA7517] px-4 py-3 text-[12px] font-medium text-white no-underline whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA7517]"
            >
              Join the Community
            </Link>

            {/* Hamburger — mobile only */}
            <DisclosureButton
              className="ml-auto inline-flex md:hidden items-center justify-center rounded p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333]"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M5 5l10 10M15 5L5 15" stroke="#1c2333" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M3 6h14M3 10h14M3 14h14" stroke="#1c2333" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </DisclosureButton>
          </div>

          {/* Mobile dropdown */}
          <DisclosurePanel className="md:hidden border-t border-black/[0.12]">
            <div className="flex flex-col px-4 py-2">
              {navLinks.map(({ label, href }) => (
                <DisclosureButton
                  key={href}
                  as={Link}
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className="block py-3 text-[14px] no-underline focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#1c2333] rounded"
                  style={{
                    color: pathname === href ? '#1c2333' : '#6b7280',
                    fontWeight: pathname === href ? 500 : 400,
                  }}
                >
                  {label}
                </DisclosureButton>
              ))}
              <DisclosureButton
                as={Link}
                href="/join"
                className="mt-2 mb-2 block rounded-lg bg-[#BA7517] px-4 py-3 text-center text-[14px] font-medium text-white no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA7517]"
              >
                Join the Community
              </DisclosureButton>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}
