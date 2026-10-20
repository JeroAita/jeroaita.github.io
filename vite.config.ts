import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Repo "usuario.github.io" => el sitio se sirve en la raíz, no hace falta `base`.
// Si algún día lo movés a un repo con otro nombre, agregá: base: '/nombre-del-repo/'
export default defineConfig({ plugins: [react()] })
