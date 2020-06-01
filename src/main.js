/**
 * @file 入口文件
 * @author donghongyan
 * @date 2020-06-01
 */
import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './plugins/element.js';

import axios from '@/utils/axios';
import 'normalize.css';
import '@/assets/css/global.less';

Vue.config.productionTip = false;

Vue.use(axios);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
