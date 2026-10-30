// Todo el contenido vive acá: agregar un proyecto o una foto = agregar un objeto.
// Los datos de ejemplo se reemplazan por los reales antes de publicar.
//
// Las imágenes referencian archivos de `public/images/` (Vite los copia tal cual al build).
// `src: ''` = sin imagen: se muestra el placeholder. Ver la sección "Imágenes" del README.
export type ImageRef = { src: string; alt: string }

export type SiteConfig = {
  title: string
  description: string
  mark?: string
  logo?: string
  name: string
  favicon?: string
}

export const site: SiteConfig = {
  title: 'Jerónimo Aita · Portafolio',
  description: 'Portafolio de Jerónimo Aita: ingeniería en sistemas, metodología, proyectos y fotografía.',
  logo: '/images/icons/bush_logo.png',
  name: 'Jerónimo Aita',
  favicon: '/images/icons/bush_favicon_32.png'
}

export const profile = {
  name: 'Jerónimo Aita',
  tagline: 'Analista Funcional | Desarrollador de software | Estudiante de Ingeniería',
  lead: 'Apasionado por los proyectos. Crítico de lo ya construído y explorador de oportunidades de mejora. Me interesa construir software bien diseñado que resuelva problemas de verdad. Cuando no estoy aprendiendo algo nuevo, estoy afuera con mi cámara.',
  caption: '',
  photo: { src: '/images/sobre-mi/IMG_20260705_154702464.jpg', alt: 'Retrato de Jerónimo Aita' } as ImageRef,
  email: 'jeroaitagm@gmail.com',
  github: 'JeroAita',
  linkedin: 'Jerónimo-Aita-b2625a1b8',
}

export const navItems = [
  { id: 'inicio', label: 'Sobre mí' },
  { id: 'ingenieria', label: 'Ingeniería' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'fotografia', label: 'Fotografía' },
]

export const sectionLeads = {
  ingenieria: 'Bases sólidas más pensamiento crítico. Cinco capas de conocimiento que construyen una comprensión profunda de los sistemas de información.',
  metodologia: 'De una idea a una solución informática, sosteniendo la robustez de las metodologías clásicas e incorporando lo mejor de las nuevas prácticas.',
  portafolio: 'Una colección de proyectos propios o en los que participé, desde el análisis de requerimientos hasta la implementación de funcionalidades..',
  fotografia: 'Una pequeña galería con mis fotos favoritas.',
}

// De arriba hacia abajo, como en la pirámide del mockup.
// `images`: 1..N fotos del nivel (en `public/images/ingenieria/`). Vacío = placeholders.
export type Level = { name: string; text: string; images: ImageRef[] }

