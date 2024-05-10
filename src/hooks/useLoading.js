import { showLoadingToast } from "vant";
import { onBeforeUnmount } from "vue";

export function useLoading() {
  let toast = null;
  const startLoading = () => {
    toast = showLoadingToast({
      duration: 0,
      forbidClick: true,
      message: "加载中...",
      overlay: true,
    });
  };
  const stopLoading = () => {
    toast && toast.close();
  };

  onBeforeUnmount(stopLoading);

  return { startLoading, stopLoading };
}
