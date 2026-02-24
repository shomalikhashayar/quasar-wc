import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

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
    sourcemap: mode === 'debug',

    outDir: 'dist',
    assetsDir: 'assets',

    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
    }
  }
}))