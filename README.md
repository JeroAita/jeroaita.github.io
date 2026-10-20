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
- Imágenes/fotos reales (hoy son placeholders `.ph`): capturas de proyectos y fotos.
- SEO ampliado: `og:image`, `canonical`, `twitter:card`, schema.org.
- Herramientas de calidad (ESLint/Prettier/tests) — evaluadas para más adelante.
