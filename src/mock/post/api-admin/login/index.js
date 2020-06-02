/**
 * @file 登录接口返回
 * @author donghonghyan
 * @date 2020-06-01
 */

module.exports = function () {
    return {
        code: 0,
        msg: '登录成功',
        router: [
            {
                id: 3,
                name: '系统管理',
                leaf: false,
                menuShow: true,
                parentId: 0,
                iconCls: 'fa fa-desktop',
                children: [
                    {
                        path: '/admin/branch',
                        id: 103,
                        name: '部门管理',
                        leaf: true,
                        menuShow: true,
                        parentId: 3,
                        iconCls: 'fa fa-coffee',
                        children: [
                            {
                                path: '/api-admin/dept/update',
                                id: 105,
                                name: '编辑',
                                leaf: false,
                                menuShow: true,
                                parentId: 103,
                                children: []
                            },
                            {
                                path: '/api-admin/dept/save',
                                id: 104,
                                name: '新增',
                                leaf: false,
                                menuShow: true,
                                parentId: 103,
                                children: []
                            },
                            {
                                path: '/api-admin/dept/list',
                                id: 131,
                                name: '列表',
                                leaf: false,
                                menuShow: true,
                                parentId: 103,
                                children: []
                            },
                            {
                                path: '/api-admin/dept/remove',
                                id: 106,
                                name: '删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 103,
                                children: []
                            }
                        ]
                    },
                    {
                        path: '/admin/role',
                        id: 7,
                        name: '角色管理',
                        leaf: true,
                        menuShow: true,
                        parentId: 3,
                        iconCls: 'fa fa-paw',
                        children: [
                            {
                                path: '/api-admin/role',
                                id: 56,
                                name: '删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 7,
                                children: []
                            },
                            {
                                path: '/api-admin/role',
                                id: 55,
                                name: '编辑',
                                leaf: false,
                                menuShow: true,
                                parentId: 7,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/role/batchRemove',
                                id: 62,
                                name: '批量删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 7,
                                children: []
                            },
                            {
                                path: '/api-admin/role',
                                id: 15,
                                name: '新增',
                                leaf: false,
                                menuShow: true,
                                parentId: 7,
                                iconCls: '',
                                children: []
                            }
                        ]
                    },
                    {
                        path: '/admin/user',
                        id: 6,
                        name: '用户管理',
                        leaf: true,
                        menuShow: true,
                        parentId: 3,
                        iconCls: 'fa fa-user',
                        children: [
                            {
                                path: '/api-admin/user',
                                id: 14,
                                name: '删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 6,
                                children: []
                            },
                            {
                                path: '/api-admin/user/resetPwd',
                                id: 26,
                                name: '重置密码',
                                leaf: false,
                                menuShow: true,
                                parentId: 6,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/user',
                                id: 13,
                                name: '编辑',
                                leaf: false,
                                menuShow: true,
                                parentId: 6,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/user',
                                id: 12,
                                name: '新增',
                                leaf: false,
                                menuShow: true,
                                parentId: 6,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/user',
                                id: 24,
                                name: '批量删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 6,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/user/disable',
                                id: 25,
                                name: '停用',
                                leaf: false,
                                menuShow: true,
                                parentId: 6,
                                children: []
                            }
                        ]
                    },
                    {
                        path: '/admin/menu',
                        id: 2,
                        name: '系统菜单',
                        leaf: true,
                        menuShow: true,
                        parentId: 3,
                        iconCls: 'fa fa-th-list',
                        children: [
                            {
                                path: '/api-admin/menu',
                                id: 77,
                                name: '列表',
                                leaf: false,
                                menuShow: true,
                                parentId: 2,
                                children: []
                            },
                            {
                                path: '/api-admin/menu/batchRemove',
                                id: 61,
                                name: '批量删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 2,
                                children: []
                            },
                            {
                                path: '/api-admin/menu/userMenus',
                                id: 112,
                                name: '查询菜单',
                                leaf: false,
                                menuShow: true,
                                parentId: 2,
                                children: []
                            },
                            {
                                path: '/api-admin/menu',
                                id: 22,
                                name: '删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 2,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/menu',
                                id: 21,
                                name: '编辑',
                                leaf: false,
                                menuShow: true,
                                parentId: 2,
                                iconCls: '',
                                children: []
                            },
                            {
                                path: '/api-admin/menu',
                                id: 20,
                                name: '新增',
                                leaf: false,
                                menuShow: true,
                                parentId: 2,
                                iconCls: '',
                                children: []
                            }
                        ]
                    },
                    {
                        path: '/dictionary/type',
                        id: 231,
                        name: '字典分类',
                        leaf: true,
                        menuShow: true,
                        parentId: 3,
                        iconCls: 'fa fa-book',
                        children: [
                            {
                                path: '/api-admin/dictType/delete',
                                id: 234,
                                name: '删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 231,
                                children: []
                            },
                            {
                                path: '/api-admin/dictType/save',
                                id: 232,
                                name: '新增',
                                leaf: false,
                                menuShow: true,
                                parentId: 231,
                                children: []
                            },
                            {
                                path: '/api-admin/dictType/update',
                                id: 233,
                                name: '编辑',
                                leaf: false,
                                menuShow: true,
                                parentId: 231,
                                children: []
                            }
                        ]
                    },
                    {
                        path: '/dictionary/list',
                        id: 227,
                        name: '数据字典',
                        leaf: true,
                        menuShow: true,
                        parentId: 3,
                        iconCls: 'fa fa-book',
                        children: [
                            {
                                path: '/api-admin/dict/save',
                                id: 235,
                                name: '新增',
                                leaf: false,
                                menuShow: true,
                                parentId: 227,
                                children: []
                            },
                            {
                                path: '/api-admin/dict/delete',
                                id: 237,
                                name: '删除',
                                leaf: false,
                                menuShow: true,
                                parentId: 227,
                                children: []
                            },
                            {
                                path: '/dictionary/list',
                                id: 229,
                                name: '字典列表',
                                leaf: false,
                                menuShow: true,
                                parentId: 227,
                                children: []
                            },
                            {
                                path: '/api-admin/dict/update',
                                id: 236,
                                name: '编辑',
                                leaf: false,
                                menuShow: true,
                                parentId: 227,
                                children: []
                            }
                        ]
                    }
                ]
            }
        ],
        code: 0,
        perms: [
            'admin:dict:save',
            'admin:role:remove',
            'admin:dictType:delete',
            'admin:branch:edit',
            'admin:dict:delete',
            'admin:role:edit',
            'admin:dictType:save',
            'admin:branch:add',
            'admin:menu:list',
            'admin:dictonary:list',
            'admin:role:batchRemove',
            'admin:branch:list',
            'admin:menu:batchRemove',
            'admin:dict:update',
            'admin:menu:userMenus',
            'admin:dictType:update',
            'admin:branch:delete',
            'admin:user:remove',
            'admin:menu:remove',
            'admin:user:resetPwd',
            'admin:user:edit',
            'admin:user:add',
            'admin:user:batchRemove',
            'admin:menu:edit',
            'admin:branch:branch',
            'admin:role:add',
            'admin:user:disable',
            'admin:menu:add',
            'admin:role:role',
            'admin:user:user',
            'admin:menu:menu',
            'admin:dictionary:type',
            'admin:dictionary:list'
        ],
        user: {
            userId: 1,
            username: 'admin',
            name: '超级管理员',
            deptId: 1,
            password: 'b6583e756408e6af4533bbcc04ae4499',
            mobile: '17699999999',
            status: 1,
            userIdCreate: 1,
            gmtCreate: '2017-08-15 00:00:00',
            gmtModified: '2018-11-27 14:27:29',
            picturePath: 'http://tf.ibiandan.cn:8004/files/customer/18/73/ed343c2e-ce78-40bb-bf7e-9a7cde9bf684'
        },
        token: 'eyJhbGciOiJIUzI1NiJ9'
    };
};