export const levels: Level[] = [
  {
    name: 'Sistemas',
    text: 'La integración de los conceptos: Comprender el negocio, modelar procesos, identificar oportunidades de mejora e información útil para la toma de decisiones. Diseñar sistemas que se alineen con los objetivos del negocio y acompañan su evolución.',
    images: [
      '/images/ingenieria/sist_oportunidades.jpg',
      '/images/ingenieria/sist_cu.jpg',
      '/images/ingenieria/sist_arquitectura.jpg',
      '/images/ingenieria/sist_bi.jpg',
    ].map(src => ({ src, alt: 'Imagen de sistemas' })),
  },
  {
    name: 'Gestión',
    text: 'La administración de proyectos: Contexto organizacional, planificación de recursos, tiempos y equipos para llevar cada proyecto a buen puerto.',
    images: [
      '/images/ingenieria/gest_gantt.jpg',
      '/images/ingenieria/gest_teampology.jpg',
      '/images/ingenieria/gest_sdlc.jpg',
      '/images/ingenieria/gest_kanban.jpg',
    ].map(src => ({ src, alt: 'Imagen de gestión' })),
  },
  {
    name: 'Software',
    text: 'La lógica: algoritmos y estructura de datos. Desde procesos en RAM y archivos, hasta microservicios interpretados en distintos lenguajes comunicados por APIs y bases de datos. Diseño de aplicaciones mantenibles, probadas y con una arquitectura pensada para crecer.',
    images: [
      '/images/ingenieria/soft_diagramaflujo.jpg',
      '/images/ingenieria/soft_codigo.jpg',
      '/images/ingenieria/soft_lenguajes.jpg',
      '/images/ingenieria/soft_diagramaer.jpg',
    ].map(src => ({ src, alt: 'Imagen de software' })),
  },
  {
    name: 'Infraestructura',
    text: 'La plataforma física o primordial sobre la que viven los sistemas: hardware, sistemas operativos, redes, protocolos, virtualización, computación en la nube.',
    images: [
      '/images/ingenieria/infr_transistores.jpg',
      '/images/ingenieria/infr_paginado.jpg',
      '/images/ingenieria/infr_red.jpg',
      '/images/ingenieria/infr_mapared.jpg',
    ].map(src => ({ src, alt: 'Imagen de infraestructura' })),
  },
  {
    name: 'Ingeniería',
    text: 'La solidez de las bases: ciencias aplicadas al modelado de problemas reales con rigor técnico. Matemática, análisis de señales, estadística, lógica y ciencias de la computación.',
    images: [
      '/images/ingenieria/ing_afd.jpg',
      '/images/ingenieria/ing_fourier.jpg',
      '/images/ingenieria/ing_normales.jpg',
      '/images/ingenieria/ing_derivada.jpg',
    ].map(src => ({ src, alt: 'Imagen de ingeniería' })),
  },
]

export const steps = [
  { name: 'Análisis', text: 'Relevar la situación, entrevistar a los stakeholders y comprender el problema. Traducir las necesidades del negocio en especificaciones técnicas: alcance, restricciones y criterios de éxito.' },
  { name: 'Diseño', text: 'Modelar una solución que funciona en papel, es coherente, mantenible y apropiada al negocio. Aplicar buenas prácticas y patrones de diseño a nivel arquitectura y a nivel objetos.' },
  { name: 'Desarrollo', text: 'Construir en incrementos pequeños y revisables código versionado desde el primer día. Desarrollar guiado por especificaciones y acelerado con agentes de IA.' },
  { name: 'Implementación y mantenimiento', text: 'Garantizar el servicio llevando el sistema a producción de manera estructurada, con pruebas automáticas y despliegues controlados que permitan la mejora continua.' },
]

