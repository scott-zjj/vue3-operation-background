<!-- 表格 -->
<template>
  <div class="scott__table">
    <el-card shadow="never">
      <div class="scott__table__fifter" v-if="$slots.filter">
        <!-- 表格筛选区域 -->
        <el-form
          ref="classFilterForm"
          :model="filterData"
          :inline="true"
          class="scott__table__form"
          :size="size"
        >
          <slot name="filter"></slot>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="reload(1)"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="scott__table__content">
        <!--表格按钮区域-->
        <div
          v-if="$slots.btnLeft || $slots.btnRight"
          class="scott__table__content-btn"
        >
          <div class="scott__table__content-btn-left">
            <slot name="btnLeft"></slot>
          </div>
          <div>
            <slot name="btnRight"></slot>
          </div>
        </div>
        <el-table
          ref="tableInstance"
          class="scott__table__table"
          :header-cell-style="{ backgroundColor: '#f0f2f5' }"
          :data="tableData"
          :size="size"
          style="width: 100%"
        >
          <slot />
          <template #empty>
            <div flex="dir:column align:center justify:center">
              <p>暂无数据</p>
            </div>
          </template>
        </el-table>
        <!-- 表格分页 -->
        <!-- 当只有一页时隐藏分页 hide-on-single-page -->
        <el-pagination
          v-if="paging"
          class="scott__table__pagination"
          background
          flex="justify:center"
          small
          hide-on-single-page
          v-model="pageData.page"
          :page-size="pageData.limit"
          layout="total, prev, pager, next, jumper"
          :total="tableCount"
          @current-change="pageChange"
        />
      </div>
    </el-card>
  </div>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { onMounted, reactive, ref, toRefs } from 'vue';
import { isObj } from '@/utils';

const props = defineProps({
  // 请求表格数据接口
  api: {
    required: true,
    type: Function,
  },
  // 后端接口返回数据对象中，列表数据和总条数对应的数据路径
  listPath: {
    type: String,
    default: 'data.result',
  },
  totalPath: {
    type: String,
    default: 'data.total',
  },
  // 是否分页
  paging: {
    type: Boolean,
    default: true,
  },
  // 分页参数
  pageData: {
    type: Object,
    default: function () {
      return {
        limit: 10,
        page: 1,
      };
    },
  },
  // 筛选参数
  filterData: {
    type: Object,
    default: function () {
      return {};
    },
  },
  // 表格尺寸
  size: {
    type: String,
    default: 'default',
  },
});
const emit = defineEmits(['load-finish']);

let state = reactive({
  tableCount: 0, // 总条数
  tableData: [], // 表格数据
});
onMounted(() => {
  getData();
});
const getData = () => {
  state.tableData = [];
  const params = getParams(props.paging);
  props
    .api(params)
    .then((res) => {
      console.log(res);
      state.tableData = getValueByPath(res, props.listPath);
      // 如果有分页
      if (props.paging) {
        state.tableCount = getValueByPath(res, props.totalPath);
      }
      emit('load-finish', res);
    })
    .catch((err) => {
      console.error(err);
    });
};
/**
 * @description 根据对象的数据路径获取值,
 * @param {Object} obj
 * @param {String} path
 */
const getValueByPath = (obj, path) => {
  let value = { ...obj };
  path.split('.').forEach((item) => {
    if (isObj(value) && value[item] !== undefined) {
      value = value[item];
    } else {
      throw new Error(`在数据路径${path}中，${item}不存在`);
    }
  });
  return value;
};
const getParams = (e) => {
  let data = { ...props.filterData };
  if (e) {
    Object.assign(data, props.pageData);
  }
  return data;
};

/**
 * @description 属性表格数据，如果需要则可以获取ref实例调用这个方法
 * @param {number} e 前往第几页，不传当前页刷新
 */
const reload = (e) => {
  if (e && !/(^[1-9]\d*$)/.test(e)) {
    e = 1;
  }
  e && (props.pageData.page = e);
  getData();
};

// 表格翻页
const pageChange = (page) => {
  props.pageData.page = page;
  getData();
};
let { tableCount, tableData } = toRefs(state);
// 获取ElTable实例，暴露到外部
let tableInstance = ref(null);
// 暴露出去事件、数据
defineExpose({
  tableData,
  elTable: tableInstance,
  reload,
});
</script>
<style lang="scss">
.scott__table {
  &__form {
    ::v-deep(.el-select) {
      width: 140px;
    }
    ::v-deep(.el-form-item) {
      margin-right: 25px;
    }
  }
  // &__fifter {
  // }

  &__content {
    &-btn {
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
    }
  }
  &__pagination {
    margin-top: 30px;
  }
  // &__table.el-table {
  // }
  &.el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #f0f2f5;
  }
  .el-table__body tr.hover-row > td {
    background-color: #f0f2f5;
  }
}
</style>
