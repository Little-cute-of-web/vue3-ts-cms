import localCache from '@/utils/cache';
import HYRequest from './request';
import { BASE_URL, TIME_OUT } from './request/config';

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch(err) {
      console.log(err);
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(err) {
      console.log(err);
    },
  },
});

export default hyRequest;
