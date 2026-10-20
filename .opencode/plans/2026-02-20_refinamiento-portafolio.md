# Plan: refinamiento del portafolio contra el mockup

Fecha: 2026-02-20
Estado: propuesto

## Objetivo

Llevar la implementación actual (React + Vite + TS) a coincidir con el mockup de diseño (`mockup/Main.dc.html`), completar el contenido con datos de ejemplo, mejorar el comportamiento móvil y la accesibilidad, y dejar el repositorio documentado. El sitio **no se publica** en esta etapa (`.github` sigue en `.gitignore`).

## Estado actual (diagnóstico)

- Build funcional (`npm run build` = `tsc --noEmit && vite build`), sin lint ni tests (por decisión: no se agregan en esta etapa).
- Tokens y estilos base ya replican bien la paleta/tipografía del mockup; faltan clases y piezas puntuales.
- Divergencias principales detectadas (mockup → implementación):
  1. **Hero**: falta `.eyebrow` (tagline estilo uppercase/chico), falta el wrapper `.stack` con las dos tarjetas rotadas detrás del polaroid, la caption no usa `.cap` (itálica/mute), y los links de contacto no tienen el ícono en caja `.ci` (TODO en `Hero.tsx:17`).
  2. **Metodología**: falta el ciclo `.cyc` / `.eval` / `.loop` con la etiqueta "Evaluación" y su flecha (TODO en `Methodology.tsx:10`), y faltan las flechas svg entre pasos (mockup `Main.dc.html:138`).
  3. **Footer**: solo muestra el email; el mockup muestra `email · LinkedIn · GitHub`.
  4. **Carrusel**: el mockup envuelve el track en `.view` (overflow oculto con margen negativo); el actual usa scroll-snap nativo sin `.view`. Decisión: **mantener scroll-snap** (mejor UX táctil y accesibilidad) y replicar sólo lo visual (`.view`, paddings, dots, seg).
  5. Contenido 100% placeholder en `src/data/content.ts`; `index.html` con title/description placeholders.
  6. Mobile: sin menú de navegación colapsable; h1 56px sin reducir; el ciclo de Metodología no está pensado para columna.

## Fases de trabajo

### Fase 1 — Fidelidad visual con el mockup

Valores de referencia: bloque `<style>` de `mockup/Main.dc.html:15-86` y markup de cada sección.

1. **`src/styles/base.css`** — agregar clases que faltan, tomando los valores del mockup:
   - `.eyebrow` (Montserrat 12px/600, letter-spacing .12em, uppercase, `--mute`, margin `0 0 8px`).
   - `.stack` (340px, relative) + `::before`/`::after` (tarjetas rotadas -5°/3°) y `.polaroid` relative z-index 1.
   - `.cap` (13px, `--mute`, itálica).
   - `.ci` (32px, radius 9px, gradiente `--g1/--g2`, borde y sombra como el mockup:85).
   - `.cyc` (relative, padding `40px 28px 0`), `.eval` (overlay superior, centerado, 13px mute), `.loop` (borde 1.5px `--mute`, radius 14px, con los tres `mask` del mockup:61) y `.eval svg` (flecha al extremo izquierdo inferior).
   - `.view` (overflow hidden, padding `6px 8px 18px`, margen negativo) para los carruseles.
   - Ajustes menores: `.chip` margin `0 6px 8px 0`, `.flow` con `position:relative; z-index:1` y svg entre pasos con `margin-top:21px`, paddings de `.step` (`8px 12px`, font-size 15px).

2. **`src/sections/Hero.tsx`**:
   - Tagline con `className="eyebrow"` (no `.lead`).
   - Envolver el figure en `<div className="stack">`.
   - Caption con `className="cap"`.
   - Cada fila de contacto: `<span className="ci">` + svg (mail / GitHub / LinkedIn, copiados del mockup:109, con `aria-hidden="true"`) + texto.

3. **`src/sections/Methodology.tsx`**:
   - Envolver el flow en `<div className="cyc">` e insertar antes del flow el bloque `.eval` con `.loop`, el texto "Evaluación" y la svg-flecha (mockup:136).
   - Insertar la svg-flecha horizontal (22×14, path `M1 7h19M14 1l6 6-6 6`) entre columnas, excepto después de la última.
   - Seleccionar por defecto el paso "Diseño" (índice 1) como en el mockup.

