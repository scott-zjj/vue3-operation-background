<template>
  <div>
    <el-card shadow="never" class="henader-card">
      <div class="flx-row">
        <el-form :inline="true" :model="queryData" style="flex: 1">
          <el-input
            placeholder="请输入搜索内容"
            v-model="queryData.keyWord"
          ></el-input>
        </el-form>
        <div class="flex-right">
          <el-button type="primary" @click="handleSearch"> 搜索 </el-button>
          <el-button type="primary" @click="dialogVisibleShow">添加</el-button>
        </div>
      </div>
    </el-card>
    <el-card shadow="never">
      <el-table
        :data="tableData"
        :header-cell-style="{ backgroundColor: '#f0f2f5' }"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column property="name" label="账号" width="120" />
        <el-table-column property="role" label="角色" width="120" />
        <el-table-column property="status" label="状态" />
        <el-table-column property="createdTime" label="创建时间" />
        <el-table-column property="date" label="最后登录时间" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="deleteRow(scope.$index)"
              >删除</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="editorClick(scope.row)"
              >修改</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        background
        :page-size="queryData.size"
        layout="prev, pager, next"
        :total="total"
        class="pagination"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <el-dialog
      v-model="dialogVisible"
      :title="`${dialogData.title}用户`"
      draggable
    >
      <el-form
        :model="dialogData.FormData"
        :rules="rules"
        ref="formRef"
        label-width="120px"
        label-position="top"
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="用户名" prop="name">
              <el-input
                v-model="dialogData.FormData.name"
                autocomplete="off"
              /> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色" prop="role">
              <el-input v-model="dialogData.FormData.role" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit()">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { userList } from "@/api/system/index.js";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
/** 准备完毕加载 */
onMounted(() => {});
/**查询条件初始化 */
const queryData = ref({
  keyWord: "",
  page: 1,
  size: 10,
});
/**底部分页器 */
const total = ref(0);
/**弹窗数据初始化 */
const dialogVisible = ref(false);
const dialogData = reactive({
  title: "添加",
  FormData: {
    name: "",
    role: "",
  },
});
/**表格数据 */
// const tableData = ref([]);
const tableData = ref([
  {
    date: "2016-05-01",
    name: "Tom",
    role: "游客",
    createdTime: "2016-05-01",
    status: "已启用",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    role: "游客",
    createdTime: "2016-05-01",
    status: "已启用",
  },
]);
/**弹框form */
const formRef = ref();
/**校验规则 */
const rules = reactive({
  name: [{ required: true, message: "请填写用户姓名", trigger: "change" }],
  role: [{ required: true, message: "请选择角色", trigger: "change" }],
});
/** 获取列表数据 */
const getUserList = () => {
  // userList(queryData.value).then((res) => {
  //   total.value = res.data.data.total;
  //   tableData.value = res.data.data.userList;
  // });
};

/**添加用户 */
const dialogVisibleShow = () => {
  dialogData.FormData = {
    name: "",
    role: "",
    address: "",
    content: "",
  };
  dialogVisible.value = true;
};
/** 添加确认 */
const onSubmit = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) return;
    ElMessage({
      message: "添加用户成功",
      type: "success",
    });
    dialogVisible.value = false;
  });
};

/** 编辑按钮 */
const editorClick = (item) => {
  dialogVisible.value = true;
  dialogData.FormData = item;
  dialogData.title = "编辑";
};
/** 删除 */
const deleteRow = (index) => {
  console.log(index);
  tableData.value.splice(index, 1);
};
/** 分页操作 */
const handleCurrentChange = (val) => {
  // queryData.value.page = val;
};
/**搜索 */
const handleSearch = () => {
  alert("这是搜索按钮");
};
</script>

<style lang="scss" scoped>
.henader-card {
  margin-bottom: 20px;
}
.pagination {
  float: right;
  text-align: right;
  margin: 20px 0;
}
.el-input {
  width: 300px;
}
</style>
