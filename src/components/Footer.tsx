import { profile, site } from '../data/content'

export default function Footer() {
  const logoSrc = site.logo || site.mark || '/images/icons/bush_logo.png'

  return (
    <footer id="contacto" className="foot">
      <div className="foot-in foot-stack">
        <h3>Datos de contacto</h3>
        <a className="foot-brand" href="#inicio" aria-label={site.name}>
          <img className="foot-logo" src={logoSrc} alt={site.name} />
        </a>
        <p className="foot-links">
          <a href={`mailto:${profile.email}`}>{profile.email}</a> ·{' '}
          <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
          <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
        <p className="foot-copy">© {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
