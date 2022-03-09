import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import Pages from 'vite-plugin-pages'
import ViteComponents from 'vite-plugin-components'
import Layouts from 'vite-plugin-vue-layouts';
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    alias: {
        '@' : path.resolve(__dirname, './src')
    },
    plugins: [
        vue(),
        svgLoader(),
        Pages({
            dirs: 'src/views',
        }),
        ViteComponents(),
        Layouts({
            layoutsDir: 'src/layouts',
            defaultLayout: 'default-layout'
          }),
    ],
})
