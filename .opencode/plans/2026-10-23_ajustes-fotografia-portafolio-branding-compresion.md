# Plan: Ajustes a portafolio, fotografía, branding y compresión de imágenes

Fecha: 2026-10-23  
Estado: aprobado

## Contexto

Se continuó reemplazando placeholders y quedaron 4 ajustes pendientes:

1. **Portafolio**: añadir un borde a las imágenes de las tarjetas (solo esas). Las capturas con fondo blanco se confunden con el fondo de la tarjeta.
2. **Fotografía**: lograr que todas las fotos tengan un alto máximo cercano a 750px (proporcional en mobile), escalar al mismo alto para no incomodar al pasar entre ellas, respetando proporciones 4:3/3:4/3:2/1:1. El alto de la tarjeta depende hoy del alto de la imagen más alta; debería depender de las dimensiones de cada imagen. 
3. **Título, ícono y logo**: `index.html` tiene título/favicon hardcodeados (aún con nombre antiguo) y el `mark`/logo del navbar también están fijos. Deben ser configurables desde `src/data/content.ts`.
4. **Compresión**: no hay compresión aplicada. Se necesita comprimir para no generar un sitio pesado, pero mantener calidad razonable en la sección Fotografía.

## Decisiones tomadas

| Decisión | Valor |
|---|---|
| Alto de fotografía (desktop) | `min(750px, 78vh)` (recomendado). En mobile el ancho limita y las alturas varían naturalmente; el ancho escala sin distorsionar. |
| Tarjeta de fotografía | Debe ajustarse al tamaño de la imagen (no al alto máximo). Usar `width: fit-content` con `max-width: 100%` para que el `<figure class="pol">` se adapte al ancho calculado. |
| Borde en portafolio | Solo `.shot` (imágenes de tarjetas de proyecto). Usar borde sutil acorde al sistema (`var(--line)`) con radio consistente. |
| Configuración de branding | Nuevo export `site` en `src/data/content.ts` con `title`, `description`, `mark` (texto corto para el logo), `favicon` (ruta opcional en `public/` o vacío para generar SVG). |
| Aplicación de título/favicon | Actualizar `index.html` con valores por defecto razonables y sobreescribir dinámicamente desde React (`document.title`, `<link rel="icon">`, meta tags) para mantenerlo configurable desde `content.ts`. |
| Compresión | Script postbuild con `sharp` (devDependency). Optimizar `dist/images/` sin tocar originales. Límites distintos por carpeta: Fotografía hasta 2400px lado mayor JPEG q90; Hero/Ingeniería 2000px lado mayor JPEG q90; Portafolio PNG sin pérdida o recomprimido conservador; otros según corresponda. |
| Formato/calidad | Mantener `.jpg`/.png actuales. No cambiar rutas masivamente. | 

## Cambios propuestos

### 1. Portafolio - borde en imágenes de tarjetas

**`src/styles/base.css`**
```css
.shot { display: block; width: 100%; height: 158px; object-fit: cover; border-radius: 10px; margin-bottom: 16px; border: 1px solid var(--line); }
```

### 2. Fotografía - alto uniforme ~750px, tarjeta adaptada a imagen

**`src/sections/Photography.tsx`**
```tsx
{f.src ? <img src={f.src} alt={f.alt} loading="lazy" /> : <div className="ph">{f.alt}</div>}
```

**`src/styles/base.css`**
```css
.pol { width: fit-content; max-width: 100%; margin: 0; background: linear-gradient(var(--card1), var(--card2)); border: 1px solid var(--line); border-radius: 6px; padding: 16px 16px 0; box-shadow: 0 1px 0 var(--hi) inset, 0 4px 14px var(--sh); align-self: flex-start; }
.pol img { display: block; width: auto; height: auto; max-width: 100%; max-height: min(750px, 78vh); border-radius: 4px; }
```

### 3. Configuración desde `content.ts` (título, favicon, mark/logo)

**`src/data/content.ts`**
```ts
export type SiteConfig = {
  title: string
  description: string
  mark: string
  name: string
  favicon?: string
}

export const site: SiteConfig = {
  title: 'Jerónimo Aita · Portafolio',
  description: 'Portafolio de Jerónimo Aita: ingeniería de sistemas, metodología, proyectos y fotografía.',
  mark: 'ja',
  name: 'Jerónimo Aita',
  favicon: ''
}
```

**`src/components/Header.tsx`** usar `site.mark`/`site.name`  
**`index.html`** actualizar defaults  
**`src/main.tsx`** llamar `applySiteMeta()`  
**`src/utils/siteMeta.ts`** nuevo

### 4. Compresión de imágenes

**`package.json`** agregar `sharp` y `postbuild`  
**`scripts/optimize-images.mjs`** nuevo

## Archivos a modificar/crear

| Archivo | Cambio |
|---|---|
| `src/data/content.ts` | Añadir `SiteConfig` y `site` export |
| `src/components/Header.tsx` | Usar `site.mark`/`site.name` |
| `src/sections/Photography.tsx` | Quitar estilo inline del img |
| `src/styles/base.css` | Borde en `.shot`, `.pol` fit-content, `.pol img` con max-height |
| `index.html` | Actualizar título/description/og/favicon |
| `src/main.tsx` | Llamar `applySiteMeta()` |
| `src/utils/siteMeta.ts` | Nuevo |
| `package.json` | Agregar `sharp`, `postbuild` |
| `scripts/optimize-images.mjs` | Nuevo |
