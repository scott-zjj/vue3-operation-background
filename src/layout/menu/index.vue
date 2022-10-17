<template>
  <div
    id="guide"
    class="menu"
    :style="{
      width: store.getters.isCollapse == true ? '' : '200px',
      height: '100%',
    }"
  >
    <div class="logo" v-if="!store.getters.isCollapse">
      <img src="../../assets/logo.png" alt="" style="margin-right: 5px" />
      砼车汇
    </div>
    <div class="logo" v-else>
      <img src="../../assets/logo.png" alt="" />
    </div>
    <el-scrollbar style="height: 100%">
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="store.getters.isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
      >
        <menuItems :menuList="menuList"></menuItems>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import store from "@/store/index.js";
import { useRouter, useRoute } from "vue-router";
import { computed, onMounted, reactive, ref } from "vue";
import { getMenuList } from "@/api/index.js";
import menuItems from "./components/menuItems.vue";

const route = useRoute();

const activeMenu = computed(() => {
  return route.path;
});

const menuList = ref([]);

onMounted(() => {
  getMenuList().then((res) => {
    menuList.value = res.data.data.menuList;
    console.log(menuItems.value);
  });
});
</script>

<style scoped lang="scss">
.menu {
  .logo {
    height: 48px;
    line-height: 48px;
    padding: 0 20px;
    // list-style: none;
    cursor: pointer;
    img {
      width: 25px;
      vertical-align: middle;
    }
  }
}
.el-menu {
  border-right: none;
}
</style>
