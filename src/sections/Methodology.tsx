import { Fragment, useState } from 'react'
import { sectionLeads, steps } from '../data/content'

const Arrow = () => (
  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 7h19M14 1l6 6-6 6" /></svg>
)

export default function Methodology() {
  const [sel, setSel] = useState(0)
  return (
    <section id="metodologia" className="sec">
      <h2>Metodología</h2>
      <p className="lead">{sectionLeads.metodologia}</p>
      <div className="cyc">
        <div className="eval">
          <div className="loop" />
          Evaluación
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 1l6 5-6 5" /></svg>
        </div>
        <div className="flow">
          {steps.map((s, i) => (
            <Fragment key={s.name}>
              <div className="col">
                <button className="btn step" aria-pressed={i === sel} onClick={() => setSel(i)}>{s.name}</button>
                {i === sel && <div className="bubble">{s.text}</div>}
              </div>
              {i < steps.length - 1 && <Arrow />}
            </Fragment>
          ))}
          <div className="eval-m">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 8l5-5 5 5" /></svg>
            Evaluación
          </div>
        </div>
      </div>
    </section>
  )
}
