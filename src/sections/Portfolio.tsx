import { useEffect, useState } from 'react'
import Carousel from '../components/Carousel'
import ProjectModal from '../components/ProjectModal'
import { projects, sectionLeads, type Project } from '../data/content'

const PER_PAGE = 3
const pages = Array.from({ length: Math.ceil(projects.length / PER_PAGE) }, (_, i) => projects.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE))

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8A1.5 1.5 0 0 0 13 12.5V10" />
    <path d="M9 2h5v5" />
    <path d="M14 2 7.5 8.5" />
  </svg>
)

const ProjectCard = ({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) => (
  <article className="card">
    {p.category && <span className="badge">{p.category}</span>}
    {p.image.src
      ? <img className="shot" src={p.image.src} alt={p.image.alt} loading="lazy" />
      : <div className="ph" style={{ height: 140, marginBottom: 16 }}>[Captura]</div>}
    <h3>{p.title}</h3>
    <p className="desc" style={{ color: 'var(--mute)' }}>{p.description}</p>
    <div className="tags">
      {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
    </div>
    <div className="cta">
      {p.href && (
        <a className="btn" href={p.href} target="_blank" rel="noopener noreferrer">
          Ver código
          <ExternalIcon />
        </a>
      )}
      <button type="button" className="btn main" aria-haspopup="dialog" onClick={() => onOpen(p)}>Ver más</button>
    </div>
  </article>
)

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const onChange = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile('matches' in e ? e.matches : mq.matches)
    onChange(mq)
    mq.addEventListener ? mq.addEventListener('change', onChange as any) : mq.addListener(onChange as any)
    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', onChange as any) : mq.removeListener(onChange as any)
    }
  }, [])

  return (
    <section id="portafolio" className="sec">
      <h2>Portafolio</h2>
      <p className="lead">{sectionLeads.portafolio}</p>
      <Carousel label="Proyectos" wide>
        {isMobile
          ? projects.map((p) => <ProjectCard p={p} onOpen={setActiveProject} key={p.title} />)
          : pages.map((page, i) => (
              <div className="grid3" style={{ width: '100%' }} key={i}>
                {page.map((p) => <ProjectCard p={p} onOpen={setActiveProject} key={p.title} />)}
              </div>
            ))}
      </Carousel>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  )
}
