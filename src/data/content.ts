// Todo el contenido vive acá: agregar un proyecto o una foto = agregar un objeto.
// Los datos de ejemplo se reemplazan por los reales antes de publicar.
export const profile = {
  name: 'Ana Beltrán',
  tagline: 'Estudiante de Ingeniería en Sistemas de Información',
  lead: 'Me interesa construir software que resuelva problemas de verdad y aprender a diseñarlo bien. Cuando no estoy programando, estoy afuera con mi cámara buscando luz.',
  caption: 'Código de día, luz de tarde.',
  email: 'ana.beltran@ejemplo.com',
  github: 'anabeltran',
  linkedin: 'anabeltran',
}

export const navItems = [
  { id: 'ingenieria', label: 'Ingeniería' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'portafolio', label: 'Portafolio' },
  { id: 'fotografia', label: 'Fotografía' },
]

export const sectionLeads = {
  ingenieria: 'Cinco capas de conocimiento que se apoyan entre sí; elegí una para ver de qué se trata.',
  metodologia: 'El ciclo que sigo en cada proyecto, de la idea al mantenimiento.',
}

// De arriba hacia abajo, como en la pirámide del mockup.
export const levels = ['Sistemas', 'Gestión', 'Software', 'Infraestructura', 'Ingeniería'].map((name, i) => ({
  name,
  text: [
    'Diseño de sistemas de información que se alineen con los objetivos del negocio y acompañan su evolución.',
    'Planificación de recursos, tiempos y equipos para llevar cada proyecto a buen puerto.',
    'Desarrollo de aplicaciones mantenibles, probadas y con una arquitectura pensada para crecer.',
    'Redes, despliegues y automatización para que todo funcione de forma confiable y repetible.',
    'La disciplina que integra las cuatro capas anteriores: resolver problemas reales con rigor técnico.',
  ][i],
}))

export const steps = [
  { name: 'Análisis', text: 'Comprender el problema y los requisitos antes de escribir una sola línea: alcance, restricciones y criterios de éxito.' },
  { name: 'Diseño', text: 'La solución debe funcionar primero en papel, ser coherente, mantenible y apropiada al negocio. Esto se logra aplicando buenas prácticas y patrones de diseño a nivel arquitectura y a nivel objetos.' },
  { name: 'Desarrollo', text: 'Construir en incrementos pequeños y revisables, con pruebas automáticas y código versionado desde el primer día.' },
  { name: 'Implementación y mantenimiento', text: 'Puesta en producción monitorizada, con despliegues repetibles y mejora continua según los datos de uso.' },
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
