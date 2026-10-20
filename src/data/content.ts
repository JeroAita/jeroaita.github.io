// Todo el contenido vive acá: agregar un proyecto o una foto = agregar un objeto.
export const profile = {
  name: '[Tu nombre]',
  tagline: 'Estudiante de Ingeniería en Sistemas de Información',
  lead: '[Dos líneas sobre vos.]',
  caption: '[Una frase corta que te represente.]',
  email: 'tu@email.com',
  github: 'usuario',
  linkedin: 'usuario',
}

export const navItems = [
  { id: 'ingenieria', label: 'Ingeniería' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'fotografia', label: 'Fotografía' },
]

// De arriba hacia abajo, como en la pirámide del mockup.
export const levels = ['Sistemas', 'Gestión', 'Software', 'Infraestructura', 'Ingeniería'].map(
  (name) => ({ name, text: '[texto]' }),
)

export const steps = [
  { name: 'Análisis', text: '[texto]' },
  { name: 'Diseño', text: 'La solución debe funcionar primero en papel, ser coherente, mantenible y apropiada al negocio. Esto se logra aplicando buenas prácticas y patrones de diseño a nivel arquitectura y a nivel objetos.' },
  { name: 'Desarrollo', text: '[texto]' },
  { name: 'Implementación y mantenimiento', text: '[texto]' },
]

export type Project = { title: string; tag: string; description: string; href: string; action: 'Código' | 'Leer' }
export const projects: Project[] = Array.from({ length: 6 }, (_, i) => {
  const pub = i % 3 === 2
  return {
    title: pub ? `[Publicación ${Math.ceil((i + 1) / 3)}]` : `[Repositorio ${i + 1}]`,
    tag: pub ? 'Artículo' : '[Tecnología]',
    description: '[Qué hace y con qué tecnologías.]',
    href: '#',
    action: pub ? 'Leer' : 'Código',
  }
})

export type Photo = { src: string; alt: string; title: string; camera: string; lens: string; aperture: string; shutter: string; iso: string }
export const photos: Photo[] = [1, 2, 3].map((n) => ({
  src: '', alt: `[Descripción de la foto ${n}]`, title: '[Título de la foto]',
  camera: '[Cámara]', lens: '[Lente] mm', aperture: 'ƒ/[x]', shutter: '1/[x] s', iso: 'ISO [x]',
}))
