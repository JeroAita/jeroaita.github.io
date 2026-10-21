# Plan: ajustes de UI previos a datos reales

Fecha: 2026-10-20
Estado: propuesto

## Objetivo

Cuatro ajustes de UI puntuales, previos al reemplazo de los datos placeholder por datos reales:

1. Navbar: agregar botón "Sobre mí" que lleve al comienzo de la página (`#inicio`).
2. Ingeniería: transición de deslizamiento vertical entre tarjetas (hoy sólo cambia el texto de una única tarjeta); conservar "Ingeniería" como seleccionada por defecto.
3. Metodología: seleccionar "Análisis" por defecto (hoy "Diseño").
4. Portafolio: alinear los botones de las tarjetas de una fila a la misma altura (hoy "Código" y "Leer" quedan a alturas distintas).

## Estado actual (diagnóstico)

- **Navbar** (`src/components/Header.tsx:23-26`): los links se generan desde `navItems` (`src/data/content.ts:13-18`), sin "Sobre mí". El Hero ya tiene `id="inicio"` (`src/Sections/Hero.tsx:21`) y el scroll-spy (`useActiveSection`) toma los ids de `navItems`, así que sumar el item es suficiente: link, resaltado `aria-current` y menú móvil funcionan sin tocar `Header.tsx`.
- **Ingeniería** (`src/sections/Engineering.tsx`): un solo estado `sel` (default `levels.length - 1` = 4 → "Ingeniería", ya correcto por decisión del usuario: conservar) y **una única tarjeta** cuyo `<h3>`/`<p>` cambian, sin transición. Al reemplazar la tarjeta por un mazo de tarjetas, la altura del panel pasa a ser estable (hoy salta con cada selección): mejora colateral.
- **Metodología** (`src/sections/Methodology.tsx:9`): `useState(1)` → "Diseño". Debe ser `0` → "Análisis". (El mockup también defaultea `st:1`; se diverge a propósito por pedido del usuario.)
- **Portafolio** (`src/sections/Portfolio.tsx:16-24`): `.card` es bloque (`base.css:30`) y el wrapper del CTA tiene `marginTop: 8` inline, así que el botón queda a la altura de la descripción de cada tarjeta. Las tarjetas de una fila **sí** tienen igual alto (grid stretch); falta empujar el CTA al fondo. (El mockup tiene el mismo defecto; se diverge a propósito.)
- **Sistema de estilos**: CSS puro global (`src/styles/base.css` + `tokens.css`), sin ninguna `transition` declarada hoy; `prefers-reduced-motion` ya anula transiciones (`base.css:3`). React 19 (soporta `inert` boolean, ya usado en `Carousel.tsx:29`).

## Cambios

### 1. Navbar — botón "Sobre mí"

**`src/data/content.ts`**: agregar al inicio de `navItems`:

```ts
{ id: 'inicio', label: 'Sobre mí' },
```

Nada más. `Header.tsx`, scroll-spy y menú móvil se adaptan solos (ids → `section id`, href `#inicio`, `scroll-margin-top` de `.sec` ya existe).

### 2. Ingeniería — mazo de tarjetas con deslizamiento vertical

Diseño elegido (consulta al usuario): **desliza la tarjeta completa** (cada nivel es una tarjeta `.card` con su borde/fondo), apiladas en un deck recortado.

**`src/sections/Engineering.tsx`** — reemplazar la tarjeta única por:

```tsx
const [sel, setSel] = useState(levels.length - 1)   // default Ingeniería (se conserva)
const [exiting, setExiting] = useState<number[]>([])  // tarjetas que salen en vuelo

const pick = (i: number) => {
  if (i === sel) return
  setExiting((e) => [...new Set([...e, sel])].filter((x) => x !== i))
  setSel(i)
}
const done = (i: number) => setExiting((e) => e.filter((x) => x !== i))
```

```tsx
<div className="split">
  <div className="pyr">…botones igual que hoy (onClick={pick})…</div>
  <div className="panel deck">
    {levels.map((l, i) => {
      const active = i === sel
      const involved = active || exiting.includes(i)
      return (
        <div key={l.name} className="card"
             aria-hidden={!active} inert={!active}
             onTransitionEnd={(e) => e.propertyName === 'transform' && done(i)}
             style={{
               transform: `translateY(${active ? 0 : i < sel ? -100 : 100}%)`,
               transition: involved ? undefined : 'none',
             }}>
          <div className="imgs">…4 placeholders…</div>
          <h3>{l.name}</h3>
          <p style={{ color: 'var(--mute)', margin: 0 }}>{l.text}</p>
        </div>
      )
    })}
  </div>
</div>
```

Por qué esta forma:

- **Posición estática** `i < sel → -100%`, `i > sel → +100%`, `sel → 0`: todas las no-involucradas quedan fuera del viewport recortado y su cambio de objetivo es instantáneo (`transition: none`), así que en un salto largo (p. ej. Sistemas → Ingeniería) sólo salen la vieja y entran la nueva: swap limpio, sin tarjetas intermedias barriendo por el centro.
- **`exiting`**: una tarjeta en vuelo nunca pierde la transición (aunque se hagan clics rápidos); al llegar a su destino se retira de la lista y queda estática. `onTransitionEnd` sólo actúa si la propiedad es `transform`.
- Dirección automática: subir en la pirámide → la nueva entra desde arriba y la vieja sale hacia abajo; bajar → al revés. Todos los desplazamientos son exactamente ±100% de la altura del deck (grid de una fila, tarjetas con `stretch` → misma altura), por lo que durante la transición las dos tarjetas se contiguean sin costuras.
- `aria-hidden` + `inert` en las no activas (patrón ya usado en el carrusel). Sin foco ni links dentro de las tarjetas, sólo afecta lectura de pantalla.
- Carga inicial: sin cambios de `transform`, no hay animación al montar.

