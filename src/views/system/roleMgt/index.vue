<template>
  <div class="container">
    <Table
      :api="getData"
      row-key="filePath"
      ref="scottTable"
      @load-finish="loadFinish"
    >
      <!-- 筛选区域 -->
      <template #filter>
        <el-form-item label="角色名">
          <el-input placeholder="请输入角色名"> </el-input>
        </el-form-item>
      </template>
      <!-- 功能按钮区域 -->
      <template #btnRight>
        <el-button type="primary">添加角色</el-button>
      </template>
      <!-- 列表 -->
      <el-table-column fixed label="序号" prop="index" align="center" />
      <el-table-column
        label="角色名称"
        prop="name"
        align="center"
        width="200"
      />
      <el-table-column label="权限" prop="sex" align="center" width="500" />
      <el-table-column label="创建时间" prop="age" align="center" width="500" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </Table>
  </div>
</template>

<script setup>
import Table from '@/components/Table.vue';
import { onMounted, reactive, ref, nextTick } from 'vue';
// 模拟后端接口
const getData = () => {
  return new Promise((resove, reject) => {
    setTimeout(() => {
      resove({
        data: {
          result: [{ name: '小', sex: '12', age: '100' }, {}, {}],
          total: 30,
        },
      });
    }, 2000);
  });
};
// 获取ref
const scottTable = ref(null);
nextTick(() => {
  // 刷新数据
  // scottTable.value.reload()
  // el-table实例
  console.log(scottTable.value.elTable);
});
// 加载完成回调
const loadFinish = (res) => {
  console.log(res);
};
</script>

<style lang="scss" scoped></style>
