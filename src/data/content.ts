// Todo el contenido vive acá: agregar un proyecto o una foto = agregar un objeto.
// Los datos de ejemplo se reemplazan por los reales antes de publicar.
export const profile = {
  name: 'Jerónimo Aita',
  tagline: 'Analista Funcional | Desarrollador de software | Estudiante de Ingeniería',
  lead: 'Apasionado por los proyectos. Crítico de lo ya construído y explorador de oportunidades de mejora. Me interesa construir software bien diseñado que resuelva problemas de verdad. Cuando no estoy aprendiendo algo nuevo, estoy afuera con mi cámara.',
  caption: '[Código de día, luz de tarde].',
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
  ingenieria: 'Bases sólidas, más pensamiento crítico. Cinco capas de conocimiento que discretamente construyen una comprensión profunda de los sistemas de información.',
  metodologia: 'De una idea a una solución informática, sosteniendo la robustez de las metodologías clásicas e incorporando lo mejor de las nuevas prácticas.',
}

// De arriba hacia abajo, como en la pirámide del mockup.
export const levels = ['Sistemas', 'Gestión', 'Software', 'Infraestructura', 'Ingeniería'].map((name, i) => ({
  name,
  text: [
    'La integración de los conceptos: Comprender el negocio, modelar procesos, identificar oportunidades de mejora e información útil para la toma de decisiones. Diseñar sistemas que se alineen con los objetivos del negocio y acompañan su evolución.',
    'La administración de proyectos: Contexto organizacional, planificación de recursos, tiempos y equipos para llevar cada proyecto a buen puerto.',
    'La lógica: algoritmos y estructura de datos. Desde procesos en RAM y archivos, hasta microservicios interpretados en distintos lenguajes comunicados por APIs y bases de datos. Diseño de aplicaciones mantenibles, probadas y con una arquitectura pensada para crecer.',
    'La plataforma física o primordial sobre la que viven los sistemas: hardware, sistemas operativos, redes, protocolos, virtualización, computación en la nube.',
    'La solidez de las bases: ciencias aplicadas al modelado de problemas reales con rigor técnico. Matemática, análisis de señales, estadística, lógica y ciencias de la computación.',
  ][i],
}))

export const steps = [
  { name: 'Análisis', text: 'Relevar la situación, entrevistar a los stakeholders y comprender el problema. Traducir las necesidades del negocio en especificaciones técnicas: alcance, restricciones y criterios de éxito.' },
  { name: 'Diseño', text: 'Modelar una solución que funciona en papel, es coherente, mantenible y apropiada al negocio. Aplicar buenas prácticas y patrones de diseño a nivel arquitectura y a nivel objetos.' },
  { name: 'Desarrollo', text: 'Construir en incrementos pequeños y revisables código versionado desde el primer día. Desarrollar guiado por especificaciones y acelerado con agentes de IA.' },
  { name: 'Implementación y mantenimiento', text: 'Garantizar el servicio llevando el sistema a producción de manera estructurada, con pruebas automáticas y despliegues controlados que permitan la mejora continua.' },
]

export type Project = { title: string; tag: string; description: string; href: string; action: 'Código' | 'Leer' }
export const projects: Project[] = [
  { title: 'Panel de sensores domóticos', tag: 'React', description: 'Dashboard en tiempo real para seguir consumo y temperatura del hogar, con alertas y gráficas históricas.', href: 'https://github.com/anabeltran/domotica-dashboard', action: 'Código' },
  { title: 'CLI de backups incrementales', tag: 'Go', description: 'Herramienta de línea de comandos que comprime y sincroniza sólo los cambios, con verificación de integridad.', href: 'https://github.com/anabeltran/backup-cli', action: 'Código' },
  { title: 'Arquitecturas hexagonales en la práctica', tag: 'Artículo', description: 'Comparación de dos aplicaciones reales con y sin puertos y adaptadores, y qué cambió en los tests.', href: 'https://ejemplo.com/articulos/arquitectura-hexagonal', action: 'Leer' },
  { title: 'API de turnos para consultorios', tag: 'Node.js', description: 'API REST con autenticación, calendario y notificaciones por correo; desplegada con Docker Compose.', href: 'https://github.com/anabeltran/turnos-api', action: 'Código' },
  { title: 'Buscador de fotos por similitud', tag: 'TypeScript', description: 'Indexa metadatos y embeddings para encontrar fotos parecidas; incluye pipeline de miniaturas.', href: 'https://github.com/anabeltran/photo-search', action: 'Código' },
  { title: 'Estimación de esfuerzo con datos históricos', tag: 'Artículo', description: 'Cómo convertimos el registro de tareas terminadas en estimaciones más honestas para el equipo.', href: 'https://ejemplo.com/articulos/estimacion', action: 'Leer' },
]

export type Photo = { src: string; alt: string; title: string; camera: string; lens: string; aperture: string; shutter: string; iso: string }
export const photos: Photo[] = [
  { src: '', alt: 'Atardecer sobre el puerto con grúas de carga al fondo', title: 'Grúas al atardecer', camera: 'Fujifilm X-T30', lens: '35 mm', aperture: 'ƒ/5.6', shutter: '1/250 s', iso: 'ISO 160' },
  { src: '', alt: 'Calle mojada reflejando las luces de la noche', title: 'Luces sobre asfalto mojado', camera: 'Sony A6000', lens: '50 mm', aperture: 'ƒ/1.8', shutter: '1/60 s', iso: 'ISO 800' },
  { src: '', alt: 'Textura de una pared de ladrillos cubierta de musgo', title: 'Muro viejo', camera: 'Canon EOS Rebel SL2', lens: '24 mm', aperture: 'ƒ/8', shutter: '1/125 s', iso: 'ISO 400' },
]
