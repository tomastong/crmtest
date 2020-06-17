/**
 * @file 路由配置文件
 * @author donghongyan
 * @date 2020-06-01
 */

export default [{
    path: '/',
    redirect: '/home'
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
      },
      {
        path: '/calculation/rules',
        name: 'calculationRules',
        meta: ['系统管理', '计算规则'],
        component: () => import('@/pages/admin/calculation/rules/index.vue')
      },
      {
        path: '/department/manage',
        name: 'departmentManage',
        meta: ['系统管理', '部门管理'],
        component: () => import('@/pages/admin/department/manage/index.vue')
      },
      {
        path: '/user/manage',
        name: 'userManage',
        meta: ['系统管理', '用户管理'],
        component: () => import('@/pages/admin/user/manage/index.vue')
      },
      {
        path: '/role/manage',
        name: 'roleManage',
        meta: ['系统管理', '角色管理'],
        component: () => import('@/pages/admin/role/manage/index.vue')
      }
    ]
  }
];