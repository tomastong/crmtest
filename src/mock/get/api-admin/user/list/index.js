/**
 * @file 用户管理列表
 * @author donghongyan
 * @date 2020-06-16
 */

module.exports = function () {
    return {
        "msg": "操作成功",
        "code": 0,
        "page": {
            "total": 12,
            "rows": [{
                    "userId": 11,
                    "name": "配料员2",
                    "username": "peiliao2",
                    "deptId": 3,
                    "roleId": 10,
                    "roleName": "超级管理员",
                    "dept": "生产部",
                    "deptIdList": '1,4',
                    "sex": "男",
                    "mailbox": "2323232@163.com",
                    "birthDate": "1996-01-02",
                    "provinceId": 2,
                    "cityId": 3,
                    "province": "河南",
                    "city": "郑州",
                    "status": 1
                },
                {
                    "userId": 12,
                    "name": "配料员2",
                    "username": "peiliao2",
                    "deptId": 3,
                    "dept": "生产部",
                    "deptIdList": '1,4',
                    "roleName": "超级管理员",
                    "sex": "男",
                    "mailbox": "2323232@163.com",
                    "birthDate": "1996-01-02",
                    "provinceId": 2,
                    "cityId": 10,
                    "province": "河南",
                    "city": "郑州",
                    "status": 1
                }
            ]
        }
    }
}