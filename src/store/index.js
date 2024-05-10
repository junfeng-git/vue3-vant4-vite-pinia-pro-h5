import { createPinia, defineStore } from "pinia";
// 引入持久化插件
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// 实例化pinia
export const store = createPinia();
// 使用持久化存储插件
store.use(piniaPluginPersistedstate);

// 系统统一存储
export const useAppStore = defineStore("app", {
  state: () => ({
    appName: "我是app名称",
  }),
  actions: {
    // 设置app名称
    setAppName(data) {
      this.appName = data;
    },
  },
  persist: {
		storage: localStorage, //default localStorage
	},
});
