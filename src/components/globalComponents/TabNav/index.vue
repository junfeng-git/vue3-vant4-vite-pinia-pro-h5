<template>
  <div class="custom-tab-nav">
    <van-tabs
      v-model:active="active"
      @click-tab="onClickTab"
      :shrink="shrink"
      :swipeable="swipeable"
      :animated="animated"
      :line-height="lineHeight"
      :border="border"
    >
      <van-tab v-for="(item, index) in list" :key="item[value]">
        <template #title>
          <slot name="title-left"></slot>
          <div :class="[customTitleClass, active == index ? 'active' : '']">
            {{ item[label] }} {{ index + 1 }}
          </div>
          <slot name="title-right"></slot>
        </template>
        <slot></slot>
      </van-tab>
      <template #nav-left></template>
      <template #nav-right></template>
      <template #nav-bottom></template>
    </van-tabs>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "TabNav",
  props: {
    list: {
      type: Array,
      default: () => [], // 需要渲染的数据
    },
    shrink: {
      type: Boolean,
      default: false, // 是否收缩布局
    },
    swipeable: {
      type: Boolean,
      default: false, // 是否支持手势滑动
    },
    animated: {
      type: Boolean,
      default: true, // 是否开启动画
    },
    border: {
      type: Boolean,
      default: false, // 是否显示外边框
    },
    label: {
      type: String,
      default: "label", // 标题 字段名称，解决接口返回的字段 不是 label
    },
    value: {
      type: String,
      default: "value", // value值 字段名称，解决接口返回的字段 不是 value
    },
    index: {
      type: [Number, String],
      default: 0, // index 默认索引，用于设置指定默认索引
    },
    lineHeight: {
      type: [Number, String],
      default: 3,
    },
    customTitleClass: {
      type: String,
      default: "", // 自定义标题类
    },
  },

  setup(props, { emit }) {
    const { list, value, index } = props;

    const active = ref(0);

    active.value = Number(index);

    onMounted(() => {
      console.log("active:", active.value);
    });

    const onClickTab = ({ name }) => {
      console.log(name);
      // 通过 点击 tab 来传递参数 一般都是获取的 id,
      // 然后给父组件调接口
      const title = list[name][value];
      console.log("title:", title);
      emit("onClickTab", { title, index: name });
    };
    return { active, onClickTab };
  },
});
</script>

<style lang="less" scoped>
.custom-tab-nav {
  width: 100%;
}
</style>
