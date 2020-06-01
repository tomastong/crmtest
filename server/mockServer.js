/**
 * @file mock文件
 * @author donghongyan
 * @date 2020-06-01
 */

module.exports = function (req, res, next) {
    const method = (req.method || 'GET').toLowerCase();
    if (req.headers['x-requested-with'] === 'XMLHttpRequest') {
        const base = `../src/mock/${method}${req.url}/index.js`;
        const json = require(base)();
        res.send(json);
    }

    next();
};
