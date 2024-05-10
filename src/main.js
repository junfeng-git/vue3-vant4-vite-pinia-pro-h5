import { createApp } from "vue";
import App from "./App.vue";
import { ConfigProvider } from "vant";
import { setupGlobDirectives } from "./directives";
import { registerGlobComp } from "@/components/registerGlobComp";
const app = createApp(App);

// 引入注册脚本 - svg
import "virtual:svg-icons-register";
// px 自动转 rem 插件
import "lib-flexible";
// 引入路由
import router from "@/router/index";
// 引入 pinia
import { store } from "@/store/index";
// 注册全局指令
setupGlobDirectives(app);
// 注册全局组件
registerGlobComp(app);

app.use(ConfigProvider).use(router).use(store).mount("#app");
