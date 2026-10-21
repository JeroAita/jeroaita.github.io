import { useState } from 'react'
import { levels, sectionLeads } from '../data/content'

export default function Engineering() {
  const [sel, setSel] = useState(levels.length - 1)
  const [exiting, setExiting] = useState<number[]>([])

  const pick = (i: number) => {
    if (i === sel) return
    setExiting((e) => [...new Set([...e, sel])].filter((x) => x !== i))
    setSel(i)
  }
  const done = (i: number) => setExiting((e) => e.filter((x) => x !== i))

  return (
    <section id="ingenieria" className="sec">
      <h2>Ingeniería en sistemas</h2>
      <p className="lead">{sectionLeads.ingenieria}</p>
      <div className="split">
        <div className="pyr">
          {levels.map((l, i) => (
            <button key={l.name} className={`btn w${i}`} aria-pressed={i === sel} onClick={() => pick(i)}>{l.name}</button>
          ))}
        </div>
        <div className="panel">
          {levels.map((l, i) => {
            const active = i === sel
            return (
              <div
                key={l.name}
                className="card"
                aria-hidden={!active}
                inert={!active}
                onTransitionEnd={(e) => e.propertyName === 'transform' && done(i)}
                style={{
                  transform: `translateY(${active ? 0 : i < sel ? -100 : 100}%)`,
                  transition: active || exiting.includes(i) ? undefined : 'none',
                }}
              >
                <div className={`imgs${l.images.length === 1 ? ' one' : ''}`}>
                  {l.images.length > 0
                    ? l.images.map((im, j) => <img key={`${im.src}-${j}`} src={im.src} alt={im.alt} loading="lazy" />)
                    : [1, 2, 3, 4].map((n) => <div key={n} className="ph" style={{ height: 120 }}>[Imagen {n}]</div>)}
                </div>
                <h3>{l.name}</h3>
                <p style={{ color: 'var(--mute)', margin: 0 }}>{l.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
