<script setup>
import WelcomePage from "./WelcomePage.vue";
import Sea from "./Sea.vue";
import Color from "@/components/index/Color.vue";
import LookFor from "@/components/index/LookFor.vue";

</script>

<template>
  <el-row class="index welcome">
    <welcome-page></welcome-page>
  </el-row>
  <el-row class="index">
    <sea></sea>
  </el-row>
  <el-row class="index">
    <color></color>
  </el-row>
  <el-row class="index">
    <look-for></look-for>
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