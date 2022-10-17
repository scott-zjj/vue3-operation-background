import { createApp } from "vue";
import router from "@/router/index";
import store from "@/store/index";

import "@/styles/common.scss";

import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";

import App from "./App.vue";
import "@/mock/index.js";

import directives from './directives'

//全局引用icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(router).use(store).use(directives).use(ElementPlus, {
  locale: zhCn,
});

app.mount("#app");