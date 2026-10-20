# Portafolio

React + Vite + TypeScript, publicado en GitHub Pages con GitHub Actions.

## Uso
    npm install
    npm run dev        # desarrollo
    npm run build      # type-check + build en dist/
    npm run preview    # probar el build localmente

## Contenido
Todo el texto, los proyectos y las fotos están en `src/data/content.ts`.
Los colores y la tipografía están en `src/styles/tokens.css` (incluye modo oscuro automático).

## Despliegue
Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica `dist/`.
(Settings → Pages → Source: GitHub Actions.)

## Pendiente respecto del mockup
- Flecha de ciclo "Evaluación" en Metodología.
- Íconos de correo / GitHub / LinkedIn en la sección principal.
- Menú de navegación para móvil y pruebas de accesibilidad.
