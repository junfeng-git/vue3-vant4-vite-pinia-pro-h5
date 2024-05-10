<template>
  <div class="custom-tab-bar">
    <van-tabbar
      route
      v-model="active"
      @change="onChange"
      @before-change="handleBeforeChange()"
      placeholder
      safe-area-inset-bottom
    >
      <van-tabbar-item
        v-for="(item, index) in list"
        :key="index"
        :to="item.name"
        replace
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.active : item.normal" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: 'TabBar',
  setup() {
    const active = ref(0);

    const list = [
      {
        name: "/index",
        title: "首页",
        active: new URL("@/assets/icons/home.svg", import.meta.url).href,
        normal: new URL("@/assets/icons/un_home.svg", import.meta.url).href,
      },
      {
        name: "/category",
        title: "分类",
        active: new URL("@/assets/icons/category.png", import.meta.url).href,
        normal: new URL("@/assets/icons/un_category.svg", import.meta.url).href,
      },
      {
        name: "/shopping",
        title: "购物车",
        active: new URL("@/assets/icons/shopping.svg", import.meta.url).href,
        normal: new URL("@/assets/icons/un_shopping.svg", import.meta.url).href,
      },
      {
        name: "/mine",
        title: "我的",
        active: new URL("@/assets/icons/mine.svg", import.meta.url).href,
        normal: new URL("@/assets/icons/un_mine.svg", import.meta.url).href,
      },
    ];

    const onChange = (index) => {
      console.log("index：", index);
    };
    const handleBeforeChange = (e) => {
      console.log("=====", e);
      return false;
    };

    return { active, list, onChange, handleBeforeChange };
  },
});
</script>

<style lang="less" scoped></style>
