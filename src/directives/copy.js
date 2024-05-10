import { showToast, showSuccessToast, showFailToast } from "vant";

const copyDirective = {
  /**
   * mounted 钩子函数，在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
   * el: 指令绑定到的元素。这可以用于直接操作 DOM。
   * value: 传给指令的值，也就是我们要 copy 的值
   */
  mounted(el, { value }) {
    console.log("value==:", value);
    el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    el.handler = () => {
      console.log("触发了：", el.$value);
      if (!el.$value) {
        // 值为空的时候，给出提示，我这里的提示是用的 vant 的提示，你们随意
        showToast("无复制内容");
        return;
      }
      // 动态创建 textarea 标签
      const textarea = document.createElement("textarea");
      // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.readOnly = "readonly";
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      // 将要 copy 的值赋给 textarea 标签的 value 属性
      textarea.value = el.$value;
      // 将 textarea 插入到 body 中
      document.body.appendChild(textarea);
      console.log("textarea.value:", textarea.value);
      // 选中值并复制
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      const result = document.execCommand("copy");
      console.log("result", result);
      if (result) {
        showSuccessToast("复制成功");
      } else {
        showFailToast("复制失败");
      }
      document.body.removeChild(textarea);
    };
    // 绑定点击事件，就是所谓的一键 copy 啦
    el.addEventListener("click", el.handler);
  },
  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  updated(el, { value }) {
    console.log("更新触发");
    el.$value = value;
  },
  // 指令与元素解绑后，移除事件绑定
  unmounted(el) {
    el.removeEventListener("click", el.handler);
  },
};

export function setupCopygDirective(app) {
  app.directive("copy", copyDirective);
}

export default copyDirective;
