/**
 * @file 新建/编辑对话框
 * @author donghongyan
 * @date 2020-06-04
 */

<template>
  <el-dialog
    :title="form.id ? '编辑字典分类' : '字典分类添加'"
    width="400px"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="name" label="分类名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="delFlag" label="是否启用" :label-width="formLabelWidth">
        <el-select v-model="form.delFlag" placeholder="请选择是否启用">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
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
      formLabelWidth: "80px",
      form: {
        id: "",
        name: "",
        delFlag: "",
        remarks: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入分类名字" }],
        delFlag: [
          { required: true, trigger: "blur", message: "请选择是否启用" }
        ],
        remarks: [{ required: true, trigger: "blur", message: "请输入备注" }]
      }
    };
  },
  events: {
    editDictionaryType(row) {
      this.form = Object.assign({}, this.form, row);
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$trigger("getDictionaryType", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeDictionaryTypeDialog");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: center;
}
</style>