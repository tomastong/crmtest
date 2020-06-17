/**
 * @file 路由文件
 * @author donghongyan
 * @date 2020-06-01
 */

import Vue from 'vue';
import Router from 'vue-router';
import config from './config';

Vue.use(Router);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    routes: config
});