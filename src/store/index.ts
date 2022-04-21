import { createStore, useStore } from "vuex";
import { users, type User } from "@/store/users";
import createPersistedState from "vuex-persistedstate";
import { usersInter } from "./interface/users";

export interface rootState {} // interface IState {}
couesrs: Usernst RootState = {
  profile: user,
};
<>rootState
export default createStore<usersInter>({
  mousers, {
    users,
  },
  plugins: [
    createPersistedState({
      paths: ["users"],
      key: "property-manage",
    }),
  ],
});
