import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from 'node:url'
import sass from 'sass'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue(), svgLoader()],
    build: {
        sourcemap: true // 这里开启 source map
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)), // 将 @ 映射到 /src
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern', // 使用现代 API
                implementation: sass, // 指定使用 sass-embedded
                additionalData: `@use "@/config/scss/variables.scss" as *;`
            }
        }
    },
    server: {
        host: '0.0.0.0', // 本机地址，允许外部访问
        port: 5173, // 本地开发服务器的端口
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8100', // 代理的后端地址
                changeOrigin: true, // 允许代理修改请求的 origin
                rewrite: (path) => path.replace(/^\/api/, ''), // 去掉路径中的 /api 前缀
            },
        },
    },
})
