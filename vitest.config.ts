import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    clearMocks: true,
    restoreMocks: true,
    projects: [
      {
        extends: true,
        resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
        test: {
          name: 'client',
          environment: 'jsdom',
          include: ['test/src/**/*.test.{ts,tsx}'],
          setupFiles: ['test/src/setup.ts'],
        },
      },
      {
        extends: true,
        resolve: { alias: { '@': fileURLToPath(new URL('./server', import.meta.url)) } },
        test: {
          name: 'server',
          environment: 'node',
          include: ['test/server/**/*.test.ts'],
        },
      },
    ],
  },
})
