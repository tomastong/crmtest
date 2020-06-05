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

import eventbus from '@/utils/eventbus';
import axios from '@/utils/axios';
import 'normalize.css';
import '@/assets/fonts/font-awesome.min.css';
import '@/assets/css/global.less';

Vue.config.productionTip = false;
Vue.config.errorHandler = function (err, vm, info) {
  console.log(`Error: ${err.toString()}
Info: ${info}`);
};
Vue.use(eventbus);
Vue.use(axios);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');