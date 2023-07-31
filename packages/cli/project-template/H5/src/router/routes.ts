export const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('/@/layout/basic/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
          title: '我的绩效',
          keepAlive: true,
          isHelp: true,
        },
      },
      {
        path: 'ranking',
        component: () => import('/@/views/ranking/index.vue'),
        meta: {
          title: '排行榜',
          keepAlive: true,
          isHelp: true,
        },
      },
      {
        path: 'employee',
        component: () => import('/@/views/employee/index.vue'),
        meta: {
          title: 'employee.title',
          keepAlive: true,
        },
      },
      {
        path: '/first',
        component: () => import('/@/views/first/index.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
      {
        path: '/example',
        component: () => import('/@/views/first/example.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      },
       {
        path: '/salaryDetails',
        component: () => import('/@/views/first/salaryDetails.vue'),
        meta: {
          title: '首页',
          keepAlive: true,
        },
      }
    ],
  },
];

export default routes;
