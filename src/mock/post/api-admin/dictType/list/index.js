/**
 * @file 字典分类接口
 * @author donghongyan
 * @date 2020-06-04
 */

module.exports = function () {
  return {
    msg: "操作成功",
    code: 0,
    page: {
      total: 24,
      rows: [
      {
        id: 1,
        name: "使用状态",
        remarks: "设备使用状态",
        delFlag: "0"
      },
      {
        id: 2,
        name: "运行状态",
        remarks: "设备运行状态",
        delFlag: "1"
      },
      {
        id: 3,
        name: "计件单位",
        remarks: "计量单位",
        delFlag: "0"
      }]
    }
  };
}