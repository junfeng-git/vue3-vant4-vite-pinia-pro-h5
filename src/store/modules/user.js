import { defineStore } from "pinia"; //引入pinia

// 这里官网是单独导出  是可以写成默认导出的  官方的解释为大家一起约定仓库用use打头的单词
export const useUserStore = defineStore("user", {
  state: () => ({
    nickname: "少年的范儿",
    userInfo: null, // 用户信息
    role: undefined, // 用户角色
    token: "哈哈", // token
  }),
  actions: {
    // 设置网页标题
    setToken(data) {
      this.token = data;
    },
    setNickname(data) {
      this.nickname = data;
    },
  },
  persist: {
		storage: localStorage, //default localStorage
	},
});
