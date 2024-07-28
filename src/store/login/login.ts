import type { Module } from 'vuex';
import { useRouter } from 'vue-router';
import localCache from '@/utils/cache';
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId,
} from 'service/login/login';
import type { IAccount } from 'service/login/types';
import type { ILoginState } from './types';
import type { IRootState } from '../type';

const router = useRouter();
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus: []) {
      state.userMenus = userMenus;
    },
  },
  actions: {
    async accountLoginAction({ commit, dispatch }, playload: IAccount) {
      // 调用登录服务 获取登录结果
      const loginRequst = await accountLoginRequest(playload);
      const { id, token } = loginRequst.data;
      localCache.setCache('token', token);
      // 存起来
      commit('changeToken', token);
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit('changeUserMenus', userMenus);
      localCache.setCache('userMenus', userMenus);
      router.push('/main');
    },
  },
};
export default loginModule;
