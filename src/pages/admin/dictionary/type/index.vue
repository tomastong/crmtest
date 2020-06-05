/**
 * @file 字典分类主文件
 * @author donghongyan
 * @date 2020-06-04
 */
<template>
  <div class="dictionary-type">
    <div class="operators">
      <div class="search">
        <el-input type="text" v-model.trim="key" placeholder="请输入字典分类名"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
      <el-button type="danger" class="fa fa-plus-circle fa-lg" size="mini" @click="add">&nbsp;添加</el-button>
    </div>
    <div class="table-list">
      <el-table :data="table">
        <el-table-column type="index" label="序号" width="150px" align="center"></el-table-column>
        <el-table-column prop="name" label="分类名"></el-table-column>
        <el-table-column label="是否启用">
          <template #default="{row}">{{+row.delFlag ? '启用':'禁用'}}</template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showDictionaryType"></cdialog>
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
import dialog from "@/components/dictionary/type/dialog";
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
      showDictionaryType: false
    };
  },
  events: {
    getDictionaryType({ id, name, delFlag, remarks }) {
      if (id) {
        this.editSubmit({ id, name, delFlag, remarks });
        return;
      }
      this.addSubmit({ name, delFlag, remarks });
    },
    closeDictionaryTypeDialog() {
      this.showDictionaryType = false;
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
        url: "/api-admin/dictType/list",
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
            message: err.msg || "获取字典分类列表失败"
          });
        });
    },
    add() {
      this.showDictionaryType = true;
    },
    addSubmit({ name, delFlag, remarks }) {
      this.$axios({
        url: "/api-admin/dictType/add",
        type: "post",
        data: {
          name,
          delFlag,
          remarks
        }
      })
        .then(res => {
          this.showDictionaryType = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "添加字典分类失败"
          });
        });
    },
    edit(row) {
      this.showDictionaryType = true;
      this.$nextTick(_ => {
        this.$trigger("editDictionaryType", row);
      });
    },
    editSubmit({ id, name, delFlag, remarks }) {
      this.$axios({
        url: "/api-admin/dictType/update",
        type: "post",
        data: {
          id,
          name,
          delFlag,
          remarks
        }
      })
        .then(res => {
          this.showDictionaryType = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "字典分类更新失败"
          });
        });
    },
    del({ id }) {
      this.$confirm("是否确认删除此条字典分类?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/dictType/delete",
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
.dictionary-type {
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