<template>
  <el-container class="container">
    <el-aside>
      <Menu></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <div>
          <div class="main-tabs flx-row">
            <tabs></tabs>
          </div>
          <div class="main-box">
            <router-view :class="{ shake: disabled }"></router-view>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="layout">
import { useRouter, onBeforeRouteUpdate } from "vue-router";
import { ref, watch } from "vue";
import store from "../store/index.js";
import Header from "./header/index.vue";
import Menu from "./menu/index.vue";
import tabs from "./Tabs/index.vue";

let router = useRouter();
const disabled = ref(false);
// onMounted(() => {
//   disabled.value = true
//   setTimeout(() => {
//     disabled.value = false
//   }, 1500)
// })

watch(
  () => router.currentRoute.value.path,
  (newValue, oldValue) => {
    console.log("watch", newValue);
    console.log("watch", oldValue);
    if (newValue == oldValue) {
    } else {
      disabled.value = true;
      setTimeout(() => {
        disabled.value = false;
      }, 1000);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .el-aside {
    width: auto;
    overflow: inherit;
  }

  .el-header,
  .el-footer {
    height: auto;
    padding: 0;
  }
  .main-tabs {
    // width: 100%;
    margin-bottom: 10px;
    background-color: #fff;
    border: 0;
    box-shadow: none;
    overflow: hidden;
    padding: 10px;
  }

  .el-main {
    background: #f0f2f5;
    padding: 10px 13px;
    box-sizing: border-box;
    // 防止切换出现横向滚动条
    overflow-x: hidden;

    .main-box {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      overflow-x: hidden !important;

      &::-webkit-scrollbar {
        background-color: white;
      }
    }
  }
  // 菜单切换main动画
  .shake {
    animation: shake 0.5s linear;
  }

  @keyframes shake {
    from {
      transform: translateX(-100%);
    }

    to {
      transform: translateX(0);
    }
  }
}
</style>
