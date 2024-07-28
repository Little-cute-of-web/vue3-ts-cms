/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '@/utils/cache' {
  export function setCache(key: string, value: any): void;
  export function getCache(key: string): any;
  export function deleteCache(key: string): void;
  export function clearCache(): void;
}
declare module '*.js'