**`src/styles/base.css`** — `.panel` pasa a ser el deck (sólo lo usa Engineering):

```css
.panel { flex: 1; min-width: 300px; border-radius: 22px; display: grid; overflow: hidden;
         background: linear-gradient(var(--card1), var(--card2));
         box-shadow: 0 2px 8px var(--sh); }
.panel > .card { grid-area: 1 / 1; margin: 0; border-radius: 22px;
                 transition: transform .35s ease; }
```

- El marco (`.panel`) conserva fondo + sombra exterior y recorta con `overflow: hidden` + radius 22 (visual igual al actual `.card.panel` en reposo); las tarjetas hijas repiten radius 22 para llenar el recorte.
- Transición `.35s ease` (misma duración/curva que usa el mockup en su carrusel).
- `prefers-reduced-motion` global (`base.css:3`) ya la desactiva.

### 3. Metodología — default "Análisis"

**`src/sections/Methodology.tsx:9`**: `useState(1)` → `useState(0)`.

### 4. Portafolio — botones alineados al pie de cada tarjeta

**`src/styles/base.css`**:

```css
.grid3 .card { display: flex; flex-direction: column; }
.cta { display: flex; justify-content: flex-end; margin-top: auto; padding-top: 8px; }
```

(Scoped a `.grid3 .card` para no afectar el deck de Ingeniería, que también usa `.card`.)

**`src/sections/Portfolio.tsx:21`**: reemplazar el wrapper inline `style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}` por `className="cta"`.

`margin-top: auto` empuja el CTA al fondo de la tarjeta (que ya estira a la altura de la fila); `padding-top: 8px` conserva la separación mínima de 8px cuando el contenido llena la tarjeta. Las descripciones quedan con espacio libre debajo y **todos los botones de la fila quedan a la misma altura**.

## Archivos tocados

| Archivo | Cambio |
|---|---|
| `src/data/content.ts` | `navItems`: nuevo `{ id: 'inicio', label: 'Sobre mí' }` al inicio |
| `src/sections/Engineering.tsx` | mazo de 5 tarjetas + estado `exiting` + `pick`/`done` |
| `src/styles/base.css` | `.panel` → deck; `.panel > .card`; `.grid3 .card` flex; `.cta` |
| `src/sections/Methodology.tsx` | default `0` (Análisis) |
| `src/sections/Portfolio.tsx` | wrapper del CTA con clase `.cta` |

## Verificación

1. `npm run build` (type-check + build) como puerta mínima.
2. Servir (`npm run dev` + `python3 -m http.server -d mockup`) y medir con Chromium headless (Playwright vía `npx`), comparando numéricamente contra el mockup donde corresponda:
   - **Navbar**: existe link "Sobre mí" apuntando a `#inicio`, primero en el nav; clic → scroll al hero; `aria-current` en "Sobre mí" al cargar.
   - **Ingeniería**: al cargar, la tarjeta activa es "Ingeniería" (`h3` de la tarjeta sin `aria-hidden`) y su botón tiene `aria-pressed="true"`; clic en otro nivel → `transform` de la tarjeta activa en `0` y la anterior en ±100% con `transition` aplicada (verificar `getComputedStyle` durante la animación y al terminar); salto Sistemas → Ingeniería sin tarjetas intermedias visibles en el centro; `inert` sólo en la activa; altura del deck estable al cambiar de nivel.
   - **Metodología**: botón "Análisis" con `aria-pressed="true"` y su bubble visible al cargar; los otros pasos funcionan.
   - **Portafolio**: dentro de cada fila, `getBoundingClientRect().top` de los botones "Leer"/"Código" ≈ igual (misma altura); tarjetas siguen con igual alto.
3. Checks funcionales en viewport móvil (390px): menú hamburguesa con los 5 items incluido "Sobre mí"; deck de Ingeniería a ancho completo y con transición; CTAs alineados en una columna de tarjetas; sin scroll horizontal.
4. Modo oscuro (prefers-color-scheme) y `prefers-reduced-motion: reduce` → sin transición en el deck.
5. Comparación general contra el mockup: verificar que **no haya regresiones** en el resto de las secciones. Divergencias intencionales respecto del mockup (por pedido del usuario): "Sobre mí" en la nav, default "Análisis" en Metodología (mockup: Diseño), transición en Ingeniería (mockup: cambio instantáneo) y CTAs alineados al pie en Portafolio (mockup: sin alinear).
6. Cerrar todos los servidores de prueba al terminar.

## Fuera de alcance

- Reemplazo de datos placeholder por datos reales (siguiente etapa).
- Transiciones en Metodología (bubble) o en el menú móvil: el usuario indicó que Metodología "está bien".
- Activar el despliegue a GitHub Pages; ESLint/Prettier/tests.
- Commit: sólo si el usuario lo pide explícitamente al cerrar la implementación.
