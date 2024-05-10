import useSettingsStore from "@/store/modules/settings";
const defaultTitle = import.meta.env.VITE_GLOB_APP_TITLE;
/**
 * 动态修改标题
 */
export function useDynamicTitle() {
  const settingsStore = useSettingsStore();
  let  _defaultTitle = defaultTitle ? " - " + defaultTitle : defaultTitle;
  if (settingsStore.dynamicTitle) {
    document.title = settingsStore.title + _defaultTitle;
  } else {
    document.title = defaultTitle;
  }
}
