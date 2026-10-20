import { useState } from 'react'
import { steps } from '../data/content'

export default function Methodology() {
  const [sel, setSel] = useState(0)
  return (
    <section id="metodologia" className="sec">
      <h2>Metodología</h2>
      <p className="lead">[texto]</p>
      {/* TODO: flecha de ciclo "Evaluación" (Implementación → Análisis), ver el mockup */}
      <div className="flow">
        {steps.map((s, i) => (
          <div className="col" key={s.name}>
            <button className="btn step" aria-pressed={i === sel} onClick={() => setSel(i)}>{s.name}</button>
            {i === sel && <div className="bubble">{s.text}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}
