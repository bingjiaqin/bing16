<script setup>
import WelcomePage from "./WelcomePage.vue";
import Sea from "./Sea.vue";
import Color from "@/components/index/Color.vue";
import LookFor from "@/components/index/LookFor.vue";
import Forget from "@/components/index/Forget.vue";
import { ref, shallowRef } from 'vue';

const allComponents = [Forget, LookFor, Color, Sea];
const components = shallowRef([allComponents[0]]);
const nextComponentIdx = ref(1);

function load() {
  if (nextComponentIdx.value < allComponents.length) {
    components.value.push(allComponents[nextComponentIdx.value]);
    nextComponentIdx.value = nextComponentIdx.value + 1;
  }
}
</script>

<template>
  <el-row class="index welcome">
    <welcome-page></welcome-page>
  </el-row>
  <el-row
    v-infinite-scroll="load"
    :infinite-scroll-disabled="nextComponentIdx >= allComponents.length">
    <el-row v-for="(component, index) in components" class="index">
      <component :is="component"
       :bgColor="`${index % 2 === 0 ? '#000' : ''}`"
       :color="`${index % 2 === 0 ? '#9f9f9f' : ''}`"></component>
    </el-row>
  </el-row>
</template>

<style scoped>
.index {
  min-height: 100vh;
  width: 100%;
}
.welcome {
  padding: 0 30px;
  min-height: calc(100vh - 180px);
}
</style>