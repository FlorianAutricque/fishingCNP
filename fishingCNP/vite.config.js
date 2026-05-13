import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { trackingApiPlugin } from './vite.plugin.tracking-api.js'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')  
  process.env.SUPABASE_URL = env.SUPABASE_URL
  process.env.SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY

  return {
    plugins: [react(), tailwindcss(), trackingApiPlugin()],
    preview: {
      allowedHosts: true
    }
  }
})