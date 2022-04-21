import { createStore, useStore } from "vuex";
import { users } from "@/store/users";
import createPersistedState from "vuex-persistedstate";
import { usersInter } from "./interface/users";

// interface IState {}
const RootState = {
  profile: user,
};

export default createStore<usersInter>({
  modules: {
    users,
  },
  plugins: [
    createPersistedState({
      paths: ["users"],
      key: "property-manage",
    }),
  ],
});
