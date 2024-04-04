<script setup>
import WelcomePage from "./WelcomePage.vue";
import Sea from "./Sea.vue";
import Color from "@/components/index/Color.vue";
import LookFor from "@/components/index/LookFor.vue";
import Forget from "@/components/index/Forget.vue";
import Empty from "@/components/index/Empty.vue";
import {isMobile} from "@/utils/MobileUtils";
import { ref, shallowRef } from 'vue';

const allComponents = [Forget, LookFor, Color, Sea, Empty];
const components = shallowRef([allComponents[0]]);
const nextComponentIdx = ref(1);

const mobile = isMobile()

function load() {
  if (nextComponentIdx.value < allComponents.length) {
    components.value.push(allComponents[nextComponentIdx.value]);
    nextComponentIdx.value = nextComponentIdx.value + 1;
  }
}
</script>

<template>
  <main :class="{mobile:mobile, notMobile:!mobile}">
    <el-row class="index">
      <welcome-page></welcome-page>
    </el-row>
    <el-row
      v-infinite-scroll="load"
      :infinite-scroll-disabled="nextComponentIdx >= allComponents.length">
      <el-row v-for="(component, index) in components" class="index" :class="{top: index !== allComponents.length - 1}">
        <component :is="component"
        :bgColor="`${index % 2 === 0 ? '#000' : 'var(--color-background)'}`"
        :color="`${index % 2 === 0 ? '#9f9f9f' : ''}`"></component>
      </el-row>
    </el-row>
  </main>
</template>

<style scoped>
main {
  overflow: scroll;
  height: 100vh;
  overflow-x: hidden;

  &.mobile {
  scroll-snap-type: y proximity;
  }

  &.notMobile {
  scroll-snap-type: y mandatory;
  }
}
.index {
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
}
.top {
  z-index: 100;
}
</style>