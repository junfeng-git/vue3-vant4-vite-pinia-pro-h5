<template>
  <div class="no-data-box">
    <van-config-provider :theme-vars="themeVars">
      <van-empty :image="list[index]" image-size="200" :description="desc">
        <van-button v-if="showBtn" type="primary" class="bottom-button"
          >登录</van-button
        >
      </van-empty>
    </van-config-provider>
  </div>
</template>

<script>
import noData from "@/assets/images/empty/no_data.png"; // 暂无数据  index： 0 (默认)
import noLogin from "@/assets/images/empty/no_login.png"; // 未登录  index： 1
import noRecord from "@/assets/images/empty/no_order.png"; // 暂无订单  index： 2
import noGoods from "@/assets/images/empty/no_goods.png"; // 暂无商品  index： 3
import noAddress from "@/assets/images/empty/no_address.png"; // 暂无地址   index： 3

import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "NoData",
  props: {
    index: {
      type: [Number, String],
      default: 0, // 图片索引，对于上图的 位置
    },
    desc: {
      type: String,
      default: "暂无数据哦~",
    },
    showBtn: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const themeVars = reactive({
      emptyDescriptionMarginTop: "12px",
      emptyBottomMarginTop: "12px",
    });
    return {
      list: [noData, noLogin, noRecord, noGoods, noAddress],
      themeVars,
    };
  },
});
</script>

<style lang="less" scoped>
.no-data-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15vh;
}
.bottom-button {
  width: 60px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #00bfc6;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}
</style>
