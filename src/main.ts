import { createApp } from 'vue'
// import './style.css'
import '@/assets/styles/global.scss'
import router from './router'
import App from './App.vue'
import MApp from './MApp.vue'
import 'element-plus/theme-chalk/el-message.css'

const isPc = document.body.offsetWidth > 750

const app = createApp(isPc ? App : MApp)
if (isPc) {
  app.use(router)
}

app.config.globalProperties.$imgUrl = (path: string) =>
  new URL(`/src/assets/${path}`, import.meta.url).href

app.mount('#app')
