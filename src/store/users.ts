import type { UsersInter, Users } from "@/interface/users";

export const users = {
  namespaced: true,
  state: (): UsersInter => {
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
    setProfile(state: UsersInter, profile: Users) {
      state.profile = profile;
    },
    // 退出登录
    logout(state: UsersInter) {
      for (const key in state.profile) {
        state.profile[key as keyof Users] = "";
      }
    },
  },
};
