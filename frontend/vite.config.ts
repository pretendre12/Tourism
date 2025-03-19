import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  base: '/', // Base path
  build: {
    outDir: "dist"  // Correct placement inside build
  }
})
