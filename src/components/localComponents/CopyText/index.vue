<template>
  <div @click="handleCopy" style="display: inline-block"><slot>复制</slot></div>
</template>

<script>
import { defineComponent } from "vue";
import { showSuccessToast, showFailToast } from "vant";
import useClipboard from "vue-clipboard3";

export default defineComponent({
  props: {
    value: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const { toClipboard } = useClipboard();

    function handleCopy() {
      // 做一个延时执行，解决 父组件传过来的数据是最新的
      setTimeout(async () => {
        try {
          await toClipboard(props.value);
          showSuccessToast("复制成功");
        } catch (e) {
          showFailToast("复制失败");
        }
      }, 0);
    }
    return { handleCopy };
  },
});
</script>

<style lang="less" scoped></style>
