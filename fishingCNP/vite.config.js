import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { trackingApiPlugin } from './vite.plugin.tracking-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), trackingApiPlugin()],
})
