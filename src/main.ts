import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入antd样式文件
import "ant-design-vue/dist/antd.less";
// 全局引入antd
import antd from "ant-design-vue";
// 引入echarts

createApp(App).use(store).use(router).use(antd).mount("#app");
