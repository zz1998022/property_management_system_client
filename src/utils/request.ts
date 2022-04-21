import axios, { AxiosRequestConfig } from "axios";
import router from "@/router";
import store from "@/store";
import { MyResponseType } from "@/@types";

type store = any;

// 基准请求地址
const baseURL = "http://localhost:3000";

const instance = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
const instanceWithOutToken = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器
// instance.interceptors.request.use(
//   <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
//     // 获取store
//     const anyStore: any = store;
//     // 获取token
//     const token = anyStore.state.users.profile.token;
//     console.log(token);
//     if (!config.headers) {
//       config.headers = {};
//     }
//     // 判断token是否存在
//     if (token) {
//       config.headers.Authorization = "Bearer " + token;
//     }
//     const { data } = await instance.request<MyResponseType<T>>(config);
//     return config;
//   }
// );

export const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<MyResponseType<T>> => {
  // 获取store
  // const anyStore: any = store;
  // 获取token
  // const token = anyStore.state.users.profile.token;
  store.state.users.profile.token;
  // console.log(token);
  if (!config.headers) {
    config.headers = {};
  }
  // 判断token是否存在
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  const { data } = await instance.request<MyResponseType<T>>(config);
  console.log(data);
  data.code === 200
    ? console.log(data.message) // 成功消息提示
    : console.error(data.message); // 失败消息提示
  return data;
};

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      // token过期
      // 跳转到登录页面
      router
        .push("/login")
        .then(() => {
          console.log("跳转成功");
        })
        .catch(() => {
          console.log("跳转失败");
        });
      return Promise.reject(error);
    }
  }
);

instanceWithOutToken.interceptors.response.use((response) => response.data);

// 用于生成请求配置的函数
function generateRequestConfig(url: string, method: any, data: any) {
  return {
    url: url,
    method: method,
    [method === "get" ? "params" : "data"]: data,
  };
}
// 用于发送普通请求
export function requestWithoutToken(url: string, method: any, data: any) {
  return instanceWithOutToken(generateRequestConfig(url, method, data));
}
