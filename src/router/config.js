/**
 * @file 路由配置文件
 * @author donghongyan
 * @date 2020-06-01
 */

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('@/pages/login/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/pages/layout/home.vue'),
    children: [
      // 系统设置类
      {
        path: '/dictionary/type',
        name: 'dictionaryType',
        meta: ['系统管理', '字典分类'],
        component: () => import('@/pages/admin/dictionary/type/index.vue')
      },
      {
        path: '/dictionary/manage',
        name: 'dictionaryManage',
        meta: ['系统管理', '字典管理'],
        component: () => import('@/pages/admin/dictionary/manage/index.vue')
      }
    ]
  },


  // {path: '/admin/branch', name: 'branchList', component: () => import('@/pages/admin/branch/branchList.vue')},
  // {path: '/admin/role', name: 'roleList', component: () => import('@/pages/admin/role/roleList.vue')},
  // {path: '/admin/user', name: 'userList', component: () => import('@/pages/admin/user/userList.vue')},
  // {path: '/department/list', name: 'profile', component: () => import('@/pages/admin/department/list.vue')},
  // {path: '/calculation/rules', name: 'menuList', component: () => import('@/pages/admin/menu/menuList.vue')},

  // {path: '/dictionary/list', name: 'dictionaryData', component: () => import('@/pages/admin/dictionaryData/list.vue')}
];