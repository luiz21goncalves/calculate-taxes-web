import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement, ReactElement } from 'react'

import { LinkProps as ChakraLinkPros } from '@chakra-ui/react'

type ActiveLinkProps = {
  children: ReactElement
} & LinkProps

export function ActiveLink(props: ActiveLinkProps) {
  const { children, ...attrs } = props

  const { asPath } = useRouter()

  let isActive = false

  if (asPath === attrs.href || asPath === attrs.as) {
    isActive = true
  }

  return (
    <Link {...attrs}>
      {cloneElement<ChakraLinkPros>(children, {
        color: isActive ? 'gray.200' : 'gray.400',
        borderBottom: isActive && '1px solid',
      })}
    </Link>
  )
}
