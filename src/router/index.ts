import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home",
        redirect: "/home/main",
      },
      {
        path: "/home/main",
        name: "HomeMain",
        component: () => import("@/views/HomeMain.vue"),
      },
    ],
  },
  // 登录
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 初始化store
  const state: any = store.state;
  // 判断用户的路由地址
  if (to.name !== "Login" && !state.users.profile.token) {
    next({ name: "Login" });
  } else if (to.name == "Login" && state.users.profile.token) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
