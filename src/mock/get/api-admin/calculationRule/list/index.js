/**
 * @file 获取计算规则
 * @author donghongyan
 * @date 2020-06-15
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": {
            "total": 24, //总数
            "rows": [ //当前页的数据
                {
                    "id": 1,
                    "minWeight": 100,
                    "maxWeight": 200,
                    "insulationDate": "20",
                    "rule": "计算规则"
                },
                {
                    "id": 2,
                    "minWeight": 100,
                    "maxWeight": 200,
                    "insulationDate": "20",
                    "rule": "计算规则"
                },
            ]
        }
    };
}