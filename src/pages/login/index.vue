/*
 * @file 登录文件
 * @author donghongyan
 * @date 2020-06-01
 */

<template>
    <div class="login flex">
        <div class="login-box">
            <el-form ref="form" :model="user" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model.trim="user.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model.trim="user.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        login() {
            const {username, password} = this.user;
            this.$axios({
                type: 'post',
                url: '/dhy/test',
                data: {
                    username: username,
                    pwd: password
                }
            }).then(res => {
                this.$router.push({path: '/index'});
            }).catch(err => {
                console.log('登录失败', err);
            });
        }
    }
};
</script>

<style lang="less" scoped>
.login {
    position: relative;
    width: 100%;
    height: 100%;
    &-box {
        align-self: center;
        width: 400px;
        height: 300px;
    }
    .el-button {
        width: 100%;
    }
}
</style>