import { useDynamicTitle } from "@/utils/dynamicTitle";
import { defineStore } from "pinia";

// 是否开启动态标题
const dynamicTitle = import.meta.env.VITE_GLOB_APP_DYNAMIC_TITLE === "true";

const useSettingsStore = defineStore("settings", {
  state: () => ({
    title: "",
    dynamicTitle,
  }),
  actions: {
    // 设置网页标题
    setTitle(title) {
      this.title = title;
      useDynamicTitle();
    },
  },
});

export default useSettingsStore;
