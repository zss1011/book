import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/router.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import {registerGuards} from '@/router/guards.js'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const app = createApp(App)
app.use(router)
app.use(ElementPlus, {locale: zhCn})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 注册路由守卫
registerGuards()
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount('#app')

// 全局异常监听
app.config.errorHandler = (err, vm, info) => {
    console.error('全局Vue错误：', err, info)
}
