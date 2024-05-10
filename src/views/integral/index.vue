<template>
  <div class="container">
    <NavBar
      title="积分商城"
      :placeholder="false"
      :border="false"
      type="white"
      @onClickRight="handleClickRight"
    />
    <van-swipe class="my-swipe" :autoplay="0">
      <van-swipe-item v-for="(image, index) in images" :key="image">
        <img
          @click="handlePreviewImage(index)"
          :src="image"
          class="swipe-img"
        />
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
    <div class="share-btn">
      <!-- <van-icon name="share-o" /> -->
      <van-button
        @click="showShare = true"
        style="margin: 10px auto 0"
        icon="share-o"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
      >
        分享
      </van-button>
    </div>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
    />
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-action-bar-icon icon="cart-o" text="购物车" />
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <van-action-bar-button type="warning" text="加入购物车" />
      <van-action-bar-button type="danger" text="立即购买" />
    </van-action-bar>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import { showImagePreview } from "vant";

export default defineComponent({
  setup() {
    const showShare = ref(false);
    const images = [
      "https://img1.baidu.com/it/u=1063627317,4109173401&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
      "https://img1.baidu.com/it/u=2734240624,2848071286&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500",
      "https://img1.baidu.com/it/u=900329638,1715201440&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    ];
    const options = [
      [
        { name: "微信", icon: "wechat" },
        { name: "朋友圈", icon: "wechat-moments" },
        { name: "微博", icon: "weibo" },
        { name: "QQ", icon: "qq" },
      ],
      [
        { name: "复制链接", icon: "link" },
        { name: "分享海报", icon: "poster" },
        { name: "二维码", icon: "qrcode" },
        { name: "小程序码", icon: "weapp-qrcode" },
      ],
    ];
    const handleClickRight = () => {
      console.log("点击右侧 ====== ");
    };
    const handlePreviewImage = (index) => {
      showImagePreview({
        images: images,
        startPosition: index,
        closeable: false,
        showIndex: false,
      });
    };
    return { images, showShare, options, handleClickRight, handlePreviewImage };
  },
});
</script>

<style lang="less" scoped>
.my-swipe {
  .van-swipe-item {
    height: 300px;
    line-height: 300px;
    .swipe-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: #fff;
    border-radius: 22px;
    background: rgba(0, 0, 0, 0.3);
  }
}
.share-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
