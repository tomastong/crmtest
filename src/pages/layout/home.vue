/**
* @file 主页布局文件
* @author donghongyan
* @date 2020-06-02
*/
<template>
  <div class="main">
    <navbar></navbar>
    <div class="container">
      <sidebar></sidebar>
      <div class="content">
        <div class="content-path">{{path}}</div>
        <div class="content-detail">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/pages/layout/navbar";
import sidebar from "@/pages/layout/sidebar";
import bus from "@/utils/bus";
import { mapState } from "vuex";
export default {
  watch: {
    $route(to, from) {
      let path = this.$route.meta.join("-");
      this.$store.dispatch("system/setPath", path);
    }
  },
  computed: {
    ...mapState({
      path: state => state.system.path,
      user: state => state.login.user
    })
  },
  components: {
    navbar,
    sidebar
  },
  methods: {
    resetUser() {
      this.$store.dispatch("login/setUser", {});
      this.$store.dispatch("login/setToken", "");
      this.$store.dispatch("login/setRouter", "");
      this.$store.dispatch("system/setPath", "");
    },
    judgeLogin() {
      if (!Object.keys(this.user).length) {
        this.$router.push({ path: "/login" });
        return;
      }
      this.$axios({
        url: "/api-admin/user/checkLogin",
        type: "get"
      })
        .then(res => {
          this.$router.push({ path: "/home" });
        })
        .catch(err => {});
    }
  },
  created() {
    this.judgeLogin();
  },
  mounted() {
    bus.$on("goto", path => {
      this.resetUser();
      this.$router.push({
        path
      });
    });
  }
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: row;
}

.content {
  width: calc(~"100% - 250px");
  border-top: 1px solid #ddd;

  &-path {
    height: 50px;
    margin: 0 0 0 20px;
    line-height: 50px;
    color: #000;
  }

  &-detail {
    box-sizing: border-box;
    min-height: 600px;
    background-color: #eff1f3;
  }
}
</style>