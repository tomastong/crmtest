/*
* @file 登录文件
* @author donghongyan
* @date 2020-06-01
*/

<template>
  <div class="login">
    <div class="login-box">
      <el-form ref="user" :model="user" :rules="rules" label-width="80px">
        <div class="title form-item">账号登录</div>
        <div class="user form-item">
          <div class="user-icon"></div>
          <div class="user-input">
            <input type="text" v-model.trim="user.username" placeholder="请输入账号" />
          </div>
        </div>
        <div class="password form-item">
          <div class="password-icon"></div>
          <div class="password-input">
            <input type="password" v-model="user.password" placeholder="请输入密码" @keyup.enter="login" />
          </div>
        </div>
        <div class="login-btn form-item" @click="login">登录</div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.check();
      const { username, password } = this.user;
      this.$axios({
        type: "post",
        url: "/api-admin/login",
        data: {
          username: username,
          pwd: password
        }
      })
        .then(res => {
          const { user, token, router } = res;
          this.$store.dispatch("login/setUser", user);
          this.$store.dispatch("login/setToken", token);
          this.$store.dispatch("login/setRouter", router);
          this.$router.push({
            path: "/home"
          });
        })
        .catch(err => {
          this.$message.error(err.msg || "登录失败，请稍候再试");
        });
    },
    check() {
      const { username, password } = this.user;
      if (!username || !password) {
        this.$message({
          type: "warning",
          message: "账号或密码不能为空！"
        });
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: relative;
  zoom: 1;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  min-height: 600px;
  background-color: #fff;
  background-image: url(../../assets/images/login-bg.png);
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;

  &-box {
    position: absolute;
    right: 0;
    display: flex;
    box-sizing: border-box;
    width: 300px;
    height: 100%;
    margin: 0 50px 0 0;

    align-items: center;

    /deep/ form {
      box-sizing: border-box;
      width: 320px;
      padding: 40px 15px;
      border-radius: 5px;
      box-shadow: 0 0 5px #f00;

      .form-item {
        margin: 0 15px 40px;
      }
    }
  }

  .user,
  .password {
    display: flex;
    height: 40px;
    border-radius: 100px;
    box-shadow: 0 0 5px #f00;

    align-items: center;

    &-icon {
      width: 24px;
      height: 24px;
      margin: 0 10px 0 10px;
      border-radius: 50%;
    }

    &-input input {
      width: 100%;
      height: 30px;
      border: 0;
      outline: 0;
    }
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  .user-icon {
    background: url(../../assets/images/user.png) no-repeat;
    background-size: 100% 100%;
  }

  .password-icon {
    background: url(../../assets/images/pwd.png) no-repeat;
    background-size: 100% 100%;
  }

  .login-btn {
    width: 200px;
    height: 40px;
    margin: 0 auto !important;
    font-weight: 700;
    line-height: 40px;
    text-align: center;
    color: #fff;
    border-radius: 100px;
    background-color: #cc2c2e;
    cursor: pointer;
  }
}
</style>