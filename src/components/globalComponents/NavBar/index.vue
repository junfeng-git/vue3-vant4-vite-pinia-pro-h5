<template>
  <van-config-provider
    :theme-vars="type == 'black' ? blackThemeVars : whiteThemeVars"
  >
    <van-nav-bar
      safe-area-inset-top
      :title="title"
      left-text=""
      right-text=""
      fixed
      z-index="9999"
      :border="border"
      class="custom-nav-bar"
      :style="{ background }"
      :placeholder="placeholder"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left v-if="leftArrow">
        <van-icon name="arrow-left" size="18"
      /></template>
      <template #right>
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
  </van-config-provider>
</template>

<script>
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'NavBar',
  props: {
    title: {
      type: String,
      default: "",
    },
    placeholder: {
      type: Boolean,
      default: true,
    },
    background: {
      type: String,
      default: "",
    },
    border: {
      type: Boolean,
      default: true,
    },
    leftArrow: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "black", // black: 文本是 黑色的  white: 文本是白色的
    },
  },
  setup(_, { emit }) {
    // console.log(props);
    const router = useRouter();

    const blackThemeVars = reactive({
      navBarArrowSize: "18px",
      navBarIconColor: "#323233",
      navBarTextColor: "#323233",
      navBarTitleTextColor: "#323233",
      navBarBackground: "#ffffff",
    });

    const whiteThemeVars = reactive({
      navBarArrowSize: "18px",
      navBarIconColor: "#ffffff",
      navBarTextColor: "#ffffff",
      navBarTitleTextColor: "#ffffff",
      navBarBackground: "transparent",
    });

    const onClickLeft = () => history.back();
    const onClickRight = () => {
      emit("onClickRight");
    };
    return {
      router,
      blackThemeVars,
      whiteThemeVars,
      onClickLeft,
      onClickRight,
    };
  },
});
</script>

<style lang="less" scoped>
.custom-nav-bar {
  color: #fff;
}
</style>
