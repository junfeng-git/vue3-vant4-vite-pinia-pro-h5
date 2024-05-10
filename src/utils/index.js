/**
 * 获取当前 url 参数的 value
 * @param {*} name 参数的 key
 * @param {*} url 目标 url, 不传会获取当前页面的 url
 * @returns 参数的 value
 */
export const getUrlParam = (name, url) => {
  url = url || window.location.href;
  var res = {};
  url.replace(/[?|&](\w+)=([^&#]*)/g, (all, key, val) => {
    res[key] = val;
    return all;
  });
  return res[name] || "";
};

/**
 * 一键复制 【不推荐使用，可以用自定义指令（已封装），去 README.md 文件查看】
 * @param {string} str 需要复制的文本
 * @returns String 复制状态 success: 成功  fail: 失败
 */
export function useCopyToClipboard(str) {
  return new Promise((resolve, reject) => {
    // 使用textarea的原因是能进行换行，input不支持换行
    var copyTextArea = document.createElement("textarea");
    // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
    copyTextArea.readOnly = "readonly";
    copyTextArea.style.position = "absolute";
    copyTextArea.style.left = "-9999px";
    copyTextArea.value = str;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    try {
      var copyed = document.execCommand("copy");
      if (copyed) {
        document.body.removeChild(copyTextArea);
        resolve("success");
      }
    } catch {
      reject("fail");
    }
  });
}
/**
 * 注册组件
 * @param {*} component
 * @param {*} alias
 * @returns
 */
export const withInstall = (component, alias) => {
  const comp = component;
  comp.install = (app) => {
    app.component(comp.name || comp.displayName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component;
};
