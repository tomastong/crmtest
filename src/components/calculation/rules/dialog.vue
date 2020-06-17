/**
 * @file 新建/编辑对话框
 * @author donghongyan
 * @date 2020-06-04
 */

<template>
  <el-dialog
    :title="form.id ? '编辑计算规则' : '计算规则添加'"
    width="400px"
    custom-class="calculation-dialog"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="minWeight" label="重量KG" :label-width="formLabelWidth">
        <div class="weight">
          <el-input
            type="number"
            class="weight-item"
            v-model.number="form.minWeight"
            placeholder="最小值"
            autocomplete="off"
          ></el-input>
          <span style="margin: 0 7px;width: 100px">&le;&nbsp;X&nbsp;&le;</span>
          <el-input
            type="number"
            class="weight-item"
            v-model.number="form.maxWeight"
            placeholder="最大值"
            autocomplete="off"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item prop="insulationDate" label="保温日期(天)" :label-width="formLabelWidth">
        <el-input type="number" v-model="form.insulationDate" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="rule" label="计算规则" :label-width="formLabelWidth">
        <el-input type="textarea" v-model.trim="form.rule" style="width: 250px"></el-input>
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
    const me = this;
    let validateWeight = (rule, value, callback) => {
      if (!me.form.minWeight || !me.form.maxWeight) {
        callback(new Error("重量最小值或最大值不可为空"));
        return;
      }
      if (me.form.minWeight > me.form.maxWeight) {
        callback(new Error("重量最小值不能大于最大值"));
        return;
      }
      callback();
    };
    return {
      showDialog: true,
      formLabelWidth: "100px",
      form: {
        id: "",
        minWeight: "",
        maxWeight: "",
        insulationDate: "",
        rule: ""
      },
      rules: {
        minWeight: [
          {
            required: true,
            trigger: "blur",
            validator: validateWeight
          }
        ],
        insulationDate: [
          { required: true, trigger: "blur", message: "请输入保温天数" }
        ],
        rule: [{ required: true, trigger: "blur", message: "请输入备注" }]
      }
    };
  },
  events: {
    editCalculationRule(row) {
      this.form = Object.assign({}, this.form, row);
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$trigger("getCalculationRules", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeCalculationRulesDialog");
    }
  },
  created() {}
};
</script>

<style lang="less" scoped>
.calculation-dialog {
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