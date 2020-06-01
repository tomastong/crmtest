/**
 * @file 路由配置文件
 * @author donghongyan
 * @date 2020-06-01
 */

import login from '@/pages/login';

export default [
    {path: '/', redirect: '/login'},
    {path: '/login', component: login}
];