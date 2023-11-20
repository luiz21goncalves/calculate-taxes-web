import { Metadata } from 'next'
import { Roboto_Slab as RobotoSlab } from 'next/font/google'
import { ReactNode } from 'react'

import { Analytics } from '@vercel/analytics/react'

import { Header } from '@/components/header'

import './global.css'

export const metadata = {
  title: {
    template: '%s | Calcular NF-e',
    default: 'Calcular NF-e',
  },
} satisfies Metadata

const robotoSlab = RobotoSlab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
})

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html className={robotoSlab.variable} lang="pt-br">
      <body className="min-h-screen w-full bg-zinc-50 font-serif text-zinc-950 antialiased">
        <Header />
        <main className="mx-auto h-full w-full max-w-5xl px-4 py-16">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
