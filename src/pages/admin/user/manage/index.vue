/**
 * @file 角色管理
 * @author donghongyan
 * @date 2020-06-16
 */
<template>
  <div class="user-manage">
    <div class="operators">
      <div class="search">
        <el-input type="text" v-model.trim="key" placeholder="请输入角色名称"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
      <el-button type="danger" class="fa fa-plus-circle fa-lg" size="mini" @click="add">&nbsp;添加</el-button>
    </div>
    <div class="table-list">
      <el-table :data="table">
        <el-table-column
          v-for="(column, i) in columnConfig"
          :key="i"
          :label="column.label"
          :prop="column.prop"
          :min-width="column.minWidth"
          :align="column.align"
        ></el-table-column>
        <el-table-column label="所属区域">
          <template #default="{row}">{{row.province || '' + '-' + row.city || ''}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="150px">
          <template #default="{row}">
            <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showUserManage"></cdialog>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import dialog from "@/components/user/manage/dialog";
import { columnConfig } from "./index.js";
export default {
  components: { cdialog: dialog },
  data() {
    return {
      key: "",
      table: [],
      page: 1,
      limit: 10,
      total: 0,
      columnConfig: columnConfig,
      showUserManage: false
    };
  },
  events: {
    getUserManage({
      id,
      name,
      username,
      password,
      deptId,
      roleId,
      sex,
      email,
      birthday,
      provinceId,
      cityId
    }) {
      if (id) {
        this.editSubmit({
          id,
          name,
          username,
          password,
          deptId,
          roleId,
          sex,
          email,
          birthday,
          provinceId,
          cityId
        });
        return;
      }
      this.addSubmit({
        name,
        username,
        password,
        deptId,
        roleId,
        sex,
        email,
        birthday,
        provinceId,
        cityId
      });
    },
    closeUserManageDialog() {
      this.showUserManage = false;
    }
  },
  methods: {
    handleSizeChange(pageSize) {
      this.limit = pageSize;
      this.search();
    },
    handleCurrentChange(current) {
      this.page = current;
      this.search();
    },
    search() {
      this.$axios({
        url: "/api-admin/user/list",
        type: "get",
        data: {
          page: this.page,
          limit: this.limit,
          name: this.key
        }
      })
        .then(res => {
          const page = (res || {}).page || {};
          this.table = page.rows || [];
          this.total = +page.total;
        })
        .catch(err => {
          this.$message({
            message: err.msg || "获取字典列表失败"
          });
        });
    },
    add() {
      this.showUserManage = true;
    },
    addSubmit({
      name,
      username,
      password,
      deptId,
      roleId,
      sex,
      email,
      birthday,
      provinceId,
      cityId
    }) {
      this.$axios({
        url: "/api-admin/user/add",
        type: "post",
        data: {
          name,
          username,
          password,
          deptId: deptId.slice(-1)[0],
          roleId,
          sex,
          mailbox: email,
          birthDate: birthday,
          provinceId,
          cityId
        }
      })
        .then(res => {
          this.showUserManage = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "添加字典失败"
          });
        });
    },
    edit(row) {
      this.showUserManage = true;
      this.$nextTick(_ => {
        this.$trigger("editUserManage", row);
      });
    },
    editSubmit({
      id,
      name,
      username,
      password,
      deptId,
      roleId,
      sex,
      email,
      birthday,
      provinceId,
      cityId
    }) {
      this.$axios({
        url: "/api-admin/user/update",
        type: "post",
        data: {
          userId: id,
          name,
          username,
          password,
          deptId: deptId.slice(-1)[0],
          roleId,
          sex,
          mailbox: email,
          birthDate: birthday,
          provinceId,
          cityId
        }
      })
        .then(res => {
          this.showUserManage = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "字典更新失败"
          });
        });
    },
    del({ userId }) {
      this.$confirm("是否确认删除此条字典字段?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/user/delete",
            type: "post",
            data: {
              userId
            }
          })
            .then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.search();
            })
            .catch(err => {
              this.$message({
                message: err.msg || "删除失败"
              });
            });
        })
        .catch(() => {});
    }
  },
  created() {
    this.search();
  }
};
</script>

<style lang="less" scoped>
.user-manage {
  padding: 20px;
  .operators,
  .operators .search {
    display: flex;
  }
  .table-list {
    margin: 20px 0 0 0;
  }
  .operators /deep/ .el-input {
    width: 250px;
  }
  .pagination {
    padding: 50px;
    text-align: center;
    background-color: #fff;
  }
  /deep/ .el-button {
    margin: 0 0 0 20px;
  }
}
</style>