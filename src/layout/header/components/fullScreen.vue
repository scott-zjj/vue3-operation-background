<template>
  <el-icon id="fullscreen" class="icon-style" @click="handleFullScreen">
    <component :is="icon ? 'Rank' : 'FullScreen'"></component>
  </el-icon>
</template>

<script setup>
import screenfull from "screenfull";
import { ref, onMounted, onBeforeMount } from "vue";

let icon = ref(screenfull.isFullscreen);

const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  }
};

const changeIcon = () => {
  icon.value = screenfull.isFullscreen;
};

onMounted(() => {
  screenfull.on("change", changeIcon);
});

onBeforeMount(() => {
  screenfull.off("change");
});
</script>

<style lang="scss" scoped>
.icon-style {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
