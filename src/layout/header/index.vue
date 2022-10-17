<template>
  <div class="header">
    <div class="header-lf flx-center">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header-ri flx-center">
      <el-icon class="icon-style" @click="refresh"><Refresh /></el-icon>
      <message></message>
      <fullScreen></fullScreen>
      <avatar></avatar>
    </div>
  </div>
</template>
<script setup name="header">
import { inject, ref } from "vue";
import store from "../../store/index.js";
import avatar from "./components/avatar.vue";
import fullScreen from "./components/fullScreen.vue";
import message from "./components/message.vue";
import Breadcrumb from "./components/Breadcrumb.vue";
// 局部数据刷新
const refresh = inject("reload");
</script>

<style scoped lang="scss">
.header {
  border-bottom: 1px solid #f6f6f6;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: 48px;
  line-height: 48px;

  .header-lf {
    .collapse-icon {
      font-size: 22px;
      margin-right: 20px;
      cursor: pointer;
    }
  }
  .icon-style {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
