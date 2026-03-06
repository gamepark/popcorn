import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    root: './tests/',
    server: {
      deps: {
        inline: ['@gamepark/rules-api/']
      }
    }
  },
  plugins: [tsconfigPaths()]
})
