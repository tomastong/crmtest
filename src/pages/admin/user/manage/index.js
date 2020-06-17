/**
 * @file 表格配置
 * @author donghongyan
 * @date 2020-06-16
 */

const columnConfig = [{
        prop: 'name',
        label: '姓名',
        align: 'center'
    },
    {
        prop: 'username',
        label: '用户名',
        align: 'center'
    },
    {
        prop: 'dept',
        label: '所属部门',
        align: 'center'
    },
    {
        prop: 'roleName',
        label: '所属角色',
        align: 'center'
    },
    {
        prop: 'sex',
        label: '性别',
        align: 'center'
    },
    {
        prop: 'mailbox',
        label: '邮箱',
        minWidth: '100px',
        align: 'center'
    },
    {
        prop: 'birthDate',
        label: '出生日期',
        align: 'center'
    }
];

export {
    columnConfig
}