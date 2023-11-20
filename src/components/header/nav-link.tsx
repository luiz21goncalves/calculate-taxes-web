'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { twMerge } from 'tailwind-merge'

type NavLinkProps = {
  children: string
  href: string
  exactMatch?: boolean
}

export function NavLink(props: NavLinkProps) {
  const { children, href, exactMatch = true } = props

  const pathname = usePathname()

  const isActive = exactMatch ? pathname === href : pathname?.includes(href)

  return (
    <Link
      href={href}
      className={twMerge(
        'text-lg font-semibold text-zinc-50/70 transition-colors hover:text-zinc-50/50',
        isActive && 'border-b text-zinc-50',
      )}
    >
      {children}
    </Link>
  )
}
