import { Metadata } from 'next'
import { ReactNode } from 'react'

import './global.css'

export const metadata = {
  title: {
    template: '%s | Calcular NF-e',
    default: 'Calcular NF-e',
  },
} satisfies Metadata

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="pt-br">
      <body className="bg-zinc-50 text-zinc-950 antialiased">{children}</body>
    </html>
  )
}
