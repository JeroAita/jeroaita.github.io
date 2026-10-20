import { profile } from '../data/content'

export default function Hero() {
  const rows = [
    { href: `mailto:${profile.email}`, text: profile.email },
    { href: `https://github.com/${profile.github}`, text: `github.com/${profile.github}` },
    { href: `https://linkedin.com/in/${profile.linkedin}`, text: `linkedin.com/in/${profile.linkedin}` },
  ]
  return (
    <section id="inicio" className="sec hero">
      <div style={{ flex: 1, minWidth: 300 }}>
        <p className="lead" style={{ margin: '0 0 8px', fontSize: 15 }}>{profile.tagline}</p>
        <h1 style={{ fontSize: 56, lineHeight: 1.05, margin: '0 0 20px' }}>{profile.name}</h1>
        <p className="lead">{profile.lead}</p>
        <a className="btn main" href="#portafolio">Ver mis proyectos</a>
        <div className="contact">
          {/* TODO: reemplazar los espacios por los íconos (mail / GitHub / LinkedIn) del mockup */}
          {rows.map((r) => <a key={r.href} className="crow" href={r.href}><span>{r.text}</span></a>)}
        </div>
      </div>
      <figure className="polaroid" style={{ margin: 0 }}>
        <div className="ph" style={{ width: 300, height: 340 }}>[Tu foto]</div>
        <figcaption className="lead" style={{ fontSize: 13, margin: '12px 0 0' }}>{profile.caption}</figcaption>
      </figure>
    </section>
  )
}
