import { createRouter, createWebHashHistory } from "vue-router";
import useSettingsStore from "@/store/modules/settings";

let routes = [
  { path: "/", redirect: "/index" },
  {
    path: "/index",
    name: "Index",
    meta: { title: "首页", keepAlive: true },
    component: () => import("@/views/index/index.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: "登录" },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/category",
    name: "Category",
    meta: { title: "分类" },
    component: () => import("@/views/category/index.vue"),
  },
  {
    path: "/shopping",
    name: "Shopping",
    meta: { title: "购物车" },
    component: () => import("@/views/shopping/index.vue"),
  },
  {
    path: "/mine",
    name: "Mine",
    meta: { title: "我的" },
    component: () => import("@/views/mine/index.vue"),
  },
  {
    path: "/integral",
    name: "Integral",
    meta: { title: "积分商城", keepAlive: true },
    component: () => import("@/views/integral/index.vue"),
  },
  {
    // 配置404页面
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("@/views/exception/NotFound.vue"),
  },
];
// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior: () => ({ left: 0, top: 0 }),
  scrollBehavior(to, from, savePosition) {
    // console.log('savePosition:', savePosition);
    if (savePosition) {
      // 解决页面从列表页跳转到详情页返回,初始在原来位置
      return savePosition;
    } else {
      // 解决页面跳转后页面高度和前一个页面高度一样
      return { left: 0, top: 0 };
    }
  },
});

// 导航守卫
router.beforeEach((to, from, next) => {
  to.meta.title && useSettingsStore().setTitle(to.meta.title);
  next();
});
// 导出
export default router;
