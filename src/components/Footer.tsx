import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer id="contacto" className="foot">
      <div className="foot-in">
        <div><h3 style={{ margin: '0 0 4px' }}>Hablemos</h3><span style={{ color: 'var(--mute)' }}>{profile.email}</span></div>
        <a className="btn main" href={`mailto:${profile.email}`}>Enviar un correo</a>
        <div style={{ width: '100%', color: 'var(--mute)', fontSize: 13 }}>© {new Date().getFullYear()} {profile.name}. Todos los derechos reservados.</div>
      </div>
    </footer>
  )
}
