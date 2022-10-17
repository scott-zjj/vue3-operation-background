<template>
  <el-dropdown>
    <span>
      <div class="avatar">
        <img src="../../../assets/role/logistics.png" alt="avatar" />
      </div>
      SCOTT
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleClick">个人中心</el-dropdown-item>
        <el-dropdown-item @click="gotoLogin">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup>
import store from "@/store/index.js";
import { useRouter } from "vue-router";
const router = useRouter();
const handleClick = () => {
  alert("button click");
};

const gotoLogin = () => {
  sessionStorage.removeItem("token");
  router.push("/login");
};
</script>
<style lang="scss" scoped>
.el-dropdown {
  cursor: pointer;
  .el-tooltip__trigger {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  margin-left: 20px;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
