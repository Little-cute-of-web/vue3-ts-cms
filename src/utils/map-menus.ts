import type { RouteRecordRaw } from 'vue-router';
import type { IRoutes } from '@/service/login/types';
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
//currentPath: string
// export function pathMapBreadcrumb(userMenus: IRoutes[]) {
//   let routes: IRoutes[] = [];
//   const _filterTypes = (menuItems: IRoutes[]) => {
//     return menuItems.reduce((acc: IRoutes[], item) => {
//       if (item.type === 1 || item.type === 2) {
//         acc.push(item);
//       }
//       if (item.children && item.children.length > 0) {
//         acc.push(..._filterTypes(item.children));
//       }
//       return acc;
//     }, []);
//   };
//   routes = _filterTypes(userMenus);
//   const newRoutes = routes.map((item) => {
//     return {
//       name: item.name,
//       path: '',
//     };
//   });
//   console.log('newRoutes', newRoutes);

//   return newRoutes;
// }
/**
 *
 * @param path 当前用户所在的路由地址
 * @param userMenus 所有的菜单
 * @returns 面包屑需要展示的数组
 */
export function mapPathToBreadCrumb(path: string, userMenus: IRoutes[]) {
  const breadcrumbs: any[] = [];
  for (const menu of userMenus) {
    if (menu.children && menu.children?.length > 0) {
      for (const submenu of menu.children) {
        if (submenu.url === path) {
          breadcrumbs.push({ id: menu.id, name: menu.name, url: menu.url });
          const { id, name, url } = submenu;
          breadcrumbs.push({ id, name, url });
        }
      }
    }
  }
  console.log('breadcrumbs', breadcrumbs);
  return breadcrumbs;
}
