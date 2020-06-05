/**
 * @file axios请求处理
 * @author donghongyan
 * @date 2020-06-01
 */
import axios from 'axios';
import qs from 'qs';
import { Message as message } from 'element-ui';
import bus from './bus';

// 默认配置
let instance = axios.create({
  timeout: 30000,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type': 'application/json',
    'x-requested-with': 'XMLHttpRequest'
  }
});

// 定义拦截器
instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('token');
  if (token) {
    config.headers.common.Authorization = token;
  }

  return config;
}, error => Promise.reject(error));
instance.interceptors.response.use(response => {
  const code = response.data && +response.data.code;
  if (code) {
    if (code === 401) {
      return bus.$emit('goto', '/login');
    }

    if (code === 409) {
      message({
        message: '你的的账号已经在其他地方登陆或退出登录，请重新登录！',
        type: 'warning'
      });
      return bus.$emit('goto', '/login');
    }

    if (code === 403) {
      return message({
        message: '你没有权限',
        type: 'warning'
      });
    }
  }

  return response;
}, error => {
  return Promise.reject(error);
});

// 封装请求对象
let request = options => new Promise((resolve, reject) => {
  const method = (options.type || 'GET').toLowerCase();
  let config = {
    method: options.type,
    url: options.url
  };
  if (method === 'post' && options.data) {
    config.data = options.data;
  }
  else {
    if (options.data && !options.params) {
      config.params = options.data;
      delete options.data;
    }
  }
  instance(config).then(data => {
    const result = data.data;
    if (+result.code === 0) {
      return resolve(result);
    }

    return reject(result);
  }).catch(error => {
    reject(error);
  });
});

export default {
  install(Vue) {
    Vue.prototype.$axios = request;
  }
};