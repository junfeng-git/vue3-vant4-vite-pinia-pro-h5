<template>
  <div class="container">
    <NavBar title="个人中心" :left-arrow="false" />
    <tab-nav
      @onClickTab="onClickTab"
      :list="list"
      label="name"
      value="id"
      shrink
      line-height="0"
      custom-title-class="custom-mine-tab-nav-text"
    >
      <div class="item">
        <SvgIcon v-rotate icon-class="loading" />
      </div>
    </tab-nav>
    <div class="content"></div>
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  components: {},
  setup() {
    const active = ref(0);

    const loading = ref(false);

    onMounted(() => {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    });

    const list = [
      {
        name: "我是标题",
        id: 1111,
      },
      {
        name: "我是标题",
        id: 2222,
      },
      {
        name: "我是标题",
        id: 3333,
      },
      {
        name: "我是标题",
        id: 4444,
      },
      {
        name: "我是标题",
        id: 5555,
      },
    ];

    const onClickTab = ({ title, index }) => {
      console.log("切换获取的参数:", title, index);
    };

    return { active, list, loading, onClickTab };
  },
});
</script>

<style lang="less" scoped>
.container {
  touch-action: none;
}
.content {
  padding: 0 16px;
}
.item {
  width: 100%;
  height: 140px;
  // background-color: var(--van-primary-color);
  .test {
    display: block;
    width: 60px;
    height: 60px;
    background-color: aquamarine;
  }
}
.text {
  margin: 12px 0;
  // width: fit-content;
  margin-left: 16px;
  border-color: red;
}
</style>
