import request from "@/utils/request";

// banner 列表
export const getBannerList = (params) => request.get(`/goodsBanner/list`, { params });
// 菜单列表
export const getMenuList = (params) => request.get(`/homeMenu/getList`, { params });