4. **`src/components/Footer.tsx`**: línea `--mute` con `email · LinkedIn · GitHub` (LinkedIn/GitHub como enlaces a sus URLs desde `profile`).

5. **`src/components/Carousel.tsx`** (+ secciones que lo usan): envolver el track en `<div className="view">`; verificar paddings de `.slide` y posición de `.pager` contra el mockup. Se mantiene scroll-snap y wrap-around de flechas.

### Fase 2 — Contenido de ejemplo en `src/data/content.ts`

Reemplazar todos los placeholders con datos de ejemplo coherentes (el usuario los reemplazará después):

- `profile`: nombre, lead de dos líneas, caption, email/github/linkedin de ejemplo.
- `levels`: un texto corto por nivel (5).
- `steps`: textos de Análisis, Desarrollo e Implementación; conservar el texto de Diseño tal cual (viene del mockup).
- `projects`: 6 proyectos de ejemplo (3 repos + 3 publicaciones alternados) con tags reales (React, TypeScript, Node, etc.), descripciones y href de ejemplo.
- `photos`: 3 fotos con datos EXIF de ejemplo en el formato del mockup: `[Cámara]`, `[Lente] mm`, `ƒ/[x]`, `1/[x] s`, `ISO [x]`. Sin imágenes reales: se conservan los placeholders `.ph` con alt descriptivos.
- `index.html`: completar `<title>` y meta description con el nombre/descripción de ejemplo.

### Fase 3 — Responsive / menú móvil (≤720px)

- **Nav**: colapsar los items en un menú simple y coherente con el diseño (propongo `<details class="navm">`/`<summary>` con la nav en columna, o botón que togglee la lista). El CTA "Contacto" se mantiene visible.
- Reducir el h1 (56px → ~36px) y el gap del hero en mobile.
- Metodología en mobile: el flow ya se apila en columna; evaluar ocultar `.loop`/`.eval` en ≤720px si el overlay queda mal (mantener la etiqueta "Evaluación" como texto sobre la flecha entre Implementación y Análisis si es posible).
- Verificar `.stack`/polaroid y los carruseles en viewport angosto.

### Fase 4 — Accesibilidad

- `Header.tsx`: emitir `aria-current` sólo cuando la sección está activa (`undefined` en el resto, no `"false"`).
- `Carousel.tsx`: los slides ocultos tienen links tabulables fuera de pantalla; marcarlos con `inert` (o `tabIndex={-1}` en su contenido) cuando `i !== index`.
- Verificación manual: navegación completa por teclado, contraste en modo claro/oscuro, lector de pantalla básico en header/carrusel/pirámide (labels y aria-pressed). Opcional: auditoría con Lighthouse/axe desde DevTools (sin agregar dependencias).

### Fase 5 — Housekeeping

- `README.md`: actualizar la sección "Pendiente respecto del mockup" (marcar lo completado), documentar el contenido del mockup y **cómo reactivar el despliegue** (quitar `.github` de `.gitignore`, commitear el workflow, Settings → Pages → Source: GitHub Actions). Dejar anotado que al activarse habrá que definir `base` en `vite.config.ts` si el sitio no vive en la raíz del dominio.
- `.gitignore`: sin cambios (el mockup y el workflow quedan ignorados a propósito en esta etapa).

## Verificación

1. `npm run build` debe pasar (type-check + build).
2. `npm run dev` + servir el mockup (`python3 -m http.server -d mockup`) y comparar sección por sección en claro y oscuro.
3. Simular viewport móvil (DevTools) y recorrer nav, hero, pirámide, ciclo y carruseles.
4. Recorrido por teclado completo + `aria-current` correcto en el header.

## Fuera de alcance

- Activar el despliegue a GitHub Pages.
- ESLint / Prettier / Vitest (decidido: nada por ahora).
- Contenido real del usuario y fotos/imágenes reales.
- SEO ampliado (og:image, canonical, schema.org).
