/**
 * @file 字典主文件
 * @author donghongyan
 * @date 2020-06-04
 */
<template>
  <div class="dictionary">
    <div class="operators">
      <div class="search">
        <el-input type="text" v-model.trim="key" placeholder="请输入字典名"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
      <el-button type="danger" class="fa fa-plus-circle fa-lg" size="mini" @click="add">&nbsp;添加</el-button>
    </div>
    <div class="table-list">
      <el-table :data="table">
        <el-table-column type="index" label="序号" width="150px" align="center"></el-table-column>
        <el-table-column label="所属分类">
          <template #default="{row}">{{getDictTypeName(row.parentId)}}</template>
        </el-table-column>
        <el-table-column prop="name" label="字典名称"></el-table-column>
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
    <cdialog v-if="showDictionary" :types="types"></cdialog>
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
import dialog from "@/components/dictionary/manage/dialog";
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
      types: [],
      showDictionary: false
    };
  },
  events: {
    getDictionary({ id, parentId, name, delFlag, remarks }) {
      if (id) {
        this.editSubmit({ id, parentId, name, delFlag, remarks });
        return;
      }
      this.addSubmit({ parentId, name, delFlag, remarks });
    },
    closeDictionaryDialog() {
      this.showDictionary = false;
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
        url: "/api-admin/dict/list",
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
      this.showDictionary = true;
    },
    addSubmit({ parentId, name, delFlag, remarks }) {
      this.$axios({
        url: "/api-admin/dict/add",
        type: "post",
        data: {
          parentId,
          name,
          delFlag,
          remarks
        }
      })
        .then(res => {
          this.showDictionary = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "添加字典失败"
          });
        });
    },
    edit(row) {
      this.showDictionary = true;
      this.$nextTick(_ => {
        this.$trigger("editDictionary", row);
      });
    },
    editSubmit({ id, parentId, name, delFlag, remarks }) {
      this.$axios({
        url: "/api-admin/dict/update",
        type: "post",
        data: {
          id,
          parentId,
          name,
          delFlag,
          remarks
        }
      })
        .then(res => {
          this.showDictionary = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "字典更新失败"
          });
        });
    },
    del({ id }) {
      this.$confirm("是否确认删除此条字典字段?", "安全提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api-admin/dict/delete",
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
    },
    getAllDictType() {
      this.$axios({
        url: "/api-admin/dictType/all",
        type: "get"
      }).then(res => {
        this.types = res.page || [];
      });
    },
    getDictTypeName(id) {
      return this.types.find(item => +item.id === +id).name || "";
    }
  },
  created() {
    this.getAllDictType();
    this.search();
  }
};
</script>

<style lang="less" scoped>
.dictionary {
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