<script setup>
import WelcomePage from "./WelcomePage.vue";
import Question from "./Sea.vue";

</script>

<template>
  <el-row class="index welcome">
    <welcome-page></welcome-page>
  </el-row>
  <el-row class="index">
    <question></question>
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