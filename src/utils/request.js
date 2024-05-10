import axios from "axios";
import router from "@/router";
import { showToast } from "vant";

import { getToken, removeToken } from "@/utils/auth";

import nprogress from "nprogress";

import "nprogress/nprogress.css";

const { VITE_GLOB_BASE_URL, VITE_GLOB_API_URL, DEV, VITE_USE_MOCK, VITE_PORT } =
  import.meta.env;

const isUseMock = VITE_USE_MOCK === "true"; // 是否开启mock
const baseURL =
  DEV && isUseMock
    ? `http://localhost:${VITE_PORT}${VITE_GLOB_API_URL}`
    : VITE_GLOB_BASE_URL;

// 创建axios实例
const service = axios.create({
  baseURL, // URL地址
  timeout: 120 * 1000, // 超时时间
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    nprogress.start();
    config.headers = {
      nonce: Date.parse(new Date()),
      clientType: "H5",
      clientVersion: "2.2.1",
      timestamp: Date.parse(new Date()),
      Authorization: getToken() ? "Bearer " + getToken() : undefined,
    };
    return Promise.resolve(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);
// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code != 1) {
      // 500005 用户没有token或者过期
      if (res.code == 500005) {
        removeToken();
        localStorage.removeItem("userInfo");
        router.replace({ path: "/login" });
        nprogress.done();
      }
      if (res.code == 100001 || res.code == 2000) {
        nprogress.done();
        showToast(res.msg);
      }
      return Promise.reject(res.msg);
    } else {
      nprogress.done();
      return Promise.resolve(res);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
