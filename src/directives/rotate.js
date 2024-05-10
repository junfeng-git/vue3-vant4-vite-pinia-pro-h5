const rotateDirective = {
  /**
   * mounted 钩子函数，在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
   * el: 指令绑定到的元素。这可以用于直接操作 DOM。
   * value: 传给指令的值，也就是我们要 copy 的值
   */
  mounted(el, { value }) {
    // console.log("value==:", value, typeof value);
    el.$value = value; // 用一个全局属性来存传进来的值，因为这个值在别的钩子函数里还会用到
    // el.className = 'v-rotate'
    el.classList.add("v-rotate");
    if (typeof value === "undefined") return;
    el.style.display = value ? "block" : "none";
  },
  // 在绑定元素的父组件及他自己的所有子节点都更新后调用
  updated(el, { value }) {
    // console.log("更新触发", value);
    if (typeof value === "undefined") return;
    el.style.display = value ? "block" : "none";
  },
  // 指令与元素解绑后，移除事件绑定
  unmounted(el) {
    el.classList.remove("v-rotate");
  },
};

export function setupRotateDirective(app) {
  app.directive("rotate", rotateDirective);
}

export default rotateDirective;
