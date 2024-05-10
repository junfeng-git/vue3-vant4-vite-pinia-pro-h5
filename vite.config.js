import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteVConsole } from "vite-plugin-vconsole";
import { viteMockServe } from "vite-plugin-mock";
import { createProxy } from "./build/vite/proxy";
import { wrapperEnv } from "./build/utils";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  // console.log("viteEnv:", viteEnv);
  const {
    VITE_PROXY,
    VITE_GLOB_APP_TITLE,
    VITE_DROP_CONSOLE,
    VITE_OPEN_VCONSOLE,
    VITE_USE_MOCK,
    VITE_PORT,
  } = viteEnv;

  return defineConfig({
    plugins: [
      vue(),
      // Components({
      //   resolvers: [VantResolver()],
      //   dirs: ["src/components/globalComponents"],
      // }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹(路径为存放所有svg图标的文件夹不单个svg图标)
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
      createHtmlPlugin({
        inject: {
          data: {
            //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
            title: VITE_GLOB_APP_TITLE,
          },
        },
      }),
      viteVConsole({
        entry: [resolve("src/main.js")], // or you can use entry: [path.resolve('src/main.ts')]
        localEnabled: VITE_OPEN_VCONSOLE,
        enabled: VITE_OPEN_VCONSOLE,
        config: {
          maxLogNumber: 1000,
          theme: "light", // light | dark
        },
      }),
      viteMockServe({
        // mock配置文件的路径,相对于vite.config.js
        mockPath: "mock",
        // dev是否开启mock
        localEnabled: VITE_USE_MOCK,
        // prod是否开启mock
        prodEnabled: VITE_USE_MOCK,
        //设置是否监视mockPath对应的文件夹内文件中的更改
        watchFiles: true,
        // 动态导入mock生效代码,这样可以控制关闭mock的时候不让mock打包到最终代码内
        // /mock/_createProductionServer 这个路径是相对于 main.js的位置来的
        injectCode: `
          import { setupProdMockServer } from '/mock/_createProductionServer';
          setupProdMockServer();
        `,
        supportTs: false, // 不监听ts,监听js
        logger: false, // 开启log
      }),
    ],
    resolve: {
      // ↓路径别名
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ["console", "debugger"] : [],
    },
    server: {
      // Listening on all local IPs
      host: true,
      https: false,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {
      sourcemap: false, // 打包后是否生成 source map 文件
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import './src/styles/variables.less';`,
        },
      },
    },
  });
};
