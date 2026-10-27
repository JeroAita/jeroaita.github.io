import Carousel from '../components/Carousel'
import { projects, sectionLeads } from '../data/content'

const PER_PAGE = 3
const pages = Array.from({ length: Math.ceil(projects.length / PER_PAGE) }, (_, i) => projects.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE))

export default function Portfolio() {
  return (
    <section id="portafolio" className="sec">
      <h2>Portafolio</h2>
      <p className="lead">{sectionLeads.portafolio}</p>
      <Carousel label="Proyectos" wide>
        {pages.map((page, i) => (
          <div className="grid3" style={{ width: '100%' }} key={i}>
            {page.map((p) => (
              <article className="card" key={p.title}>
                {p.image.src
                  ? <img className="shot" src={p.image.src} alt={p.image.alt} loading="lazy" />
                  : <div className="ph" style={{ height: 140, marginBottom: 16 }}>[Captura]</div>}
                <h3>{p.title}</h3>
                <p className="desc" style={{ color: 'var(--mute)' }}>{p.description}</p>
                <div className="tags">
                  {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
                </div>
                <div className="cta">
                  <a className="btn main" href={p.href} target="_blank" rel="noopener noreferrer">Ver más</a>
                </div>
              </article>
            ))}
          </div>
        ))}
      </Carousel>
    </section>
  )
}
