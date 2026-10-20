import { navItems, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = navItems.map((n) => n.id)

export default function Header() {
  const active = useActiveSection(ids)
  return (
    <header className="bar">
      <a className="logo" href="#inicio"><span className="mark">ab</span>{profile.name}</a>
      <nav className="nav" aria-label="Principal">
        {navItems.map((n) => (
          <a key={n.id} className="btn nav-i" href={`#${n.id}`} aria-current={active === n.id}>{n.label}</a>
        ))}
        <a className="btn main" href="#contacto">Contacto</a>
      </nav>
    </header>
  )
}
