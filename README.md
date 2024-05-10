# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## unplugin-vue-components 的理解和使用

```
https://www.rstk.cn/news/163770.html
```

## 安装使用

- 获取项目代码

```bash
git clone https://gitee.com/junfeng535/vue3-vant4-vite-pinia-ts-h5.git
```

- 安装依赖

```bash
cd vue3-vant4-vite-pinia-ts-h5

pnpm install

```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

### 为元素添加安全区适配

```
<!-- 顶部安全区 -->
<div class="van-safe-area-top"></div>

<!-- 底部安全区 -->
<div class="van-safe-area-bottom"></div>

```

### 为元素添加触碰反馈效果，触碰后，元素的透明度会降低。（一般用于 自定义按钮）

```
<div class="van-haptics-feedback"></div>
```

### nav-bar 二次封装后的使用

```
<NavBar
      title="积分商城"
      :placeholder="false"
      :border="false"
      type="white"
      @onClickRight="handleClickRight"
    >
      <template #right><van-icon name="weapp-nav" size="18" /></template>
    </NavBar>
```

### tab-nav 封装 tab 导航，使用方法

```
<tab-nav
      @onClickTab="onClickTab"
      :list="list"
      label="name"
      value="id"
      shrink
      line-height="0"
      custom-title-class="custom-mine-tab-nav-text"
    >
      <div class="item">我是内容区域</div>
    </tab-nav>
```

### svg 的使用

1. 默认大小为 width 和 height 都是 24px （根据自己的项目 可以去 SvgIcon 组件设置默认大小）

```
<SvgIcon icon-class="album" />
<SvgIcon icon-class="customer_service" />
<SvgIcon icon-class="shopping" />
<SvgIcon icon-class="special_subject" />
```

2. 自定义类来设置大小

```
<SvgIcon icon-class="album" class-name="album-icon" />
```

### 主题 浅色风格/深色风格 之间进行切换设置

````
 <van-config-provider
      :theme="checked ? 'light' : 'dark'"
    ></van-config-provider>
    ```
````

### showLoadingToast 的使用

- 开启

```
  // const toast = showLoadingToast({
  //   message: "加载中...",
  //   forbidClick: true,
  //   loadingType: "spinner",
  //   duration: 0,
  //   overlay: true
  // });
```

- 关闭

```
toast.close()
```

### 一键复制功能 - 两种方法

1. vue 自定义指令 ---- 方法 1

```
<div class="copy" v-copy="value" @click="handleCopy('嘿嘿，我传参进去复制咯~')">复制</div>
```

```
const value = ref();

async function handleCopy(txt) {
      value.value = txt;
    }
```

2. 配合 vue-clipboard3 二次封装组件 ---- 方法 2

- 这里没有全局注册，考虑到复制功能用到的地方很少， 如果需要使用，需要手动导入

```
import CopyText from "@/components/localComponents/CopyText/index.vue";
components: { CopyText },
```

```
<copy-text :value="value" @click="handleCopy('我是需要复制的文本！！！')"
      ><van-button type="primary">复制</van-button></copy-text
    >
```

### 缺省页使用

- index 根据不同的索引加载不同的 图片 具体前往 src/components/globalComponents/NoData 查看

```
<no-data index="0"></no-data>
```

### 骨架屏的简单使用

```
<van-skeleton :loading="loading">
      <template #template>
        <div
          class="custom-skeleton"
          :style="{ display: 'flex', width: '100%' }"
        >
          <!-- <van-skeleton-image /> -->
          <div class="skeleton-item" v-for="item in 8" :key="item">
            <van-config-provider :theme-vars="themeVars" style="height: 100%">
              <van-skeleton-paragraph style="height: 100%" />
            </van-config-provider>
          </div>
        </div>
      </template>
      <div class="menu-box">
        <div class="item" v-for="(item, index) in 8" :key="item">
          菜单{{ index }}
        </div>
      </div>
    </van-skeleton>
```

```
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
    width: calc((100vw - 72px) / 4);
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
```

### 自定义 360° 旋转指令 v-rotate

```
<SvgIcon v-rotate icon-class="loading" />
```

### menu 菜单数据

```
 const menuList = [
      [
        {
          name: "天猫新品",
          icon: "https://cdn.uviewui.com/uview/menu/11.png",
        },
        {
          name: "今日爆款",
          icon: "https://cdn.uviewui.com/uview/menu/9.png",
        },
        {
          name: "天猫国际",
          icon: "https://cdn.uviewui.com/uview/menu/17.png",
        },
        {
          name: "饿了么",
          icon: "https://cdn.uviewui.com/uview/menu/6.png",
        },
        {
          name: "天猫超市",
          icon: "https://cdn.uviewui.com/uview/menu/11.png",
        },
        {
          name: "分类",
          icon: "https://cdn.uviewui.com/uview/menu/2.png",
        },
        {
          name: "天猫美食",
          icon: "https://cdn.uviewui.com/uview/menu/3.png",
        },
        {
          name: "阿里健康",
          icon: "https://cdn.uviewui.com/uview/menu/12.png",
        },
        {
          name: "口碑生活",
          icon: "https://cdn.uviewui.com/uview/menu/7.png",
        },
      ],
      [
        {
          name: "充值中心",
          icon: "https://cdn.uviewui.com/uview/menu/8.png",
        },
        {
          name: "机票酒店",
          icon: "https://cdn.uviewui.com/uview/menu/10.png",
        },
        {
          name: "金币庄园",
          icon: "https://cdn.uviewui.com/uview/menu/18.png",
        },
        {
          name: "阿里拍卖",
          icon: "https://cdn.uviewui.com/uview/menu/15.png",
        },
        {
          name: "淘宝吃货",
          icon: "https://cdn.uviewui.com/uview/menu/16.png",
        },
        {
          name: "闲鱼",
          icon: "https://cdn.uviewui.com/uview/menu/4.png",
        },
        {
          name: "会员中心",
          icon: "https://cdn.uviewui.com/uview/menu/6.png",
        },
        {
          name: "造点新货",
          icon: "https://cdn.uviewui.com/uview/menu/13.png",
        },
        {
          name: "土货鲜食",
          icon: "https://cdn.uviewui.com/uview/menu/14.png",
        },
      ],
    ];
```

### video 自定义视频播放控件 组件的使用

```
 <VideoPlayer
        style="margin-top: 12px"
        src="https://img.grjk520.com/36250920230512115406741.mp4"
        poster="https://img2.baidu.com/it/u=3875916195,2675881291&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
      />
```

### 拓展

1. 头部导航 的封装 （支持占位符）---- 方法 1

```
<div class="nav-box">
  <div class="nav-content">我是导航</div>
</div>
```

```
.nav-box {
  position: relative;
  width: 100%;
  height: 42px;
  .nav-content {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: aliceblue;
  }
}

```

2. 头部导航 的封装 （支持占位符）---- 方法 2

```
<div class="custom-nav-box">
  <div class="nav-box">
    <div class="nav-content">我是导航</div>
  </div>
</div>

```

```
.custom-nav-box {
  height: 44px;
  .nav-box {
  position: fixed;
  width: 100%;
  height: 44px;
  background-color: rgb(235, 239, 243);
    .nav-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
      &::after {
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        top: -50%;
        right: -50%;
        bottom: -50%;
        left: -50%;
        border: 0 solid #e211bf;
        transform: scale(0.5);
        border-bottom-width: 1px;
      }
    }
  }
}

```

