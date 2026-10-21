# Plan: tags múltiples, botón "Ver más", imágenes cableadas y documentación

Fecha: 2026-10-21
Estado: esperando aprobación

## Contexto

El usuario viene reemplanzando placeholders por datos reales en `src/data/content.ts` y dejó
anotados tres cambios pendientes:

1. Metodología: los textos de los globos de diálogo (`text-align: justify` → centrado).
2. Portafolio: botón único "Ver más" en todas las tarjetas + soporte de varios tags por tarjeta.
3. Imágenes: faltaba documentar dónde van las imágenes del sitio (Hero, tarjetas de Ingeniería,
   tarjetas de Portafolio). Hoy `content.ts` sólo tiene `photos[].src` (sección Fotografía);
   el resto de los `.ph` son placeholders hardcodeados en los componentes.

**Estado del type-check: hoy `npm run build` falla.** `src/data/content.ts` tiene `tag` repetido
en los 5 objetos de `projects` (TS1117) y un `src: ''` que no existe en el tipo `Project` (TS2353).
Este plan corrige eso de paso.

### Decisiones tomadas (consulta al usuario)

| Decisión | Valor |
|---|---|
| Alcance de las imágenes | Cablear ahora (campos + render con fallback) **y** documentar en el README |
| Ubicación de los archivos | `public/images/…` referenciado como URL en `content.ts` |
| Imágenes por nivel de Ingeniería | Cantidad **variable** por nivel (1 → 1 columna; 2+ → 2 columnas) |
| Proyectos sin link (`href: 'NULL'`) | **Se deja el link como está** (literal `'NULL'`); sólo cambia el texto del botón |
| Label del botón | Fijo "Ver más" (se elimina el campo `action` del tipo `Project`) |

## Cambios

### 1. Metodología — globos centrados

`src/styles/base.css:106` — `.bubble`: cambiar `text-align: justify` por `text-align: center`.

Sin cambios en `Methodology.tsx`. El triángulo `::before` de la burbuja sigue anclado a `left: 50%`
(base.css:107), así que el centrado no lo desalinea.

### 2. Portafolio — "Ver más" + tags múltiples

#### 2.1 `src/data/content.ts`

- Tipo `Project`: `tag: string` → `tags: string[]`; **eliminar** `action: 'Código' | 'Leer'`;
  agregar `image: ImageRef`.
- Tipo nuevo compartido (al inicio del archivo):

```ts
export type ImageRef = { src: string; alt: string }
```

- Los `tag:` duplicados del usuario se convierten en arrays (`tags: ['Django REST', 'React', 'MySQL']`).
- El `src: ''` que el usuario ya había puesto en el primer proyecto pasa a `image: { src: '', alt: '…' }`.
- Todos los proyectos quedan con `image: { src: '', alt: '…' }` (vacío ⇒ se mantiene el placeholder).

#### 2.2 `src/sections/Portfolio.tsx`

```tsx
{p.image?.src
  ? <img className="shot" src={p.image.src} alt={p.image.alt} loading="lazy" />
  : <div className="ph" style={{ height: 140, marginBottom: 16 }}>[Captura]</div>}
<h3>{p.title}</h3>
<p style={{ color: 'var(--mute)' }}>{p.description}</p>
<div className="tags">
  {p.tags.map((t) => <span className="chip" key={t}>{t}</span>)}
</div>
<div className="cta">
  <a className="btn main" href={p.href} target="_blank" rel="noopener noreferrer">Ver más</a>
</div>
```

- El texto "Ver más" queda hardcodeado en el componente (deja de ser dato editable).
- `href: 'NULL'` se mantiene literal, tal como pidió el usuario.

#### 2.3 `src/styles/base.css` — chips agrupados

- `.grid3 .chip { align-self: flex-start; }` (línea 33) → `.grid3 .tags { align-self: flex-start; }`
  (el chip ya no es hijo directo de la tarjeta).
- Agregar junto a `.chip` (línea 35):

```css
.tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 0 0 12px; }
.tags .chip { margin: 0; }
```

- `.chip` conserva `margin: 0 6px 8px 0` (base.css:35) para usos fuera de `.tags`; dentro de `.tags`
  manda el `gap` de 8px (evita doble separación).

### 3. Imágenes — cableado en las 3 secciones

