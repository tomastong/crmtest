/**
 * @file 获取所有部门
 * @author donghongyan
 * @date 2020-06-16
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": [{
                "id": 1,
                "parentId": 0,
                "name": "生产部",
                "children": [{
                        "id": 4,
                        "parentId": 1,
                        "name": "生产-压块"
                    },
                    {
                        "id": 5,
                        "parentId": 1,
                        "name": "生产-合成"
                    }
                ]
            },
            {
                "id": 2,
                "parentId": 0,
                "name": "技术部",
                "children": [{
                        "id": 6,
                        "parentId": 2,
                        "name": "技术-前端"
                    },
                    {
                        "id": 7,
                        "parentId": 2,
                        "name": "技术-ui"
                    }
                ]
            }
        ]
    }
}