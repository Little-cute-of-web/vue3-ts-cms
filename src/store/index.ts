import { createStore } from 'vuex';
import login from './login/login';
import type { IRootState } from './type';
const store = createStore<IRootState>({
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    login,
  },
});
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}
setupStore();
export default store;
