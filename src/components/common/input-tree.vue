/**
 * @file 搜索岗位选择
 * @author donghongyan
 * @date 2020-06-17
 */

<template>
  <div class="form-div-wrap">
    <label class="form-label-title" :class="{red: isRequired}">{{label}}</label>
    <div class="form-div content">
      <input
        type="text"
        :disabled="isScale"
        readonly
        v-if="isScale"
        class="global-input-normal"
        v-model="posName"
      />
      <el-popover v-else popover-class="form-popover-wrap" placement="bottom-start" trigger="click">
        <el-tree
          ref="queryTree"
          :data="treeData"
          :props="treeNode"
          :check-strictly="!multiSelect"
          @check="handleTreeSelected"
          :filter-node-method="filterNode"
          node-key="key"
          show-checkbox
        ></el-tree>
        <input
          type="text"
          placeholder="请选择岗位"
          :disabled="isDisabled"
          class="global-input-normal ellipsis"
          slot="reference"
          v-model="posName"
        />
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "posTree"
  // 知道结构  后面的逻辑就自己写吧
};
</script>

<style lang="less" scoped>
</style>