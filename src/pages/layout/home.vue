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
            <div class="content-path">系统管理/系统菜单</div>
            <div class="content-detail">
                <router-view></router-view>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import navbar from '@/pages/layout/navbar';
import sidebar from '@/pages/layout/sidebar';
import bus from '@/utils/bus';
export default {
    components: {
        navbar,
        sidebar
    },
    methods: {
        resetUser() {
            this.$store.dispatch('login/setUser', {});
            this.$store.dispatch('login/setToken', '');
            this.$store.dispatch('login/setRouter', '');
        }
    },
    created() {
        bus.$on('goto', path => {
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
    width: 100%;
    border-top: 1px solid #ddd;
    &-path {
        height: 50px;
        margin: 0 0 0 20px;
        line-height: 50px;
        color: #000;
    }
    &-detail {
        box-sizing: border-box;
        width: 100%;
        min-height: 600px;
        background-color: #eff1f3;
    }
}
</style>