Convención única: **archivos en `public/images/…`** (Vite copia `public/` tal cual a `dist/`; la
carpeta `public/` ya existe y está vacía) + **ruta como string en `content.ts`** + `alt` obligatorio.
Si `src` está vacío ⇒ se renderiza el placeholder `.ph` actual (sin cambios de layout).

#### 3.1 Hero / "Sobre mí"

`content.ts` → `profile.photo: ImageRef` (`src: ''` initially).
`src/sections/Hero.tsx:40`:

```tsx
{profile.photo.src
  ? <img className="hero-photo" src={profile.photo.src} alt={profile.photo.alt} />
  : <div className="ph" style={{ height: 340 }}>[Tu foto]</div>}
```

CSS: `.hero-photo { display: block; width: 100%; height: 340px; object-fit: cover; border-radius: 10px; }`
(misma métrica que el `.ph` de 340px, para que el marco polaroid no cambie de alto).

#### 3.2 Ingeniería (1..N imágenes por nivel)

`content.ts`: `levels` pasa de `.map()` a un array explícito de 5 objetos, cada uno con `images: ImageRef[]`:

```ts
export type Level = { name: string; text: string; images: ImageRef[] }

export const levels: Level[] = [
  { name: 'Sistemas', text: '…', images: [] },
  { name: 'Gestión', text: '…', images: [] },
  { name: 'Software', text: '…', images: [] },
  { name: 'Infraestructura', text: '…', images: [] },
  { name: 'Ingeniería', text: '…', images: [] },
]
```

(Los textos son los actuales; sólo cambia la forma del objeto para poder agregar `images`.)

`src/sections/Engineering.tsx:40`:

```tsx
<div className={`imgs${l.images.length === 1 ? ' one' : ''}`}>
  {l.images.length > 0
    ? l.images.map((im, j) => <img key={`${im.src}-${j}`} src={im.src} alt={im.alt} loading="lazy" />)
    : [1, 2, 3, 4].map((n) => <div key={n} className="ph" style={{ height: 120 }}>[Imagen {n}]</div>)}
</div>
```

CSS: `.imgs` conserva `grid-template-columns: 1fr 1fr` (base.css:96) y se agrega

```css
.imgs.one { grid-template-columns: 1fr; }
.imgs img { display: block; width: 100%; height: 120px; object-fit: cover; border-radius: 10px; }
```

Con `images: []` (estado inicial) el render es idéntico al actual: 4 placeholders en 2×2.
Con 1 imagen ⇒ 1 columna a ancho completo; con 2+ ⇒ 2 columnas.

#### 3.3 Portafolio (1 imagen por proyecto)

`content.ts`: `projects[].image: ImageRef` (ver 2.1).
`src/sections/Portfolio.tsx`: ver 2.2.

CSS: `.shot { display: block; width: 100%; height: 140px; object-fit: cover; border-radius: 10px; margin-bottom: 16px; }`
(mismas métricas que el `.ph` de 140px + `margin-bottom: 16px` del fallback).

#### 3.4 Fotografía

Sin cambios de código: `photos[].src` ya renderiza `<img>` cuando no está vacío
(`src/sections/Photography.tsx:12`). Sólo se documenta la carpeta `public/images/fotografia/`.

### 4. Documentación — `README.md`

Agregar una sección **"## Imágenes"** con:

- Dónde van los archivos: `public/images/` (copiado tal cual al build; funciona en GitHub Pages).
- Estructura sugerida:

```
public/images/
├── sobre-mi/      # foto del Hero            → profile.photo
├── ingenieria/    # 1..N por nivel           → levels[].images
├── portafolio/    # 1 por proyecto           → projects[].image
└── fotografia/    # fotos de la sección      → photos[].src
```

- Convenciones: nombre en kebab-case y descriptivo (`/images/portafolio/sis.webp`); formato `.webp`
  o `.jpg`; ancho máximo ~1600px; `alt` descriptivo siempre; `src: ''` ⇒ placeholder `.ph`.
- Nota de que `href: 'NULL'` en los proyectos en construcción es un valor temporal a reemplazar.

Actualizar la sección **"## Pendiente respecto del mockup"**: la línea "Imágenes/fotos reales
(hoy son placeholders .ph)" pasa a "Imágenes reales — el mechanism y las carpetas ya están
documentados en *Imágenes*; sólo faltan los archivos y las rutas en `content.ts`".

