import type { RouteRecordRaw } from 'vue-router';
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  //所有的route
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context('../router/main', true, /\.ts$/);
  routeFiles.keys().forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const route = require('../router/main' + key.split('.')[1]);
    allRoutes.push(route.default[0]);
  });

  // 根据菜单获取需要添加的routes
  const _resourceGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          routes.push(route);
        }
      } else {
        _resourceGetRoute(menu.children);
      }
    }
  };
  _resourceGetRoute(userMenus);
  return routes;
}
