/**
 * @file 部门管理对话框
 * @author donghongyan
 * @date 2020-06-04
 */

<template>
  <el-dialog
    :title="title"
    width="400px"
    custom-class="department-dialog"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item v-if="form.deptName" prop="deptName" label="所属部门" :label-width="formLabelWidth">
        <el-input type="name" v-model="form.deptName" disabled placeholder="所属一级部门名称"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="部门名称" :label-width="formLabelWidth">
        <el-input type="name" v-model="form.name" autocomplete="off" placeholder="请填写部门名称"></el-input>
      </el-form-item>
      <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model.trim="form.remarks" style="width: 250px"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showDialog: true,
      title: "一级部门新增",
      formLabelWidth: "100px",
      form: {
        id: "",
        deptName: "",
        parentId: "",
        // 如parentId为'',name是一级部门;否则二级部门
        name: "",
        remarks: ""
      },
      rules: {
        deptName: [
          { required: true, trigger: "blur", message: "请输入部门名称" }
        ],
        name: [{ required: true, trigger: "blur", message: "请输入部门名称" }],
        remarks: [{ required: true, trigger: "blur", message: "请输入备注" }]
      }
    };
  },
  events: {
    newDialog(level = 1, { id, name }) {
      if (+level === 1) {
        this.title = "一级部门新增";
        this.form.deptName = "";
        return;
      }
      // parentId对应的就是父级的id
      this.form.parentId = id || 0;
      this.form.deptName = name;
      this.title = "二级部门新增";
    },
    editDepartmentManage(row) {
      const { id, parentId = 0, name, remarks, deptName } = row;
      this.form = Object.assign({}, this.form, {
        id,
        parentId,
        name,
        remarks,
        deptName
      });
      this.title = parentId ? "编辑二级部门" : "编辑一级部门";
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$trigger("getDepartmentManage", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeDepartmentManageDialog");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.department-dialog {
  .weight {
    display: flex;
  }
  /deep/ .el-input.weight-item {
    width: 100px;
  }
}
.dialog-footer {
  text-align: center;
}
</style>