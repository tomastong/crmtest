/**
 * @file 新建/编辑对话框
 * @author donghongyan
 * @date 2020-06-16
 */

<template>
  <el-dialog
    :title="form.id ? '编辑角色' : '角色添加'"
    width="400px"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="name" label="角色名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入角色名"></el-input>
      </el-form-item>
      <el-form-item prop="remarks" label="备注" :label-width="formLabelWidth">
        <el-input type="textarea" v-model.trim="form.remarks" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item prop="authority" label="权限" :label-width="formLabelWidth">
        <el-checkbox-group v-model="form.authority">
          <el-checkbox v-for="(item, i) in authorities" :key="i" :label="item.menuId">{{item.name}}</el-checkbox>
        </el-checkbox-group>
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
  props: ["authorities"],
  data() {
    return {
      showDialog: true,
      formLabelWidth: "80px",
      form: {
        id: "",
        authority: [],
        name: "",
        remarks: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入分类名字" }],
        authority: [
          { required: true, trigger: "blur", message: "请选择分配权限" }
        ],
        remarks: [{ required: true, trigger: "blur", message: "请输入备注" }]
      }
    };
  },
  events: {
    editRoleManage({ roleId, roleName, remarks, menuList }) {
      this.form = Object.assign(
        {},
        {
          id: roleId,
          name: roleName,
          remarks,
          authority: menuList
            .filter(item => item.checked)
            .map(item => item.menuId)
        }
      );
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$trigger("getRoleManage", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeRoleManageDialog");
    }
  }
};
</script>

<style lang="less">
.dialog-footer {
  text-align: center;
}
</style>