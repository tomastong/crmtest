/**
 * @file 部门管理
 * @author donghongyan
 * @date 2020-06-15
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": {
            "total": 3,
            "rows": [{
                    "id": 1,
                    "parentId": 0,
                    "name": "生产部",
                    "createDate": "2020-06-15",
                    "remarks": "备注",
                    "children": [{
                            "id": 4,
                            "parentId": 1,
                            "name": "生产-压块",
                            "createDate": "2020-06-15",
                            "remarks": "备注",
                            "deptName": "生产部"
                        },
                        {
                            "id": 5,
                            "parentId": 1,
                            "name": "生产-合成",
                            "createDate": "2020-06-15",
                            "remarks": "备注",
                            "deptName": "生产部"
                        }
                    ]
                },
                {
                    "id": 2,
                    "parentId": 0,
                    "name": "技术部",
                    "createDate": "2020-06-15",
                    "remarks": "备注",
                    "children": [{
                            "id": 6,
                            "parentId": 2,
                            "name": "技术-前端",
                            "createDate": "2020-06-15",
                            "remarks": "备注",
                            "deptName": "生产部"
                        },
                        {
                            "id": 7,
                            "parentId": 2,
                            "name": "技术-ui",
                            "createDate": "2020-06-15",
                            "remarks": "备注",
                            "deptName": "生产部"
                        }
                    ]
                }
            ]
        }
    };
}