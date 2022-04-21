import { usersInter } from "@/interface/users";

export const users = {
  namespaced: true,
  state: (): usersInter => {
    return {
      profile: {
        username: "",
        email: "",
        avatar: "",
        token: "",
      },
    };
  },
  mutations: {
    // 保存用户信息
    setProfile(state: any, profile: usersInter) {
      state.profile = profile;
      console.log(state);
    },
    // 退出登录
    logout(state: any) {
      for (const key in state.profile) {
        state.profile[key] = "";
      }
    },
  },
};
