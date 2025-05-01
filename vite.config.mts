import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import viteClean from 'vite-plugin-clean';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [
      tsconfigPaths(),
      viteClean({
        targetFiles: ['dist'],
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/*',
            dest: 'assets',
          },
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development',
      minify: mode === 'production',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
