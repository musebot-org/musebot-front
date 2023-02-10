import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import autoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Inspect from 'vite-plugin-inspect'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "^https://musebot.ai": {

      }
    }
  },
  plugins: [
    vue(),
    autoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',

        {
          '@/utils/http': [['default', '$http']],
          axios: [['default', '$axios']],
          '@/api': [
            'musebotTrack',
            'navClickTrack',
            'homeVisitTrack',
            'walletClickTrack',
            'getstartedClickTrack',
            'KeywordsSubmitClickTrack',
            'PopupCloseClickTrack',
            'MintAsNFTClickTrack',
            'DownloadClickTrack',
            'MintClickTrack'
          ]
        }
      ],
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: './src/auto-imports.d.ts'
    }),

    Components({
      // allow auto load markdown components under `./src/components/`
      // extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      // include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'src/components.d.ts'
    })
  ],

  resolve: {
    // https://cn.vitejs.dev/config/#resolve-alias
    alias: {
      // 设置别名
      '@': resolve(__dirname, './src')
    }
    // https://cn.vitejs.dev/config/#resolve-extensions
    // extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  }
  //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@/assets/styles/fun.scss" as *;`
  //     }
  //   }
  // }
})
