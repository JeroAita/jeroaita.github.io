import { useEffect, useRef } from 'react'
import type { Project } from '../data/content'

type Props = { project: Project | null; onClose: () => void }

export default function ProjectModal({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog || !project) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    if (!dialog.open) dialog.showModal()

    return () => {
      if (dialog.open) dialog.close()
      document.body.style.overflow = previous
    }
  }, [project])

  const onBackdrop = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = ref.current
    if (!dialog) return
    const rect = dialog.getBoundingClientRect()
    const outside = e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom
    if (outside) onClose()
  }

  return (
    <dialog
      ref={ref}
      className="project-modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={onBackdrop}
    >
      {project && (
        <>
          <div className="modal-head">
            <h2 id="project-modal-title">{project.title}</h2>
            <button type="button" className="modal-close" aria-label="Cerrar" onClick={onClose}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" />
              </svg>
            </button>
          </div>
          {project.image.src
            ? <img className="shot modal-shot" src={project.image.src} alt={project.image.alt} />
            : <div className="ph modal-ph">[Captura]</div>}
          {project.sections?.length ? (
            <div className="modal-sections">
              {project.sections.map((section) => (
                <div className="modal-section" key={section.title}>
                  <strong>{section.title}</strong>
                  <p className="desc">{section.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="desc">{project.description}</p>
          )}
        </>
      )}
    </dialog>
  )
}
