<script lang="ts" setup>
import {ref, shallowRef, nextTick} from 'vue';
import { useRoute } from 'vue-router';
import { COMPONENT_MAP, DEFAULT_MENU } from '@/components/topbar/config/Menu.js';
import TopBar from "@/components/topbar/TopBar.vue";
import FooterBar from "@/components/footer/FooterBar.vue";

const currPage = ref(DEFAULT_MENU);
const selectedComponent = shallowRef(COMPONENT_MAP.get(DEFAULT_MENU));

const changeMenu = (newMenu: string) => {
  const component = COMPONENT_MAP.get(newMenu)
  if (component) {
    selectedComponent.value = component;
    currPage.value = newMenu;
    nextTick(() => scrollToTop());
  }
}

const { path, query, params } = useRoute();
if (path !== '') {
  changeMenu(path.substring(1));
}

const scrollToTop = () => {
  document.documentElement.scrollTop || document.body.scrollTop;
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <top-bar
            :default="currPage"
            @changeMenu="changeMenu"
        >
        </top-bar>
      </el-header>
      <el-container>
        <el-main class="mainPage">
          <component :is="selectedComponent"></component>
          <el-footer>
            <footer-bar></footer-bar>
          </el-footer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.common-layout {
  position:absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.el-header {
  position: relative;
  width: 100%;
  height: 90px;
}

.el-main {
  width: 100%;
  bottom: 0;
  &.mainPage {
    position: relative;
    top: calc(90px);
    overflow-y: hidden;
  }
  &.mainPage::-webkit-scrollbar {
    width: 0;
  }
  &.notMainPage {
    overflow-y: scroll;
    position: absolute;
    top: calc(90px);
  }
}

.el-footer {
  position: relative;
  width: 100%;
}

@media (min-width: 1024px) {
}
</style>
