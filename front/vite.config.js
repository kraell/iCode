import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from 'vite-jsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => ({
  plugins: [
        react(),
        jsconfigPaths("root"),
    ],
    server: {
      port: 48104,
    },
    preview: {
      port: 10019,
    },
}))
