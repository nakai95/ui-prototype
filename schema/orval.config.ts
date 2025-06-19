import { defineConfig } from 'orval';

export default defineConfig({
  auth: {
    output: {
      mode: 'single',
      target: '../src/adapters/generated/auth.ts',
      mock: true,
    },
    input: {
      target: './auth/openapi.yaml',
    },
  },
});
