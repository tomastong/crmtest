/**
 * @file 获取角色权限
 * @author donghongyan
 * @date 2020-06-16
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": [{
                "menuId": 10,
                "parentId": 0,
                "name": "菜单名称1",
                "type": 0,
                "url": "/user/name1"
            },
            {
                "menuId": 12,
                "parentId": 10,
                "name": "菜单名称2",
                "type": 0,
                "url": "/user/name2"
            }
        ]
    }
}