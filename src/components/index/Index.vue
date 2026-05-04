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

const mobile = isMobile();
const mainRef = ref(null);

// IntersectionObserver 跟踪当前可见区块
let observer = null;
const sectionEls = new Map(); // el -> index

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
    {
      root: mainRef.value,
      threshold: [0.3, 0.5, 0.7],
    }
  );

  const sections = mainRef.value.querySelectorAll('.index');
  sections.forEach((el, i) => {
    sectionEls.set(el, i);
    observer.observe(el);
  });
}

function load() {
  if (nextComponentIdx.value < allComponents.length) {
    components.value.push(allComponents[nextComponentIdx.value]);
    nextComponentIdx.value = nextComponentIdx.value + 1;
    // 新组件挂载后重新建立观察
    nextTick(() => observeSections());
  }
}

function scrollToSection(idx) {
  if (!mainRef.value) return;
  while (nextComponentIdx.value < idx) {
    load();
  }
  const children = mainRef.value.querySelectorAll('.index');
  if (children[idx]) {
    children[idx].scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  observeSections();
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
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
        <component :is="component"
        :bgColor="`var(--color-background)`"></component>
      </el-row>
    </el-row>
    <!-- 分页指示器 -->
    <div class="page-dots" v-if="!mobile">
      <div
        v-for="i in totalSections"
        :key="i"
        class="dot"
        :class="{ active: i - 1 === activeSection }"
        @click="scrollToSection(i - 1)"
      ></div>
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

  &::-webkit-scrollbar {
    display: none;
  }

  &.notMobile {
    scroll-snap-type: y proximity;
    scroll-behavior: smooth;
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
}

.dot {
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
  opacity: 0.6;
  transform: scale(1.2);
}
</style>
