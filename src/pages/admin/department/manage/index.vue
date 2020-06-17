/**
 * @file 部门管理
 * @author donghongyan
 * @date 2020-06-15
 */
<template>
  <div class="department">
    <div class="operators">
      <div class="search">
        <el-input type="text" v-model.trim="key" placeholder="请输入部门名称"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
      <el-button type="danger" class="fa fa-plus-circle fa-lg" size="mini" @click="newAdd">&nbsp;添加</el-button>
    </div>
    <div class="table-list">
      <el-table
        :data="table"
        style="padding: 0 20px;box-sizing: border-box"
        row-key="id"
        :default-expand-all="false"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="name" label="部门名称" width="180"></el-table-column>
        <el-table-column prop="createDate" align="center" label="创建时间" sortable width="180"></el-table-column>
        <el-table-column prop="remarks" align="center" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button v-if="!row.parentId" type="primary" size="mini" @click="add(row)">新增</el-button>
            <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showDepartmentManage"></cdialog>
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
import dialog from "@/components/department/manage/dialog";
export default {
  components: { cdialog: dialog },
  data() {
    return {
      key: "",
      table: [],
      page: 1,
      limit: 10,
      total: 0,
      // 展示弹框
      showDepartmentManage: false
    };
  },
  events: {
    getDepartmentManage({ id, parentId = 0, name, remarks }) {
      if (id) {
        this.editSubmit({ id, parentId, name, remarks });
        return;
      }
      this.addSubmit({ parentId, name, remarks });
    },
    closeDepartmentManageDialog() {
      this.showDepartmentManage = false;
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
        url: "/api-admin/dept/list",
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
            message: err.msg || "获取计算规则列表失败"
          });
        });
    },
    newAdd() {
      this.showDepartmentManage = true;
      this.$nextTick(_ => {
        this.$trigger("newDialog", 1, { id: 0 });
      });
    },
    addSubmit({ parentId, name, remarks }) {
      this.$axios({
        url: "/api-admin/dept/add",
        type: "post",
        data: {
          parentId,
          name,
          remarks
        }
      })
        .then(res => {
          this.showDepartmentManage = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "添加计算规则失败"
          });
        });
    },
    add(row) {
      this.showDepartmentManage = true;
      this.$nextTick(_ => {
        this.$trigger("newDialog", 2, row);
      });
    },
    edit(row) {
      this.showDepartmentManage = true;
      this.$nextTick(_ => {
        this.$trigger("editDepartmentManage", row);
      });
    },
    editSubmit({ id, parentId, name, remarks }) {
      this.$axios({
        url: "/api-admin/dept/update",
        type: "post",
        data: {
          id,
          parentId,
          name,
          remarks
        }
      })
        .then(res => {
          this.showDepartmentManage = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "计算规则更新失败"
          });
        });
    },
    del({ id }) {
      this.$confirm("是否确认删除此条计算规则?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/dept/delete",
            type: "post",
            data: {
              id
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
.department {
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