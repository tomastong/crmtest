/**
 * @file 主配置文件说明
 * @author donghongyan
 * @date 2020-06-01
 */

module.exports = {
  publicPath: './',
  lintOnSave: false,
  filenameHashing: false,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '智慧生产流程管控系统',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  devServer: {
    port: 8080,
    // proxy: {
    //   // proxy all requests starting with /api to jsonplaceholder
    //   '/api-admin': {
    //     target: 'http://119.3.84.244:8002', // 代理接口
    //     // target: 'http://192.168.1.160:8005', // 代理接口
    //     changeOrigin: true
    //     // pathRewrite: {
    //     //     '^/api': '/mock' // 代理的路径
    //     // }
    //   }
    // },
    before: function (app) {
      app.use(require('./server/mockServer'));
    },
    overlay: {
      warning: false,
      error: true
    }
  }
};