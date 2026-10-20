import { Children, useRef, useState, type ReactNode } from 'react'

const Chevron = ({ d }: { d: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
)

/** Cada hijo es una "página". Desliza con scroll-snap (táctil nativo) y con las flechas. */
export default function Carousel({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const slides = Children.toArray(children)

  const go = (to: number) => {
    const el = ref.current
    if (!el) return
    const next = (to + slides.length) % slides.length
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }
  const onScroll = () => {
    const el = ref.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div role="region" aria-roledescription="carrusel" aria-label={label}>
      <div className="track" ref={ref} onScroll={onScroll}>
        {slides.map((s, i) => (
          <div className="slide" key={i} aria-hidden={i !== index}>{s}</div>
        ))}
      </div>
      <div className="pager">
        <div className="dots">{slides.map((_, i) => <span key={i} className={i === index ? 'dot on' : 'dot'} />)}</div>
        <div className="seg">
          <button className="arr" aria-label={`${label}: anterior`} onClick={() => go(index - 1)}><Chevron d="M10 3L5 8l5 5" /></button>
          <button className="arr" aria-label={`${label}: siguiente`} onClick={() => go(index + 1)}><Chevron d="M6 3l5 5-5 5" /></button>
        </div>
      </div>
    </div>
  )
}
