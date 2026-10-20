# AGENTS.md

Este repositorio es un proyecto React + Vite + Typescript con el propósito de construir un sitio web personal / portafolio. El mismo se despliega a GitHub Pages a través de GitHub Actions.

## Convenciones para agentes de IA

- Se trabaja con **planes**. En modo plan, el agente releva la información necesaria para diagnosticar el comportamiento actual del sistema, comprender el estado futuro deseado por el programador y redactar un plan que contiene los cambios a realizar.
- Los planes se guardan en `.opencode/plans` con nombre `YYYY-MM-DD_{text}`con `{text}` una cadena que permita identificar el plan. El agente puede guardar un plan estando en modo plan; es el único archivo que puede crear/modificar en este modo.


