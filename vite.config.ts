import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    resolve : {
      alias : {
        "@" : path.resolve(__dirname, "src")
      }
    },

    server : {
      proxy : {
        "/api": {
          target : env.VITE_PROXY_TARGET,
          changeOrigin : true
        }
      }
    }
  }
})
