<template>
  <div class="container">
    <NavBar title="分类" :left-arrow="false" />
    <div class="content">
      <div class="sidebar-left hide-y-scrollbar">
        <van-config-provider :theme-vars="themeVars">
          <van-sidebar v-model="active" @click="handleClick">
            <van-sidebar-item v-for="(item, index) in 20">
              <template #title>
                <div
                  :class="[
                    'custom-sidebar-title',
                    active == index ? 'active' : '',
                  ]"
                >
                  {{ "标签名称1" }}
                </div>
              </template>
            </van-sidebar-item>
          </van-sidebar>
        </van-config-provider>
      </div>
      <div class="block-right hide-y-scrollbar">
        <van-index-bar>
          <van-index-anchor index="A" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="B" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="C" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="D" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="E" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />

          <van-index-anchor index="F" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="G" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="X" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-index-anchor index="Y" />
          <van-cell title="文本" />
          <van-cell title="文本" />
          <van-cell title="文本" />
        </van-index-bar>
      </div>
    </div>
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();

    const active = ref(0);

    const themeVars = reactive({
      sidebarWidth: "120px",
      sidebarSelectedBackground: "#f7f8fa",
      sidebarSelectedBorderWidth: "0",
      sidebarPadding: "0px",
    });

    onMounted(() => {});

    const handleClick = () => {
      console.log(active.value);
    };

    function handleToIntegralPage() {
      router.push("/integral");
    }
    return { active, themeVars, handleToIntegralPage, handleClick };
  },
});
</script>

<style lang="less" scoped>
.content {
  display: flex;
  height: calc(100vh - 50px - 44px);
  background-color: #f7f8fa;
  .sidebar-left {
    // width: 100px;
    // background-color: aqua;
    background-color: #f7f8fa;
    .custom-sidebar-title {
      background-color: #f7f8fa;
      padding: 18px 16px;
      width: 100%;
      margin-left: 10px;
      border-radius: 18px 0 0 18px;
      &.active {
        position: relative;
        color: var(--van-primary-color);
        font-weight: 600;
        background-color: #fff;
        &::after {
          position: absolute;
          content: "";
          left: 8px;
          top: 50%;
          width: 4px;
          height: 20px;
          border-radius: 6px;
          transform: translateY(-50%);
          background-color: var(--van-primary-color);
        }
      }
    }
  }
  .block-right {
    flex: 1;
    border-radius: 12px 0 0 12px;
    background-color: #fff;
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
