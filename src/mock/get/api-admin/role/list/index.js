/**
 * @file 角色列表
 * @author donghongyan
 * @date 2020-06-16
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": {
            "total": 4,
            "rows": [{
                    "roleId": 10,
                    "roleName": "生产角色",
                    "menuIds": "10,12",
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
                        },
                        {
                            "menuId": 12,
                            "parentId": 0,
                            "name": "菜单名称2",
                            "checked": true
                        }
                    ],
                    "remarks": "生产权限"
                },
                {
                    "roleId": 11,
                    "roleName": "加工角色",
                    "menuIds": "0,2,6,8",
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
                    "remarks": "加工备注"
                }
            ]
        }
    }
}