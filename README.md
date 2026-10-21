# Portafolio

React + Vite + TypeScript, publicado en GitHub Pages con GitHub Actions.

## Uso
    npm install
    npm run dev        # desarrollo
    npm run build      # type-check + build en dist/
    npm run preview    # probar el build localmente

## Contenido
Todo el texto, los proyectos y las fotos están en `src/data/content.ts` (hoy con datos de ejemplo).
Los colores y la tipografía están en `src/styles/tokens.css` (incluye modo oscuro automático).

Las imágenes se alocan en `public/images/`. Vite los copia tal cual al build, así que en GitHub Pages quedan en la raíz del sitio.
En `src/data/content.ts` se referencia la ruta como string: `{ src: '/images/…/archivo.webp', alt: 'Descripción' }`.

`src: ''` = sin imagen: se mantiene el placeholder `.ph`.

Convenciones: 
- Nombre en `kebab-case` y descriptivo (`/images/portafolio/sis.webp`)
- Formato  `.webp` o `.jpg`, ancho máximo ~1600px, y texto `alt` siempre descriptivo.
- Los proyectos en construcción usan `href: 'NULL'` como valor temporal: reemplazarlo por la URL real.
## Mockup
`mockup/Main.dc.html` es la referencia de diseño (valores exactos de color, tipografía, espaciado y layout).
Se sirve con `python3 -m http.server -d mockup` y se compara sección por sección contra `npm run dev`.
No es código de producción: la implementación replica sus valores con el sistema de estilos propio.

## Despliegue
Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica `dist/`.
(Settings → Pages → Source: GitHub Actions.)

**Hoy el despliegue está desactivado a propósito:** `.gitignore` ignora `.github/`, así que el
workflow no se versiona. Para reactivarlo:
1. Quitar la línea `.github` de `.gitignore`.
2. Commitear `.github/workflows/deploy.yml`.
3. Settings → Pages → Source: GitHub Actions.

Si el sitio no vive en la raíz de un dominio (`usuario.github.io`), definir `base` en `vite.config.ts`.

## Pendiente respecto del mockup
- Reemplazar los datos de ejemplo de `src/data/content.ts` (nombre, bio, proyectos) por los reales.
- Imágenes/fotos reales: el mecanismo y las carpetas ya están documentados en *Imágenes*; faltan
  los archivos y las rutas en `content.ts` (foto del Hero, fotos por nivel, capturas por proyecto,
  fotos de Fotografía).
- Reemplazar el `href: 'NULL'` de los proyectos en construcción por su URL real.
- SEO ampliado: `og:image`, `canonical`, `twitter:card`, schema.org.
- Herramientas de calidad (ESLint/Prettier/tests) — evaluadas para más adelante.
