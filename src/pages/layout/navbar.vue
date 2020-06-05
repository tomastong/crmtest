<template>
  <div class="navbar">
    <div class="company">
      <div class="company-logo"></div>
      <div class="company-name">智慧生产流程管控系统</div>
    </div>
    <div class="user">
      <div class="user-icon"></div>
      <div class="user-name">
        <el-dropdown trigger="hover" @command="dealUser">
          <span class="el-dropdown-link">
            {{user.username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.login.user
    })
  },
  methods: {
    dealUser(command) {
      if (command === "logout") {
        this.resetUser();
        this.$router.push({
          path: "/login"
        });
      }
    },
    resetUser() {
      this.$store.dispatch("login/setUser", {});
      this.$store.dispatch("login/setToken", "");
      this.$store.dispatch("login/setRouter", "");
      this.$store.dispatch("system/setPath", "");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/fonts/font.css";

.navbar {
  display: flex;
  flex-direction: row;
  height: 80px;
  background-color: #fff;

  justify-content: space-between;
}

.company {
  display: flex;

  align-items: center;

  &-logo {
    width: 60px;
    height: 60px;
    margin: 10px 20px;
    background: url(../../assets/images/logo.png) no-repeat;
    background-size: 100% 100%;
  }

  &-name {
    margin: 0 0 0 10px;
    font-family: "ALIHYAIHEI";
    font-size: 28px;
    color: #000;
  }
}

.user {
  display: flex;
  padding: 10px 20px;

  align-items: center;

  &-icon {
    width: 40px;
    height: 40px;
    margin: 10px 20px 10px 10px;
    background: url(../../assets/images/avatar.png) no-repeat;
    background-size: 100% 100%;
  }

  &-name {
    cursor: pointer;
  }

  /deep/ .el-dropdown-selfdefine {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>