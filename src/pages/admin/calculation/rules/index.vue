/**
 * @file 计算规则
 * @author donghongyan
 * @date 2020-06-15
 */
<template>
  <div class="calculation">
    <div class="operators">
      <div class="search">
        <el-input type="text" v-model.trim="key" placeholder="请输入计算规则名称"></el-input>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
      </div>
      <el-button type="danger" class="fa fa-plus-circle fa-lg" size="mini" @click="add">&nbsp;添加</el-button>
    </div>
    <div class="table-list">
      <el-table :data="table">
        <el-table-column type="index" label="序号" width="150px" align="center"></el-table-column>
        <el-table-column label="重量KG" align="center">
          <template #default="{row}">{{row.minWeight + '&le;X&le;' + row.maxWeight}}</template>
        </el-table-column>
        <el-table-column prop="insulationDate" label="保温日期（天）"></el-table-column>
        <el-table-column prop="rule" label="计算规则"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="{row}">
            <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <cdialog v-if="showCalculationRules"></cdialog>
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
import dialog from "@/components/calculation/rules/dialog";
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
      showCalculationRules: false
    };
  },
  events: {
    getCalculationRules({ id, minWeight, maxWeight, insulationDate, rule }) {
      if (id) {
        this.editSubmit({ id, minWeight, maxWeight, insulationDate, rule });
        return;
      }
      this.addSubmit({ minWeight, maxWeight, insulationDate, rule });
    },
    closeCalculationRulesDialog() {
      this.showCalculationRules = false;
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
        url: "/api-admin/calculationRule/list",
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
    add() {
      this.showCalculationRules = true;
    },
    addSubmit({ minWeight, maxWeight, insulationDate, rule }) {
      this.$axios({
        url: "/api-admin/calculationRule/add",
        type: "post",
        data: {
          minWeight,
          maxWeight,
          insulationDate,
          rule
        }
      })
        .then(res => {
          this.showCalculationRules = false;
          this.search();
        })
        .catch(err => {
          this.$message({
            message: err.msg || "添加计算规则失败"
          });
        });
    },
    edit(row) {
      this.showCalculationRules = true;
      this.$nextTick(_ => {
        this.$trigger("editCalculationRule", row);
      });
    },
    editSubmit({ id, minWeight, maxWeight, insulationDate, rule }) {
      this.$axios({
        url: "/api-admin/calculationRule/update",
        type: "post",
        data: {
          id,
          minWeight,
          maxWeight,
          insulationDate,
          rule
        }
      })
        .then(res => {
          this.showCalculationRules = false;
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
            url: "/api-admin/calculationRule/delete",
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
.calculation {
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