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
          // 로컬 .env나 CI 환경변수에 의존하지 않는 테스트 전용 DB 설정.
          env: {
            VITE_INDEXED_DB_NAME: 'mbti-test-db',
            VITE_INDEXED_DB_VERSION: '1',
            VITE_INDEXED_DB_STORE_NAME: 'latest-test',
          },
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
