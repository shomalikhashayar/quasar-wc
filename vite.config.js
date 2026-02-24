import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig(({ command, mode }) => ({
  plugins: [
    vue({
      template: { transformAssetUrls },
      customElement: true, 
    }),

    quasar({
      sassVariables: fileURLToPath(
        new URL('./src/quasar-variables.sass', import.meta.url)
      )
    })
  ],

  define: {
    'process.env': {}
  },

  build: {
    minify: command === 'build' && mode !== 'debug',
    sourcemap: mode === 'debug' || undefined,
    lib: {
      entry: resolve(__dirname, 'src/main.js'),
      name: 'my-lib',
      formats: ['umd', 'es'], // Consider adding ES format too
      fileName: (format) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize dependencies you don't want to bundle
      external: [],
      
      output: {
        // Global variables for UMD builds
        globals: {
          vue: 'Vue',
          pinia: 'Pinia',
          quasar: 'Quasar'
        },
        // This will extract CSS to a separate file
        assetFileNames: 'my-lib.[ext]'
      }
    },
    // This ensures CSS is extracted to a separate file
    cssCodeSplit: false,
  },
}));