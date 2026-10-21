import Carousel from '../components/Carousel'
import { projects } from '../data/content'

const PER_PAGE = 3
const pages = Array.from({ length: Math.ceil(projects.length / PER_PAGE) }, (_, i) => projects.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE))

export default function Portfolio() {
  return (
    <section id="portafolio" className="sec">
      <h2>Portafolio</h2>
      <p className="lead">Publicaciones y repositorios.</p>
      <Carousel label="Proyectos" wide>
        {pages.map((page, i) => (
          <div className="grid3" style={{ width: '100%' }} key={i}>
            {page.map((p) => (
              <article className="card" key={p.title}>
                <div className="ph" style={{ height: 140, marginBottom: 16 }}>[Captura]</div>
                <h3>{p.title}</h3>
                <p style={{ color: 'var(--mute)' }}>{p.description}</p>
                <span className="chip">{p.tag}</span>
                <div className="cta">
                  <a className="btn main" href={p.href} target="_blank" rel="noopener noreferrer">{p.action}</a>
                </div>
              </article>
            ))}
          </div>
        ))}
      </Carousel>
    </section>
  )
}
