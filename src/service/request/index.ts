import axios from 'axios';
import { ElLoading } from 'element-plus';
import type { AxiosInstance } from 'axios';
import 'element-plus/es/components/loading/style/css';
import type { HYRequestConfig, HYRequestInterceptors } from './type';

const DEFAULT_LOADING = true;
// interface HYRequestInterceptors<T = any> {
//   requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
//   requestInterceptorCatch?: (error: any) => any;
//   responseInterceptor?: (res: AxiosResponse<T>) => AxiosResponse<T>;
//   rsponseInterceptorCatch?: (error: any) => any;
// }
// interface HYRequestConfig<T = any> extends AxiosRequestConfig {
//   interceptors?: HYRequestInterceptors<T>;
//   showLoading?: boolean;
// }
class HYRequest<T = any> {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  showLoading?: boolean;
  loading: any;
  constructor(config: HYRequestConfig) {
    this.showLoading === undefined ? DEFAULT_LOADING : config.showLoading;
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // config取出拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0,0,0,0.7)',
            fullscreen: true,
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading.close();
        return res.data;
      },
      (err) => {
        this.loading?.close();
        return err;
      }
    );
  }
  request<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<T, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
        .finally(() => {
          this.showLoading = DEFAULT_LOADING;
        });
    });
  }
  get<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }
  post<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T>(config: HYRequestConfig): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default HYRequest;
