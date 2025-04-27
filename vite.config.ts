/// <reference types="vitest" />

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { templateCompilerOptions } from '@tresjs/core'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
      'three-3mf-exporter': fileURLToPath(new URL('./packages/three-3mf-exporter/src', import.meta.url)),
    },
  },
  plugins: [
    // VueMacros({
    //   defineOptions: false,
    //   defineModels: false,
    //   plugins: {
    //     vue: Vue({
    //       script: {
    //         propsDestructure: true,
    //         defineModel: true,
    //       },
    //       ...templateCompilerOptions,
    //     }),
    //   },
    // }),
    Vue({
      script: {
        propsDestructure: true,
        defineModel: true,
      },
      ...templateCompilerOptions,
    }),

    // https://github.com/posva/unplugin-vue-router
    VueRouter(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    UnoCSS(),
  ],

  // https://github.com/vitest-dev/vitest
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
  experimental: {
    enableNativePlugin: true,
  },
})
