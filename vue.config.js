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
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'CRM系统',
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },
    devServer: {
        port: 8080,
        // proxy: {
        //     // proxy all requests starting with /api to jsonplaceholder
        //     '/polaris': {
        //         target: '', // 代理接口
        //         changeOrigin: true
        //         // pathRewrite: {
        //         //     '^/api': '/mock' // 代理的路径
        //         // }
        //     }
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
