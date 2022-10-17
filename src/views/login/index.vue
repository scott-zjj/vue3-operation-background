<template>
  <div class="login-container flx-center">
    <div class="login-form">
      <div class="login-logo">
        <img class="login-icon" src="../../assets/logo.png" alt="" />
        <p class="logo-text">运营后台</p>
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        size="large"
      >
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="loginForm.username"
            placeholder="用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            show-password
            v-model="loginForm.password"
            placeholder="密码"
          >
          </el-input>
        </el-form-item>
        <div class="flx-row">
          <el-checkbox
            style="flex: 1"
            v-model="loginForm.checked"
            label="记住我"
            size="large"
          />
          <span>忘记密码？</span>
        </div>
      </el-form>
      <div class="login-btn">
        <el-button
          :icon="RefreshLeft"
          round
          @click="resetForm(loginFormRef)"
          size="large"
          >重置</el-button
        >
        <el-button
          :icon="UserFilled"
          round
          @click="handleLogin(loginFormRef)"
          size="large"
          type="primary"
          :loading="loading"
        >
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup name="login">
import { useStore } from "vuex";
import {
  RefreshLeft,
  UserFilled,
  Lock,
  User,
  Iphone,
} from "@element-plus/icons-vue";
import { reactive, ref } from "vue";
/**获取store */
const globalStore = useStore();
/**登录按钮加载状态 */
const loading = ref(false);
/**form ref */
const loginFormRef = ref();
/**表单初始数据 */
const loginForm = reactive({
  username: "admin",
  password: "123456",
  checked: false,
});
/**验证规则 */
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
/** submit */
const handleLogin = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      loading.value = true;
      globalStore.dispatch("user/login", loginForm);
    } else {
      return false;
    }
  });
};
/**重置表单数据 */
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
// 样式引用
<style scoped lang="scss">
@import "./index.scss";
</style>
