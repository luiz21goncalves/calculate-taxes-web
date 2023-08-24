import { Link } from '@chakra-ui/react'

import { ActiveLink } from './ActiveLink'

type NavLinkProps = {
  children: string
  href: string
}

export function NavLink(props: NavLinkProps) {
  const { children, href } = props

  return (
    <ActiveLink href={href} passHref>
      <Link fontSize="lg" fontWeight="bold" _hover={{ opacity: 0.6 }}>
        {children}
      </Link>
    </ActiveLink>
  )
}
