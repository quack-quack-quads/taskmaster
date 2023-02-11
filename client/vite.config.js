import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  compilerOptions: {
    "baseUrl": "src",
    "paths": {
      "*": ["public/src/*"]
    }
  }
})
