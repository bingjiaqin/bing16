<script setup>
import { ref, computed, shallowRef, onMounted, onUnmounted, nextTick } from 'vue';
import WelcomePage from "./WelcomePage.vue";
import Hesitate from "@/components/index/Hesitate.vue";
import Sea from "./Sea.vue";
import Color from "@/components/index/Color.vue";
import LookFor from "@/components/index/LookFor.vue";
import Forget from "@/components/index/Forget.vue";
import Empty from "@/components/index/Empty.vue";
import {isMobile} from "@/utils/MobileUtils";

const allComponents = [Hesitate, Forget, LookFor, Color, Sea, Empty];
const components = shallowRef([allComponents[0]]);
const nextComponentIdx = ref(1);
const totalSections = computed(() => allComponents.length + 1);
const activeSection = ref(0);
const sectionLabels = ["你好，欣喜相逢", "2025.Q3 迷茫 · 痛苦与厌倦", "2024.Q1 遗忘 · 重蹈覆辙", "2023.Q1 寻觅 · 什么是永恒与唯一", "2022.Q4 生活 · 奔波与停留", "2022.Q3 旅途 · 在人间", "END"];

const mobile = isMobile();
const mainRef = ref(null);

let observer = null;
const sectionEls = new Map();

function observeSections() {
  if (!mainRef.value) return;
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          const idx = sectionEls.get(entry.target);
          if (idx !== undefined) {
            activeSection.value = idx;
          }
        }
      }
    },
    { root: mainRef.value, threshold: [0.3, 0.5, 0.7] }
  );

  mainRef.value.querySelectorAll('.index').forEach((el, i) => {
    sectionEls.set(el, i);
    observer.observe(el);
  });
}

function load() {
  if (nextComponentIdx.value < allComponents.length) {
    components.value.push(allComponents[nextComponentIdx.value]);
    nextComponentIdx.value = nextComponentIdx.value + 1;
    nextTick(() => observeSections());
  }
}

function scrollToSection(idx) {
  if (!mainRef.value) return;
  while (nextComponentIdx.value < idx) load();
  const children = mainRef.value.querySelectorAll('.index');
  if (children[idx]) children[idx].scrollIntoView({ behavior: 'smooth' });
}

onMounted(() => { observeSections(); });
onUnmounted(() => { if (observer) observer.disconnect(); });
</script>

<template>
  <main ref="mainRef" :class="{notMobile:!mobile}">
    <el-row class="index">
      <welcome-page></welcome-page>
    </el-row>
    <el-row
      v-infinite-scroll="load"
      :infinite-scroll-disabled="nextComponentIdx >= allComponents.length">
      <el-row v-for="(component, index) in components" class="index" :class="{top: index !== allComponents.length - 1}">
        <component :is="component" :bgColor="`var(--color-background)`"></component>
      </el-row>
    </el-row>

    <div class="page-dots" v-if="!mobile">
      <div
        v-for="i in totalSections"
        :key="i"
        class="dot"
        :class="{ active: i - 1 === activeSection }"
        @click="scrollToSection(i - 1)"
      >
        <span class="dot-tip" v-text="sectionLabels[i - 1]"></span>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  overflow: scroll;
  height: 100vh;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
  &.notMobile { scroll-snap-type: y proximity; scroll-behavior: smooth; }
}
.index { min-height: 100vh; width: 100%; scroll-snap-align: start; }
.top { z-index: 100; }

/* 分页指示器 */
.page-dots {
  position: fixed;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
  align-items: flex-end;
}

.dot {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-border);
  cursor: pointer;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dot.active {
  background: var(--color-primary);
  transform: scale(1.4);
  box-shadow: 0 0 6px rgba(234, 88, 87, 0.4);
}

.dot:hover {
  background: var(--color-primary);
  transform: scale(1.2);
}

/* 自制 tooltip */
.dot-tip {
  position: absolute;
  right: calc(100% + 12px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 13px;
  padding: 5px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: #ffffff;
  line-height: 1.4;
  opacity: 0;
  pointer-events: none;
  transition: opacity 180ms ease;
}

.dot-tip::after {
  content: '';
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  border-left: 5px solid rgba(0, 0, 0, 0.35);
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
}

.dot:hover .dot-tip {
  opacity: 1;
}
</style>
