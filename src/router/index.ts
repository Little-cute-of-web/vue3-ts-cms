import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('@/views/main/main.vue'),
    children: [
      {
        path: 'analysis/dashboard',
        name: 'dashboard',
        component: () =>
          import('@/views/main/analysis/dashboard/dashboard.vue'),
      },
      {
        path: 'analysis/overview',
        name: 'overview',
        component: () => import('@/views/main/analysis/overview/overview.vue'),
      },
      {
        path: 'system/user',
        name: 'user',
        component: () => import('@/views/main/system/user/user.vue'),
      },
      {
        path: 'system/department',
        name: 'department',
        component: () =>
          import('@/views/main/system/department/department.vue'),
      },
      {
        path: 'system/menu',
        name: 'menu',
        component: () => import('@/views/main/system/menu/menu.vue'),
      },
      {
        path: 'system/role',
        name: 'role',
        component: () => import('@/views/main/system/role/role.vue'),
      },
      {
        path: 'product/category',
        name: 'category',
        component: () => import('@/views/main/product/category/category.vue'),
      },
      {
        path: 'product/goods',
        name: 'goods',
        component: () => import('@/views/main/product/goods/goods.vue'),
      },
      {
        path: 'story/chat',
        name: 'chat',
        component: () => import('@/views/main/story/chat/chat.vue'),
      },
      {
        path: 'story/list',
        name: 'list',
        component: () => import('@/views/main/story/list/list.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/notFound',
  },
  {
    path: '/notFound',
    name: 'notFound',
    component: () => import('../views/not-found/not-found.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
