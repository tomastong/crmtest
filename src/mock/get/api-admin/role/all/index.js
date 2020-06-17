/**
 * @file 所有角色
 * @author donghongyan
 * @date 2020-06-16
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": [{
                "roleId": 10,
                "roleName": "生产",
                "menuIds": "10,11",
                "menuList": [{
                        "menuId": 10,
                        "parentId": 0,
                        "name": "菜单名称1",
                        "checked": true
                    },
                    {
                        "menuId": 11,
                        "parentId": 0,
                        "name": "菜单名称2",
                        "checked": false
                    }
                ],
                "remarks": ""
            },
            {
                "roleId": 11,
                "roleName": "分配",
                "menuIds": "10,11",
                "menuList": [{
                        "menuId": 10,
                        "parentId": 0,
                        "name": "菜单名称",
                        "checked": true
                    },
                    {
                        "menuId": 10,
                        "parentId": 0,
                        "name": "菜单名称",
                        "checked": false
                    }
                ],
                "remarks": ""
            }
        ]
    }
}