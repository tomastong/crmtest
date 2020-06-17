/**
 * @file 角色管理
 * @author donghongyan
 * @date 2020-06-16
 */
<template>
  <div class="role-manage">
    <div class="operators">
      <div class="search">
        <el-input type="text" v-model.trim="key" placeholder="请输入角色名称"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
      <el-button type="danger" class="fa fa-plus-circle fa-lg" size="mini" @click="add">&nbsp;添加</el-button>
    </div>
    <div class="table-list">
      <el-table :data="table">
        <el-table-column type="index" label="序号" width="150px" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色名"></el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column prop="name" label="权限">
          <template
            #default="{row}"
          >{{row.menuList.filter(item => item.checked).map(item => item.name).join(',')}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showRoleManage" :authorities="authorities"></cdialog>
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
import dialog from "@/components/role/manage/dialog";
export default {
  components: { cdialog: dialog },
  data() {
    return {
      key: "",
      table: [],
      page: 1,
      limit: 10,
      total: 0,
      // 所有字典分类
      authorities: [],
      showRoleManage: false
    };
  },
  events: {
    getRoleManage({ id, name, authority, remarks }) {
      const roleId = id;
      if (roleId) {
        this.editSubmit({ roleId, name, authority, remarks });
        return;
      }
      this.addSubmit({ name, authority, remarks });
    },
    closeRoleManageDialog() {
      this.showRoleManage = false;
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
        url: "/api-admin/role/list",
        type: "get",
        data: {
          page: this.page,
          limit: this.limit,
          roleName: this.key
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
      this.showRoleManage = true;
    },
    addSubmit({ name, authority, remarks }) {
      this.$axios({
        url: "/api-admin/role/add",
        type: "post",
        data: {
          roleName: name,
          menuIds: authority.join(","),
          remarks
        }
      })
        .then(res => {
          this.showRoleManage = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "添加字典失败"
          });
        });
    },
    edit(row) {
      this.showRoleManage = true;
      this.$nextTick(_ => {
        this.$trigger("editRoleManage", row);
      });
    },
    editSubmit({ roleId, name, authority, remarks }) {
      this.$axios({
        url: "/api-admin/role/update",
        type: "post",
        data: {
          roleId,
          roleName: name,
          menuIds: authority.join(","),
          remarks
        }
      })
        .then(res => {
          this.showRoleManage = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "字典更新失败"
          });
        });
    },
    del({ roleId }) {
      this.$confirm("是否确认删除此条字典字段?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/role/delete",
            type: "post",
            data: {
              roleId
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
    },
    getAuthorities() {
      this.$axios({
        url: "/api-admin/menu/all",
        type: "get"
      })
        .then(res => {
          this.authorities = res.page || [];
        })
        .catch(err => {
          this.$message({
            message: err.msg || "权限加载失败"
          });
        });
    }
  },
  created() {
    this.getAuthorities();
    this.search();
  }
};
</script>

<style lang="less" scoped>
.role-manage {
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