export type Project = { title: string; tags: string[]; description: string; href: string; image: ImageRef }
export const projects: Project[] = [
  { title: 'ErrorLog',
    tags: ['Apache Kafka', 'Ruby on Rails', 'React'],
    description: 'Desarrollé de principio a fin una demo de capa de monitoreo de incidencias en tiempo de ejecución basado en Apache Kafka para sistemas basados en microservicios.',
    href: 'https://github.com/JeroAita/ErrorLog',
    image: { src: '/images/portafolio/errorlog.jpg', alt: 'Logo de ErrorLog' } },
  { title: 'Sistema Integrado de Socios',
    tags: ['Python', 'Django REST', 'MySQL'],
    description: 'Diseñé y desarrollé el backend API REST de un sistema ERP para la gestión de socios, cuotas, eventos y staff de clubes sociales y deportivos.',
    href: 'https://github.com/JeroAita/SIS-Sistema-Integrado-de-Socios',
    image: { src: '/images/portafolio/sis.jpg', alt: 'Captura de pantalla de interfaz para gestión de cuotas de socios del SIS' } },
  { title: 'Portafolio',
    tags: ['Typescript', 'React', 'GitHub Actions'],
    description: 'Construí mi sitio web personal. Desarrollado con Typescript + React + Vite, desplegado con Github Pages.',
    href: 'https://github.com/JeroAita/jeroaita.github.io',
    image: { src: '/images/portafolio/portafolio.jpg', alt: 'Logo de Portafolio' } },
  { title: 'Industrial Trace',
    tags: ['Análisis funcional', 'Gestión de proyectos'],
    description: '[En construcción.]',
    href: '',
    image: { src: '', alt: '' } },
  { title: 'CRM Barbería',
    tags: ['Análisis funcional', 'Gestión de proyectos'],
    description: '[En construcción.]',
    href: '',
    image: { src: '', alt: '' } },
  /*
  { title: '[Panel de sensores domóticos]', tags: ['React'], description: 'Dashboard en tiempo real para seguir consumo y temperatura del hogar, con alertas y gráficas históricas.', href: 'https://github.com/anabeltran/domotica-dashboard', image: { src: '', alt: '' } },
  { title: '[CLI de backups incrementales]', tags: ['Go'], description: 'Herramienta de línea de comandos que comprime y sincroniza sólo los cambios, con verificación de integridad.', href: 'https://github.com/anabeltran/backup-cli', image: { src: '', alt: '' } },
  { title: 'Arquitecturas hexagonales en la práctica', tags: ['Artículo'], description: 'Comparación de dos aplicaciones reales con y sin puertos y adaptadores, y qué cambió en los tests.', href: 'https://ejemplo.com/articulos/arquitectura-hexagonal', image: { src: '', alt: '' } },
  { title: '[API de turnos para consultorios]', tags: ['Node.js'], description: 'API REST con autenticación, calendario y notificaciones por correo; desplegada con Docker Compose.', href: 'https://github.com/anabeltran/turnos-api', image: { src: '', alt: '' } },
  { title: '[Buscador de fotos por similitud]', tags: ['TypeScript'], description: 'Indexa metadatos y embeddings para encontrar fotos parecidas; incluye pipeline de miniaturas.', href: 'https://github.com/anabeltran/photo-search', image: { src: '', alt: '' } },
  { title: '[Estimación de esfuerzo con datos históricos]', tags: ['Artículo'], description: 'Cómo convertimos el registro de tareas terminadas en estimaciones más honestas para el equipo.', href: 'https://ejemplo.com/articulos/estimacion', image: { src: '', alt: '' } },
  */
]

export type Photo = { src: string; alt: string; title: string; camera: string; lens: string; aperture: string; shutter: string; iso: string }
export const photos: Photo[] = [
  { src: '/images/fotografia/IMG_8956_t_de.jpg',
    alt: 'Puente Zárate Brazo Largo', title: 'Vista del puente Zárate Brazo Largo al atardecer.',
    camera: 'PowerShot SX530 HS',
    lens: '112 mm (35mm eq)',
    aperture: 'ƒ/5.3',
    shutter: '1/120 s',
    iso: 'ISO 200' },
  { src: '/images/fotografia/IMG_1044_t_de.jpg',
    alt: 'Estatua de patio', title: 'Estatua de patio.',
    camera: 'PowerShot SX530 HS',
    lens: '152 mm (35mm eq)',
    aperture: 'ƒ/5.3',
    shutter: '1/60 s',
    iso: 'ISO 800' },
  { src: '/images/fotografia/IMG_1112_t_de.jpg',
    alt: 'Vista desde la feria Smithfield', title: 'Vista desde la feria Smithfield.',
    camera: 'PowerShot SX530 HS',
    lens: '130 mm (35mm eq)',
    aperture: 'ƒ/5.9',
    shutter: '1/128 s',
    iso: 'ISO 100' },
  { src: '/images/fotografia/IMG_1485_t_de.jpg',
    alt: 'Flor urbana', title: 'Flor urbana.',
    camera: 'PowerShot SX530 HS',
    lens: '191 mm (35mm eq)',
    aperture: 'ƒ/5.3',
    shutter: '1/128 s',
    iso: 'ISO 100' },
]
