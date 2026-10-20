import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = navItems.map((n) => n.id)

export default function Header() {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="bar">
      <a className="logo" href="#inicio"><span className="mark">ab</span>{profile.name}</a>
      <div className="tools">
        <nav id="nav" className={open ? 'nav open' : 'nav'} aria-label="Principal">
          {navItems.map((n) => (
            <a key={n.id} className="btn nav-i" href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </nav>
        <a className="btn main" href="#contacto">Contacto</a>
        <button type="button" className="menu-tg" aria-expanded={open} aria-controls="nav" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen((o) => !o)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M4 4l8 8M12 4l-8 8" /> : <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />}
          </svg>
        </button>
      </div>
    </header>
  )
}
