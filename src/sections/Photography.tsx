import Carousel from '../components/Carousel'
import { photos } from '../data/content'

export default function Photography() {
  return (
    <section id="fotografia" className="sec">
      <h2>Fotografía</h2>
      <p className="lead">Mis fotos favoritas.</p>
      <Carousel label="Fotos">
        {photos.map((f) => (
          <figure className="pol" key={f.alt}>
            {f.src ? <img src={f.src} alt={f.alt} loading="lazy" style={{ width: '100%', borderRadius: 4 }} /> : <div className="ph" style={{ height: 460 }}>{f.alt}</div>}
            <figcaption className="params">
              <b>{f.title}</b>
              {[f.camera, f.lens, f.aperture, f.shutter, f.iso].map((v) => <span key={v}>{v}</span>)}
            </figcaption>
          </figure>
        ))}
      </Carousel>
    </section>
  )
}
