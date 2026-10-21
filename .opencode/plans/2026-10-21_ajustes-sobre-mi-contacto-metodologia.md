# Plan: Ajustes sobre mí, hover de contacto y metodología

Fecha: 2026-10-21
Estado: esperando aprobación

## Contexto

Relevamiento del codebase: sitio React + Vite + TS con CSS global plano (`src/styles/base.css` + `tokens.css`). El usuario está reemplazando datos placeholder por reales y reportó mejoras. Decisiones tomadas:

- `target="_blank"` solo para links `http(s)` externos (no `mailto:`).
- Hover de `.crow`: mantener subrayado + efecto de brillo `filter: brightness(1.04)` (mismo estilo que `.btn:hover` de Ingeniería/Metodología, base.css:18).
- Márgenes Sobre mí: +40px aprox. (arriba ~112px, abajo ~40px propios).
- Imágenes de Ingeniería: **solo documentar** dónde van y cómo se agregarán (no hay imágenes en el repo todavía).
- Globos de Metodología: texto justificado.

## Cambios

### 1. Links externos abren en pestaña nueva

`target="_blank" rel="noopener noreferrer"` en todos los links `http(s)` externos:

- `src/sections/Hero.tsx:15-16` — GitHub y LinkedIn de `.crow` (no el mailto de la línea 14).
- `src/components/Footer.tsx:7` — links "LinkedIn" y "GitHub" (no el mailto).
- `src/sections/Portfolio.tsx:22` — botón `href={p.href}` de cada proyecto (todos los `projects` en content.ts:46-53 son http externos).

Implementación: agregar `target`/`rel` directamente en cada anchor.

### 2. Hover en botones de contacto (.crow)

En `src/styles/base.css:65`, mantener el subrayado y agregar el brillo:

```css
.crow:hover { filter: brightness(1.04); }
.crow:hover span:last-child { text-decoration: underline; }
```

El `filter` sobre el anchor da el mismo "cambio de brillo" que `.btn:hover` (base.css:18) y afecta al ícono `.ci` y al texto.

### 3. Más separación de la sección Sobre mí

`src/styles/base.css:54` — `.hero` (hoy `padding-top: 72px`):

```css
.hero { ...; padding-top: 112px; padding-bottom: 40px; }
```

- Arriba: 72 → 112px (separa de la barra de navegación).
- Abajo: 40px propios (además de los 88px de `.sec` de Ingeniería → ~128px totales).
- Mobile (`@media (max-width: 720px)`, bloque de base.css:69-80): el shorthand `.sec { padding: 64px 16px 0 }` (línea 70) pisa el padding de `.hero`, así que agregar `.hero { padding-top: 88px; padding-bottom: 32px; }` dentro de ese bloque para mantener la separación también en móvil.

### 4. Globos de Metodología justificados

`src/styles/base.css:105` — `.bubble`: agregar `text-align: justify;`.

### 5. Imágenes de Ingeniería: documentación (sin cambio de código)

Respuesta a "¿dónde van las imágenes?": hoy **no existen en el repo**; `Engineering.tsx:40` renderiza 4 placeholders hardcodeados (`[Imagen n]`) y `levels` (content.ts:27-36) no tiene campo de imágenes. Cuando el usuario tenga las imágenes, el flujo previsto (variable 1-4 por nivel) será:

1. Colocar los archivos en `public/images/ingenieria/` (por nivel: `public/images/ingenieria/sistemas-1.webp`, etc.). `public/` se copia tal cual al build de Vite y funciona directo en GitHub Pages.
2. Agregar a `content.ts` un campo por nivel, p. ej. `images: string[]` (vacío = placeholder), dentro de `levels`.
3. En `Engineering.tsx`, reemplazar el mapa `[1,2,3,4]` por `l.images`: si hay imágenes, `<img src={...} alt={...} loading="lazy" />`; si no, mantener el `.ph` de fallback. La grilla `.imgs` (base.css:95) pasa a adaptarse a la cantidad (1 col si 1 imagen, 2 cols si 2+).
4. Definir `alt` descriptivo por imagen en `content.ts`.

Alternativa documentada: `src/assets/` con imports de Vite (procesa/hashea, más type-safe, más verboso). No se implementa nada de esto ahora.

## Verificación

1. `npm run build` (type-check + build).
2. Servir y verificar con Chromium headless (Playwright vía `npx`):
   - Links GitHub/LinkedIn (Hero y Footer) y CTA de proyectos tienen `target="_blank"` y `rel="noopener noreferrer"`; los `mailto:` no.
   - Hover de `.crow`: subrayado + `filter: brightness(1.04)` (medir con `getComputedStyle`).
   - Distancia entre la barra y el H1 de Sobre mí y entre Sobre mí e Ingeniería (~112px / ~128px en desktop; ~88px / ~120px en móvil).
   - `.bubble` con `text-align: justify` al seleccionar un paso.
   - Sin regresiones visuales en desktop y móvil (720px).
3. Cerrar servidores de prueba.

## Archivos a tocar

- `src/sections/Hero.tsx` (target/rel en GitHub/LinkedIn)
- `src/components/Footer.tsx` (target/rel en LinkedIn/GitHub)
- `src/sections/Portfolio.tsx` (target/rel en CTA de proyectos)
- `src/styles/base.css` (hover `.crow`, padding `.hero`, `text-align` `.bubble`, bloque mobile)
