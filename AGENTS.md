# AGENTS.md

Este repositorio es un proyecto React + Vite + Typescript con el propósito de construir un sitio web personal / portafolio. El mismo se despliega a GitHub Pages a través de GitHub Actions.

## Convenciones para agentes de IA

### Planes

- Se trabaja con **planes**. En modo plan, el agente releva la información necesaria para diagnosticar el comportamiento actual del sistema, comprender el estado futuro deseado por el programador y redactar un plan que contiene los cambios a realizar.
- El agente debe guardar el plan estando en modo plan; es el único archivo que puede crear/modificar en este modo.
- El archivo debe ser un archivo markdown con el formato según es especificado luego de esta lista de items.
- Los planes se guardan en `.opencode/plans` con nombre `YYYY-MM-DD_{text}`con `{text}` una cadena que permita identificar el plan.
- Antes de redactar un plan, relevar estado y **consultar las decisiones abiertas con la herramienta de preguntas** (acceso al mockup, alcance, deploy, contenido, tooling, etc.) en lugar de asumirlas.
- Al terminar de implementar un plan, ofrecer el commit pero **no hacerlo sin pedido explícito**.
- Luego de implementar un plan, leer nuevamente el plan con el propósito de comparar lo planificado con lo implementado. De haber diferencias o comentarios, añadirlos al final, en una sección separada por una barra (tres guiones medios `---`)

### Formato del plan

Forma básica del archivo. Podría haber subtítulos de nivel 3 de ser de utilidad, como separando sub-tareas.

~~~md
# Plan: {nombre del plan}

Fecha: {fecha del plan}
Estado: {Propuesto|Implementado}

## Objetivo

## Estado actual

## Tareas

## Fuera de alcance

---

## Comentarios adicionales
~~~

### Referencia de diseño

>
>- `mockup/Main.dc.html` es la fuente de verdad visual (valores exactos de color, tipografía, espaciado y layout). Sus estilos inline y su bloque `<style>` se replican en el sistema de estilos propio; no se copia su markup.
> - Se sirve con `python3 -m http.server -d mockup`.


La referencia de diseño se utilizó para comenzar el proyecto, y si bien continúa siendo válida, se hicieron suficientes ajustes para considerarla un prototipo lejano a la versión actual. Por lo tanto, se conserva como archivada.

### Flujo de trabajo

1. Relevar el codebase antes de tocar nada; para exploraciones amplias usar subagentes. Siempre tener en cuenta las **Condiciones vigentes** que están en la siguiente sección.
2. Redactar el plan en `.opencode/plans/` y esperar aprobación antes de implementar.
3. Implementar por fases con `todowrite`, en pasos pequeños y verificables.
4. Verificar SIEMPRE antes de dar por terminado:
   - `npm run build` (type-check + build) como puerta mínima.
   - Comparación visual contra el mockup con Chromium headless (Playwright vía `npx`). El agente no puede ver imágenes: medir con `getBoundingClientRect`/`getComputedStyle` y comparar numéricamente contra el mockup, en lugar de mirar screenshots.
   - Checks funcionales (responsive/mobile, interacciones, modo oscuro, accesibilidad) en desktop y viewport móvil.
5. Limpiar los servidores de prueba al terminar.
6. Al cerrar una sesión con cambios, dejarlo reportado (archivos tocados, verificación, pendientes).

### Condiciones vigentes

A respetar a menos que se indique explícitamente lo contrario. En caso de servir para una de las tareas, puede consultarse su modificación / eliminación.

- El sitio **no se publica** aún: `.github/` está en `.gitignore` a propósito (el workflow no se versiona). El README explica cómo reactivar el deploy.
- El contenido de `src/data/content.ts` son **datos de ejemplo**; el programador los reemplaza por los reales.
- Sin ESLint/Prettier/tests por ahora (evaluado, no implementado).
- Se mantiene scroll-snap nativo en los carruseles (no se replica el translate del mockup) para mejor UX táctil y accesibilidad.


