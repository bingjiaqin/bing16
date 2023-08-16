<script setup>
import WelcomePage from "./WelcomePage.vue";

</script>

<template>
  <el-row class="index welcome">
    <welcome-page></welcome-page>
  </el-row>
</template>

<style scoped>
.index {
  min-height: 100vh;
}
.welcome {
  padding: 0 60px;
  min-height: calc(100vh - 90px);
}
</style>