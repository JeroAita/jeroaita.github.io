// Todo el contenido vive acá: agregar un proyecto o una foto = agregar un objeto.
// Los datos de ejemplo se reemplazan por los reales antes de publicar.
//
// Las imágenes referencian archivos de `public/images/` (Vite los copia tal cual al build).
// `src: ''` = sin imagen: se muestra el placeholder. Ver la sección "Imágenes" del README.
export type ImageRef = { src: string; alt: string }

export type ProjectSection = { title: string; text: string }

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
  lead: [
    'Me gusta entender un proceso a fondo antes de proponer cómo mejorarlo, y dejar la solución escrita antes de escribir el código. Vengo del mundo industrial y del software de salud, y estudio Ingeniería en Sistemas en la UTN.',
    'Cuando no estoy frente a la pantalla, estoy paseando con mi cámara capturando paisajes, aves, y lo que encuentre interesante. Si tenés un proyecto en mente, ¡Escribime!',
  ],
  caption: '',
  photo: { src: '/images/sobre-mi/IMG_20260705_154702464.jpg', alt: 'Retrato de Jerónimo Aita' } as ImageRef,
  email: 'jeroaitagm@gmail.com',
  github: 'JeroAita',
  linkedin: 'Jeronimo-Aita-b2625a1b8',
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
  portafolio: 'Una colección de proyectos propios o en los que participé, desde el análisis de requerimientos hasta la implementación de funcionalidades.',
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

export type Project = {
  title: string
  category: string
  tags: string[]
  description: string
  sections?: ProjectSection[]
  href: string
  image: ImageRef
}
export const projects: Project[] = [
  { title: 'ErrorLog',
    category: 'Académico',
    tags: ['Apache Kafka', 'Ruby on Rails', 'React'],
    description: 'Desarrollé de principio a fin una demo de observabilidad de incidencias en tiempo real para sistemas distribuidos y de microservicios, basada en Apache Kafka.',
    sections: [
      { title: 'Contexto', text: 'En un sistema distribuido, cada servicio genera sus propios logs y rastrear un error a través de varios servicios es lento. Sin una vista centralizada y en tiempo real, los equipos tardan más en entender qué falló, dónde y quién se está ocupando.' },
      // TODO: indicar a cuántos desarrolladores entrevistaste (o si fueron conversaciones informales) y ajustar el verbo.
      { title: 'Análisis', text: 'Entrevisté a desarrolladores para entender cómo gestionan hoy las incidencias. De ahí salió lo que el sistema tenía que mostrar: tipo de incidencia, fragmentos útiles del log, instancia del servicio que la originó y estado de trabajo sobre ella.' },
      // TODO: sumar una frase sobre por qué elegiste Apache Kafka (decisión de diseño). Si implementaste patrones de diseño concretos, nombrarlos.
      { title: 'Solución', text: 'Los servicios publican eventos en Apache Kafka; un backend en Ruby on Rails los procesa y los almacena; y una interfaz en React permite consultar las incidencias en tiempo real, filtrarlas y priorizarlas. Definí endpoints RESTful para exponer los datos a la interfaz.' },
      { title: 'Resultado', text: 'Un flujo completo de punta a punta: los eventos se publican, se procesan, se persisten y se ven en la interfaz en tiempo real. Es una demo: su alcance es mostrar la arquitectura y el flujo, no ser un producto listo para producción.' },
      { title: 'Mi aporte', text: 'Fue un proyecto individual: hice el relevamiento, el diseño de la arquitectura, el backend y la interfaz. Me permitió practicar el ciclo completo, desde el análisis de requerimientos hasta un pipeline de eventos funcionando.' }
    ],
    href: 'https://github.com/JeroAita/ErrorLog',
    image: { src: '/images/portafolio/errorlog.jpg', alt: 'Logo de ErrorLog' }
  },
  { title: 'Sistema Integrado de Socios',
    category: 'Académico',
    tags: ['Python', 'Django REST', 'MySQL', 'Docker'],
    description: 'Diseñé y desarrollé el backend API REST de una demo de sistema ERP para la gestión de socios, cuotas, eventos y staff de clubes sociales y deportivos.',
    sections: [
      { title: 'Contexto', text: 'Un club social o deportivo maneja información muy variada: quiénes son sus socios, si pagaron la cuota, a qué clases o eventos están inscriptos y cuánto cobran los profesores o directores de eventos. Además necesita avisar a sus socios (suspensión de clases, cancelación de eventos) y poder identificarlos y ver el estado de su cuota en la portería o en otros puntos de las instalaciones.' },
      // TODO: indicar cómo fue el relevamiento (¿hablaron con un club real? ¿con quién?) y el tamaño del equipo.
      { title: 'Análisis', text: 'En equipo hicimos un proceso de relevamiento y, a partir de él, definimos las necesidades de información de estos clubes.' },
      { title: 'Solución', text: 'En equipo diseñamos un sistema web con arquitectura de tres capas, pensado para que fuera sencillo de desplegar y mantener: en el club basta con abrir un navegador e iniciar sesión.' },
      // TODO: sumar una captura o la lista de módulos que quedaron funcionando.
      { title: 'Resultado', text: 'SIS: una demo de sistema ERP para clubes sociales y deportivos, con la que los administradores pueden operar y comunicarse con sus socios.' },
      { title: 'Mi aporte', text: 'Me ocupé del backend: modelé el dominio, diseñé la API REST con Django REST Framework, implementé la autenticación con JWT, la persistencia en MySQL y la ejecución en contenedores con Docker.' },
    ],
    href: 'https://github.com/JeroAita/SIS-Sistema-Integrado-de-Socios',
    image: { src: '/images/portafolio/sis.jpg', alt: 'Captura de pantalla de interfaz para gestión de cuotas de socios del SIS' }
   },
  { title: 'Portafolio',
    category: 'Personal',
    tags: ['TypeScript', 'React', 'Vite', 'GitHub Actions'],
    description: 'Construí mi sitio web personal con TypeScript, React y Vite, y lo desplegué en GitHub Pages con GitHub Actions.',
    sections: [
      { title: 'Objetivo', text: 'Tener un lugar propio donde presentar mi perfil profesional y mis proyectos.' },
      { title: 'Diseño', text: 'Es este mismo sitio. Todo el contenido vive en un único archivo de datos, así que agregar un proyecto no requiere tocar los componentes. Tiene estilos propios con modo claro y oscuro automático, carruseles accesibles y un flujo de despliegue automatizado: cada cambio se publica en GitHub Pages mediante GitHub Actions.' }
    ],
    href: 'https://github.com/JeroAita/jeroaita.github.io',
    image: { src: '/images/portafolio/portafolio.jpg', alt: 'Captura de pantalla de la página de inicio del portafolio' } },
  { title: 'Industrial Trace',
    category: 'Profesional',
    tags: ['Análisis funcional', 'Gestión de proyectos'],
    description: '[En construcción.]',
    href: '',
    image: { src: '', alt: '' } },
  { title: 'CRM Barbería',
    category: 'Profesional',
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
