import { ComponentProps } from 'react'

type ButtonProps = ComponentProps<'button'>

export function Button(props: ButtonProps) {
  const { className: _, children, disabled = false, ...attrs } = props

  return (
    <button
      className="rounded-lg bg-blue-500 px-8 py-4 text-lg font-bold text-zinc-50 transition-colors active:hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      {...attrs}
    >
      {children}
    </button>
  )
}
