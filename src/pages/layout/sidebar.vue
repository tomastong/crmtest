/**
 * @file 左侧菜单
 * @author donghongyan
 * @date 2020-06-02
 */
<template>
  <div class="sidebar">
    <el-menu
      style="width:100%;"
      :default-active="defaultActiveIndex"
      router
      :collapse="collapsed"
      @select="handleSelect"
    >
      <el-menu-item index="/home">
        <i class="iconfont icon-"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- v-if="item.menuShow && !item.leaf" -->
      <template v-for="(item, index) in menus">
        <!--目录-->
        <el-submenu v-if="!item.leaf" :index="index + ''" :key="index+'0'">
          <template slot="title">
            <i :class="item.iconCls"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <!--菜单-->
          <el-menu-item
            v-for="(term, index) in item.children"
            :key="index"
            :index="term.path"
            :class="$route.path === term.path ? 'is-active' : ''"
          >
            <i :class="term.iconCls"></i>
            <span slot="title">{{ term.name }}</span>
          </el-menu-item>
        </el-submenu>
        <!--子菜单，应该用不到-->
        <el-menu-item
          :key="index+'1'"
          v-else-if="item.leaf && item.children && item.children.length"
          :index="item.children[0].path"
          :class="$route.path === item.children[0].path ? 'is-active' : ''"
        >
          <i :class="item.iconCls"></i>
          <span slot="title">{{item.children[0].name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapState } from "vuex";
import merge from "deepmerge";
export default {
  data() {
    return {
      defaultActiveIndex: "",
      collapsed: false,
      menus: []
    };
  },
  computed: {
    ...mapState({
      router: state => state.login.router
    })
  },
  methods: {
    collapse() {
      this.collapsed = !this.collapsed;
    },
    handleSelect(index) {
      this.defaultActiveIndex = index;
    }
  },
  mounted() {
    this.menus = JSON.parse(JSON.stringify(this.router));
    this.menus.forEach(item => {
      item.children = item.children.filter(
        itemChildren => itemChildren.menuShow
      );
    });
    this.menus = this.menus.filter(item => item.menuShow && !item.leaf);
    this.defaultActiveIndex = this.$route.path;
  }
};
</script>

<style lang="less" scoped>
.sidebar {
  width: 250px;
  /deep/ .el-menu {
    border-right: 0;
  }
  /deep/ .el-submenu__title,
  /deep/ .el-menu-item-group__title,
  /deep/ .el-menu-item {
    font-size: 16px;
    span {
      margin: 0 0 0 10px;
    }
  }
  /deep/ .el-menu-item:focus,
  /deep/ .el-menu-item:hover {
    background-color: #f00;
    color: #fff;
  }
}
</style>