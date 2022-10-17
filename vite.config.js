// https://vitejs.dev/config/
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// 如编辑器提示 path 模块找不到，安装 @types/node -> npm i @types/node -D
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  // 配置文件别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  //css主文件引入
  css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/styles/index.scss";`
			}
		}
	},
  // 打包配置
  build: {
    // target: 'modules',
    // outDir: 'dist', //指定输出路径
    // assetsDir: 'static', // 指定生成静态资源的存放路径
  },
  server: {
    // https: false,
    // hotOnly: false,
    open: true,// 设置服务启动时是否自动打开浏览器
    // cors: true // 允许跨域
    host: 'localhost',
    port: 8000,
    proxy: {
      // '/api': {
        // target: 'http://tch2b-test.tl.com',
        // target: 'http://tch2c-dev.tl.com',
        // changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      // }
    }
  }, 
})
