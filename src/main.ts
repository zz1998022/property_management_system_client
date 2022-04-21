import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";
// 引入antd样式文件
import "ant-design-vue/dist/antd.less";
// 全局引入antd
import antd from "ant-design-vue";
// 引入echarts

const app = createApp(App).use(store, key).use(router).use(antd);

app.config.globalProperties.$store = store;

app.mount("#app");
