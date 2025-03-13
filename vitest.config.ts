// import { defineConfig } from 'vitest/config';
// import react from '@vitejs/plugin-react';
// import tsconfigPaths from 'vite-tsconfig-paths';
 
// export default defineConfig({
//   plugins: [tsconfigPaths(), react()],
//   test: {
//     environment: 'jsdom',
//     setupFiles: './src/app/setupTests.ts',
//   },
// })

// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitest config
export default defineConfig({
  test: {
    environment: 'jsdom', // Use jsdom to simulate the browser environment
    globals: true, // Use globals like `expect` from Vitest
    setupFiles: './src/setupTests.ts', // Path to setup file for jest-dom matchers
    css: false, // Optional: Disable CSS imports in tests
  },
  plugins: [react()],
});
