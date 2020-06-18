/**
 * @file 新建/编辑对话框
 * @author donghongyan
 * @date 2020-06-16
 */

<template>
  <el-dialog
    :title="form.id ? '编辑用户' : '用户添加'"
    width="600px"
    custom-class="usermanage"
    :visible.sync="showDialog"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :show-close="false"
    :center="true"
    :destroy-on-close="true"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="name" label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名（作为登录名）"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="deptId" label="所属部门" :label-width="formLabelWidth">
        <el-cascader
          v-model="form.deptId"
          :options="deptlist"
          :props="{ label: 'name', value: 'id' }"
          placeholder="请选择所属部门"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="roleId" label="所属角色" :label-width="formLabelWidth">
        <el-select v-model="form.roleId" placeholder="请选择所属角色">
          <el-option
            v-for="(role, i) in roles"
            :key="'r' + i"
            :value="role.roleId"
            :label="role.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
        <el-select v-model="form.sex" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="birthday" label="出生日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.birthday"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请输入出生日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="provinceId" label="所属区域" :label-width="formLabelWidth">
        <div class="area">
          <el-select v-model="form.provinceId" placeholder="选择省份">
            <el-option v-for="pro in areas" :key="pro.deptId" :value="pro.deptId" :label="pro.name"></el-option>
          </el-select>
          <el-select v-model="form.cityId" placeholder="选择城市">
            <el-option
              v-for="city in cities"
              :key="city.deptId"
              :value="city.deptId"
              :label="city.name"
            ></el-option>
          </el-select>
        </div>
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
    const validateArea = (rule, value, callback) => {
      if (!this.form.cityId) {
        callback("请选择所在区域");
        return;
      }
      callback();
    };
    const validateEmail = (rule, value, callback) => {
      const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (value.trim() === "") {
        callback("邮箱不能为空，请重新输入");
        return;
      }
      if (!reg.test(value)) {
        callback("邮箱输入不合法，请重新输入");
        return;
      }
      callback();
    };
    return {
      showDialog: true,
      formLabelWidth: "80px",
      // 预加载数据
      deptlist: [],
      roles: [],
      areas: [],
      // 表单数据
      form: {
        id: "",
        name: "",
        username: "",
        password: "",
        deptId: "",
        roleId: "",
        sex: "",
        email: "",
        birthday: "",
        provinceId: "",
        cityId: ""
      },
      rules: {
        name: [{ required: true, trigger: "blur", message: "请输入姓名" }],
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        deptId: [
          { required: true, trigger: "blur", message: "请选择所在部门" }
        ],
        roleId: [
          { required: true, trigger: "blur", message: "请选择所属角色" }
        ],
        sex: [{ required: true, trigger: "blur", message: "请输入性别" }],
        email: [{ required: true, trigger: "blur", validator: validateEmail }],
        birthday: [
          { required: true, trigger: "blur", message: "请输入出生日期" }
        ],
        provinceId: [
          { required: true, trigger: "blur", validator: validateArea }
        ]
      }
    };
  },
  computed: {
    cities() {
      if (!this.form.provinceId) {
        return [];
      }
      return (
        this.areas.find(item => +item.deptId === +this.form.provinceId)
          .children || []
      );
    }
  },
  watch: {
    "form.provinceId": function(value) {
      this.form.cityId = "";
    }
  },
  events: {
    async editUserManage({
      userId,
      name,
      username,
      password,
      deptId,
      deptIdList,
      roleId,
      sex,
      mailbox,
      birthDate,
      provinceId,
      cityId
    }) {
      this.form = Object.assign({}, this.form, {
        id: userId,
        name,
        username,
        password,
        deptId: deptIdList.split(",").map(item => +item),
        roleId: +roleId,
        sex,
        email: mailbox,
        birthday: birthDate,
        provinceId
      });
      await this.$nextTick();
      this.form.cityId = cityId;
    }
  },
  methods: {
    getDept() {
      this.$axios({
        url: "/api-admin/dept/all",
        type: "get"
      })
        .then(res => {
          this.deptlist = res.page || [];
        })
        .catch(err => {
          this.$message({
            message: err.msg || "获取部门列表失败"
          });
        });
    },
    getRoles() {
      this.$axios({
        url: "/api-admin/role/all",
        type: "get"
      })
        .then(res => {
          this.roles = res.page || [];
        })
        .catch(err => {
          this.$message({
            message: err.msg || "获取部门列表失败"
          });
        });
    },
    getProvinceCity() {
      this.$axios({
        url: "/api-admin/dict/provinceCity",
        type: "get"
      })
        .then(res => {
          this.areas = res.page || [];
        })
        .catch(err => {
          this.$message({
            message: err.msg || "获取部门列表失败"
          });
        });
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$trigger("getUserManage", this.form);
          return;
        }
        return false;
      });
    },
    close() {
      this.$trigger("closeUserManageDialog");
    }
  },
  created() {
    this.getRoles();
    this.getDept();
    this.getProvinceCity();
  }
};
</script>

<style lang="less" scoped>
.usermanage {
  .area {
    display: flex;
    /deep/ .el-select {
      & + .el-select {
        margin: 0 0 0 30px;
      }
      .el-input {
        width: 90%;
      }
    }
  }
  .el-form /deep/ .el-input {
    width: 400px;
  }
}
.dialog-footer {
  text-align: center;
}
</style>