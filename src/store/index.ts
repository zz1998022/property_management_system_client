import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { users } from "@/store/users";
import { UsersInter } from "@/interface/users";

export interface State {
  users: UsersInter;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
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

export function useStore() {
  return baseUseStore(key);
}