## Desvíos de la implementación (respecto del plan)

- **Alto de las cajas de imagen**: el plan decía "misma métrica que el `.ph` de 340/140/120px", pero
  el `.ph` del mockup es `content-box` (alto declarado + 2×8 de padding + 2×1 de borde) y su caja
  **renderizada** es 358 / 158 / 138px. Medido contra el mockup, se usaron esas medidas para que
  placeholder y foto real ocupen la misma caja (sin salto de layout) y coincidan con el mockup:
  `.hero-photo` 358px, `.shot` 158px, `.imgs img` 138px. El placeholder conserva los estilos inline
  originales (`height`/`marginBottom`).
- Se **restauró el bloque comentado** de proyectos de ejemplo que estaba en `content.ts`
  (adaptado a la nueva forma `tags` + `image`), en lugar de eliminarlo.

## Verificación

1. `npm run build` (`tsc --noEmit && vite build`) — **puerta mínima**: hoy falla por los `tag`
   duplicados y el `src` sobrante; debe pasar limpio.
2. Chromium headless (Playwright vía `npx`) contra `npm run dev`:
   - `.bubble`: `getComputedStyle(el).textAlign === 'center'`.
   - Portafolio: por tarjeta, cantidad de `.chip` === `tags.length`; texto del CTA === "Ver más"
     (exactamente, sin "Código"/"Leer" en el DOM); los chips no desbordan la tarjeta
     (`chip.getBoundingClientRect().right <= card.getBoundingClientRect().right`); los CTA de
     una misma fila siguen alineados (regresión del plan 2026-10-20).
   - Imágenes: con `src: ''` se ve el `.ph` y **no** hay ningún `<img>` roto
     (`img.complete && img.naturalWidth > 0` para todas las `<img>` de la página).
   - **Prueba del camino con imagen real**: poner temporalmente un archivo en `public/images/`,
     apuntar `profile.photo.src` / `projects[0].image.src` / `levels[0].images` a él, verificar que
     la `<img>` carga y que el layout no se rompe (altura del polaroid y de la grilla `.imgs`
     iguales a las del placeholder); después **revertir** los temporales.
   - Ingeniería: con `images: []` → 4 placeholders en 2 columnas; con 1 imagen → 1 columna;
     con 2 → 2 columnas.
3. Viewport móvil (390px): sin scroll horizontal, los tags envuelven bien, el Hero y las tarjetas
   no desbordan.
4. Modo oscuro (`prefers-color-scheme: dark`): las nuevas imágenes y chips se ven bien.
5. Comparación contra el mockup: **divergencias intencionales** (pedido del usuario) — bubbles
   centrados (mockup: sin `text-align`, o sea a la izquierda), CTA "Ver más" único (mockup:
   "Código"/"Leer" por item) y tags múltiples (mockup: un solo chip). El resto, sin regresiones.
6. Cerrar los servidores de prueba al terminar.

## Archivos a tocar

| Archivo | Cambio |
|---|---|
| `src/data/content.ts` | `ImageRef`; `profile.photo`; `levels` como array explícito con `images`; `Project` con `tags: string[]` + `image` (se elimina `action`); tags duplicados → array; `src: ''` → `image` |
| `src/sections/Hero.tsx` | render de `profile.photo` con fallback `.ph` |
| `src/sections/Engineering.tsx` | render de `l.images` con fallback a 4 placeholders; clase `.imgs one` |
| `src/sections/Portfolio.tsx` | botón "Ver más" fijo; `.tags` con N chips; imagen del proyecto con fallback |
| `src/styles/base.css` | `.bubble` a `center`; `.tags` + `.grid3 .tags`; `.shot`; `.hero-photo`; `.imgs.one`; `.imgs img` |
| `README.md` | sección "Imágenes" + actualizar "Pendiente respecto del mockup" |

## Fuera de alcance

- Crear las carpetas `public/images/…` vacías (el usuario pidió documentar, no crear la estructura).
- Optimización de imágenes (compresión, `srcset`, formatos responsivos), lazy-loading ya está en
  las `<img>` nuevas y en Fotografía.
- SEO (`og:image`, `canonical`, `twitter:card`, schema.org) — sigue pendiente del README.
- Activar el deploy de GitHub Pages; ESLint/Prettier/tests.
- Commit: sólo si el usuario lo pide explícitamente al cerrar la implementación.
