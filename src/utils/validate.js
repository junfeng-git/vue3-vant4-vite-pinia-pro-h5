/**
 * url 校验
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * 手机号 校验
 * @param {string} tel
 * @returns {Boolean}
 */
export function isPhoneNumber(tel) {
  return /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(tel);
}

/**
 * 判断 当前设备是否是 ios系统
 * @returns {Boolean}
 */
export function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
}

/**
 * 判断 当前设备环境是否是微信环境
 * @returns Boolean  true: 表示在微信环境  false: 表示不在微信环境
 */
export const isWechatEnvironment = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.match(/MicroMessenger/i) == "micromessenger";
};
