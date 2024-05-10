<template>
  <div class="container">
    <van-swipe class="my-swipe" :autoplay="2000">
      <van-swipe-item v-for="item in bannerList" :key="item">
        <img :src="item.url" class="swipe-img" />
      </van-swipe-item>
      <template #indicator="{ active, total }">
        <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
      </template>
    </van-swipe>
    <div class="content">
      <!-- 菜单模块 -->
      <van-skeleton :loading="loading">
        <template #template>
          <div
            class="custom-skeleton"
            :style="{ display: 'flex', width: '100%' }"
          >
            <div class="skeleton-item" v-for="item in 8" :key="item">
              <van-config-provider :theme-vars="themeVars" style="height: 100%">
                <van-skeleton-paragraph style="height: 100%" />
              </van-config-provider>
            </div>
          </div>
        </template>
        <ScrollList
          v-if="menuList.length > 0"
          :list="menuList"
          icon="menuImageUrl"
          name="menuName"
        />
      </van-skeleton>
      <!-- 视频播放器 - 自定义控件 -->
      <VideoPlayer
        style="margin-top: 12px"
        src="https://img.grjk520.com/36250920230512115406741.mp4"
        poster="https://img2.baidu.com/it/u=3875916195,2675881291&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
      />
      <van-button
        style="margin: 12px auto 0"
        round
        @click="handleToIntegralPage"
        >积分商城</van-button
      >
      <div style="margin-top: 10px">
        <span @click="handleEidtNickname">用户昵称：</span> {{ store.nickname }}
      </div>
      <div style="margin-top: 10px">
        <span @click="handleEidtAppname">APP名称：</span>
        {{ appStore.appName }}
      </div>
    </div>
    <!-- <div v-for="item in 40" :key="item">哈哈哈</div>
    <van-button round @click="handleToIntegralPage">积分商城</van-button>
    <van-checkbox v-model="checked">复选框</van-checkbox>
    <div v-for="item in 20" :key="item">啦啦啦</div> -->
    <!-- 底部导航 -->
    <tab-bar></tab-bar>
    <!-- <van-back-top /> -->
  </div>
</template>

<script name="Home">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { onActivated, onDeactivated } from "vue";
import { getBannerList, getMenuList } from "@/api";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store";
import { useLoading } from "@/hooks/useLoading";
import ScrollList from "@/components/localComponents/ScrollList/index.vue";
export default defineComponent({
  components: { ScrollList },
  setup() {
    const router = useRouter();
    const store = useUserStore();
    const appStore = useAppStore();
    const { startLoading, stopLoading } = useLoading();
    const value = ref();
    const checked = ref(true);

    const loading = ref(true);
    const menuList = ref([]);
    const bannerList = ref([]);

    const rate = ref(4);
    const slider = ref(50);

    const images = [
      "https://img1.baidu.com/it/u=1063627317,4109173401&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
      "https://img1.baidu.com/it/u=2734240624,2848071286&fm=253&fmt=auto&app=138&f=JPEG?w=749&h=500",
      "https://img1.baidu.com/it/u=900329638,1715201440&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500",
    ];

    onActivated(() => {
      // console.log("keep-alive初始化");
    });
    onDeactivated(() => {
      // console.log("keep-alive卸载");
    });

    onMounted(() => {
      startLoading();
      getBannerList().then((res) => {
        stopLoading();
        console.log("数据：", res);
        const list = res.result || [];
        list.map(
          (v) => (v.url = v.url.includes("http") ? v.url : `http://${v.url}`)
        );
        bannerList.value = list;
      });
      getMenuList().then((res) => {
        setTimeout(() => {
          loading.value = false;
          let list = res.result || [];
          if (list.length > 16) list = list.splice(0, 16);
          if (list.length <= 8) {
            menuList.value = [list];
          } else {
            let arr1 = [];
            let arr2 = [];
            list.forEach((v, i) => {
              i < 8 ? arr1.push(v) : arr2.push(v);
            });
            menuList.value = [arr1, arr2];
          }
          console.log("菜单数据：", menuList.value);
        }, 0);
      });
      window.addEventListener("scroll", handleScroll, true);
      // console.log("环境变量：", import.meta.env);
    });

    // themeVars 内的值会被转换成对应 CSS 变量
    // 比如 sliderBarHeight 会转换成 `--van-slider-bar-height`
    const themeVars = reactive({
      rateIconFullColor: "#07c160",
      sliderBarHeight: "4px",
      sliderButtonWidth: "20px",
      sliderButtonHeight: "20px",
      sliderActiveBackground: "#07c160",
      buttonPrimaryBackground: "#07c160",
      buttonPrimaryBorderColor: "#07c160",
    });

    function handleToIntegralPage() {
      router.push("/integral");
    }

    function handleScroll(e) {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      // console.log(scrollTop);
    }

    function handleEidtNickname() {
      store.setNickname("少年的范er");
    }
    function handleEidtAppname() {
      appStore.setAppName("我是app名称-我被修改了");
    }

    return {
      value,
      checked,
      router,
      store,
      appStore,
      rate,
      slider,
      themeVars,
      loading,
      menuList,
      images,
      bannerList,
      handleToIntegralPage,
      handleEidtNickname,
      handleEidtAppname
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  .my-swipe {
    .van-swipe-item {
      height: 250px;
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

  .content {
    text-align: center;
    padding: 20px 12px;
    box-sizing: border-box;
  }

  .menu-box {
    padding: 0 16px;
    box-sizing: border-box;
  }

  .menu-box,
  .custom-skeleton {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .item,
    .skeleton-item {
      width: calc((100% - 36px) / 4);
      height: 60px;
      margin-right: 10px;
      margin-bottom: 12px;

      &:nth-child(4n) {
        margin-right: 0;
      }
    }

    .item {
      background-color: #77e4bf;
    }
  }

  .copy {
    height: 40px;
    background-color: aquamarine;
  }

  .album-icon {
    width: 30px;
    height: 30px;
  }

  .box {
    font-size: 20px;
    font-weight: 600;
    color: var(--van-primary-color);
  }

  h2 {
    color: var(--van-primary-color);
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
    background-color: rgb(250, 212, 162);
  }

  .price {
    height: 40px;
    line-height: 40px;
    color: @goods-price;
    font-weight: 600;
    background-image: @gradient-color;
  }
}

.van-theme-dark {
  .container {
    background-color: #000;
  }
}
</style>
