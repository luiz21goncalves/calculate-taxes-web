import { ReactNode } from 'react'

import { Upload } from './upload'

type ImportLayoutProps = {
  children: ReactNode
}

export default function ImportLayout(props: ImportLayoutProps) {
  const { children } = props

  return (
    <div className="flex flex-col gap-8">
      <Upload />
      {children}
    </div>
  )
}
