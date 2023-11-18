import { NavLink } from './nav-link'

export function Header() {
  return (
    <header className="flex h-20 w-full items-center justify-center bg-blue-950">
      <nav className="flex w-full max-w-5xl gap-4">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/import" exactMatch={false}>
          Importar XML
        </NavLink>
        <NavLink href="/timesheet">Calcular horas extras</NavLink>
      </nav>
    </header>
  )
}
