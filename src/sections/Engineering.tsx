import { useState } from 'react'
import { levels, sectionLeads } from '../data/content'

export default function Engineering() {
  const [sel, setSel] = useState(levels.length - 1)
  return (
    <section id="ingenieria" className="sec">
      <h2>Ingeniería en sistemas</h2>
      <p className="lead">{sectionLeads.ingenieria}</p>
      <div className="split">
        <div className="pyr">
          {levels.map((l, i) => (
            <button key={l.name} className={`btn w${i}`} aria-pressed={i === sel} onClick={() => setSel(i)}>{l.name}</button>
          ))}
        </div>
        <div className="card panel">
          <div className="imgs">{[1, 2, 3, 4].map((n) => <div key={n} className="ph" style={{ height: 120 }}>[Imagen {n}]</div>)}</div>
          <h3>{levels[sel].name}</h3>
          <p style={{ color: 'var(--mute)', margin: 0 }}>{levels[sel].text}</p>
        </div>
      </div>
    </section>
  )
}
