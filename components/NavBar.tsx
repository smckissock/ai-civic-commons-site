'use client'

import Image from 'next/image'
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
              aria-label="AI Civic Commons home"
              className="flex flex-shrink-0 items-center gap-3 no-underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c2333] rounded"
              aria-current={pathname === '/' ? 'page' : undefined}
            >
              <Image
                src="/logo-mark.svg"
                alt=""
                width={52}
                height={52}
                aria-hidden={true}
              />
              <div className="max-w-[220px]">
                <div className="text-[25px] font-medium leading-[1.3]" style={{ color: '#1c2333', marginTop: '2px' }}>AI Civic Commons</div>
                <div className="text-[13px] leading-[1.2]" style={{ color: '#6b7280', marginTop: '-2px' }}>
                  Open resources for AI education<br />and public advocacy
                </div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={pathname === href ? 'page' : undefined}
                  className={`text-center text-[12px] max-w-[72px] leading-[1.35] no-underline outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1c2333] focus-visible:rounded px-1 py-2 border-b-2 transition-colors duration-150 hover:text-[#1c2333] ${
                    pathname === href
                      ? 'text-[#1c2333] font-bold border-[#BA7517]'
                      : 'text-[#6b7280] font-normal border-transparent hover:border-[#BA7517]'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* CTA — desktop */}
            <Link
              href="/join"
              className="ml-8 hidden md:inline-block flex-shrink-0 rounded-md bg-[#BA7517] px-3 py-1.5 text-[11px] font-medium text-white no-underline text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BA7517]"
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
                  className={`block py-3 text-[14px] no-underline outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1c2333] focus-visible:rounded transition-colors duration-150 hover:text-[#1c2333] ${
                    pathname === href
                      ? 'text-[#1c2333] font-bold'
                      : 'text-[#6b7280] font-normal'
                  }`}
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
