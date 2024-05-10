<template>
  <!-- 暗黑主题 -->
  <!-- <van-config-provider theme="dark"></van-config-provider> -->
  <RouterView>
    <template #default="{ Component, route }">
      <!-- <transition name="fade"> -->
      <keep-alive v-if="route.meta.keepAlive">
        <component :is="Component" :key="route.path" />
      </keep-alive>
      <component v-else :is="Component" :key="route.path" />
      <!-- <component :is="Component" :key="route.path" /> -->
      <!-- </transition> -->
    </template>
  </RouterView>
</template>

<script setup>
import "vant/es/toast/style";
import "vant/es/dialog/style";
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';
import "vant/lib/index.css";
</script>
<style lang="less">
// 全局样式
@import "@/styles/index.less";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
