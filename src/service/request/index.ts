import axios from 'axios';
import { ElLoading } from 'element-plus';
import type { AxiosInstance } from 'axios';
import 'element-plus/es/components/loading/style/css';
import type { HYRequestConfig, HYRequestInterceptors } from './type';

const DEFAULT_LOADING = true;

class HYRequest {
  instance: AxiosInstance;
  interceptors?: HYRequestInterceptors;
  showLoading?: boolean;
  loading: any;
  constructor(config: HYRequestConfig) {
    this.showLoading === undefined ? DEFAULT_LOADING : config.showLoading;
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // 单个实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // config取出拦截器
    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)',
          }) as any;
        }
        return config;
      },
      (err) => {
        console.log(err);
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        return res.data;
      },
      (err) => {
        this.loading?.close();
        console.log(err);
      }
    );
  }
  // request<T = any>(config: HYRequestConfig<T>): Promise<T> {
  //   return new Promise((resolve, reject) => {
  //     if (config.showLoading === false) {
  //       this.showLoading = config.showLoading;
  //     }
  //     this.instance
  //       .request<any, T>(config)
  //       .then((res) => {
  //         resolve(res);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       })
  //       .finally(() => {
  //         this.showLoading = DEFAULT_LOADING;
  //       });
  //   });
  // }
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' });
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default HYRequest;
