/**
 * @file 路由配置文件
 * @author donghongyan
 * @date 2020-06-01
 */

import login from '@/pages/login';

export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: '登录',
        component: login
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/layout/home.vue'),
        children: [
        ]
    }
    // 系统设置类
    // {path: '/admin/branch', name: 'branchList', component: () => import('@/pages/admin/branch/branchList.vue')},
    // {path: '/admin/role', name: 'roleList', component: () => import('@/pages/admin/role/roleList.vue')},
    // {path: '/admin/user', name: 'userList', component: () => import('@/pages/admin/user/userList.vue')},
    // {path: '/department/list', name: 'profile', component: () => import('@/pages/admin/department/list.vue')},
    // {path: '/admin/menu', name: 'menuList', component: () => import('@/pages/admin/menu/menuList.vue')},
    // {path: '/dictionary/type', name: 'dictionaryType', component: () => import('@/pages/admin/dictionaryType/list.vue')},
    // {path: '/dictionary/list', name: 'dictionaryData', component: () => import('@/pages/admin/dictionaryData/list.vue')}
];