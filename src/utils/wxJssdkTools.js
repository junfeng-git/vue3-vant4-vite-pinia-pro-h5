import wx from "weixin-js-sdk";
import { getWeChatSignStr } from "@/https/api"; // 获取签名的接口
/**
 * @param {*} oType String  业务类型 例如: app 跳转app, share 微信和朋友圈分享等.
 * @param {*} paramsObj Object 接手一些需要处理的 参数
 * @param {*} customUrl String 自定义url
 * @returns
 */
export const wxJssdkTools = (oType, paramsObj = {}, customUrl) => {
  return new Promise(async (resolve, reject) => {
    let url = ``;
    var isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isIos) {
      url = location.href.split("#")[0];
      //   url = window.jsUrl  // 进入 h5的第一个页面时, 将当前 url 存起来
    } else {
      url = location.href.split("#")[0];
    }

    // console.log('wxJssdkTools参数', paramsObj)
    if (customUrl) url = customUrl;
    const res = await getWeChatSignStr({ url });
    // console.log('jssdk 签名检验：', res)
    const { title, desc, link, imgUrl } = paramsObj;
    // console.log(title, desc, link, imgUrl)

    wx.config({
      debug: false, // 开启调试模式 true 开启， false 关闭
      appId: res.result.appId, // 必填，公众号的唯一标识
      timestamp: res.result.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.result.nonceStr, // 必填，生成签名的随机串
      signature: res.result.signature, // 必填，签名
      // 必填，需要使用的JS接口列表（根据自己的需求添加进去）
      jsApiList: [
        "scanQRCode",
        "getLocation",
        "chooseImage",
        "previewImage",
        "updateAppMessageShareData",
        "updateTimelineShareData",
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
      ],
      // 可选，需要使用的开放标签列表，例如['wx-open-launch-weapp']
      openTagList: ["wx-open-launch-weapp", "wx-open-launch-app"],
    });
    wx.checkJsApi({
      jsApiList: [
        "updateAppMessageShareData", // 分享到朋友/QQ 的 API
        "updateTimelineShareData", // 分享到微信朋友圈/QQ空间 的 API
      ],
      success: function () {
        console.log("checkJsApi成功");
      },
      fail: function () {
        console.log("checkJsApi失败");
      },
    });
    wx.ready(function () {
      // console.log('进入到wx.ready里面啦......')
      if (oType === "app") {
        console.log("进入app - ready 了吗？");
        resolve(JSON.stringify(paramsObj));
      } else if (oType == "share") {
        // console.log('首页分享', link)
        wx.updateAppMessageShareData({
          title, // 分享标题
          desc, // 分享描述
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: function () {
            // console.log('resolve ---好友-- 分享成功')
            resolve(); // 分享成功
          },
          fail: function (err) {
            // console.log('reject ---好友---- 分享失败')
            reject(err); // 分享失败
          },
        });
        wx.updateTimelineShareData({
          title, // 分享标题
          link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl, // 分享图标
          success: function () {
            // console.log('resolve ---朋友圈-- 分享成功')
            resolve(); // 分享成功
          },
          fail: function (err) {
            // console.log('reject ---朋友圈---- 分享失败')
            reject(err); // 分享失败
          },
        });
      }
    });
    wx.error(function (err) {
      reject(err);
    });
  });
};
