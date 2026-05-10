import content from '@originjs/vite-plugin-content';
import preact from '@preact/preset-vite';
import legacy from '@vitejs/plugin-legacy';
import { defineConfig, loadEnv } from 'vite';

const commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

const googleAnalyticsPlugin = (gaId) => ({
  name: 'inject-google-analytics',
  transformIndexHtml() {
    if (!gaId) return [];
    return [
      {
        tag: 'script',
        attrs: {
          async: true,
          src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`,
        },
        injectTo: 'head',
      },
      {
        tag: 'script',
        children:
          'window.dataLayer = window.dataLayer || [];' +
          'function gtag(){dataLayer.push(arguments);}' +
          "gtag('js', new Date());" +
          `gtag('config', '${gaId}');`,
        injectTo: 'head',
      },
    ];
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const gaId = env.VITE_GA_MEASUREMENT_ID || '';

  return {
    base: './',
    define: {
      __COMMIT_HASH__: JSON.stringify(commitHash),
    },
    plugins: [
      preact(),
      content(),
      legacy({
        targets: ['defaults', 'samsung >= 9', 'android >= 4', 'chrome >= 30'],
        additionalLegacyPolyfills: ['unfetch/polyfill/polyfill.mjs'],
        modernPolyfills: true,
      }),
      googleAnalyticsPlugin(gaId),
    ],
    server: {
      port: 3030,
      host: true,
    },
    preview: {
      host: true,
      // https: true,
    },
    build: {
      assetsInlineLimit: 0,
      target: ['es2020', 'chrome61', 'safari11'],
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            // console.log(id);
            if (id.includes('.css')) return; // Do nothing for CSS
            if (id.includes('all-idioms')) return 'all-idioms';
            if (id.includes('game-idioms')) return 'game-idioms';
            if (id.includes('node_modules/pinyin-pro/data'))
              return 'pinyin-data';
            if (id.includes('node_modules')) return 'vendor';
          },
        },
      },
    },
    test: {
      include: ['**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    },
  };
});
