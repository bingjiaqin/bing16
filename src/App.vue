<script lang="ts" setup>
import {ref, shallowRef} from 'vue'
import { COMPONENT_MAP, DEFAULT_MENU } from './components/topbar/config/Menu.js'
import TopBar from "@/components/topbar/TopBar.vue";
import FooterBar from "@/components/footer/FooterBar.vue"

const currPage = ref(DEFAULT_MENU);
const selectedComponent = shallowRef(COMPONENT_MAP.get(DEFAULT_MENU));

const changeMenu = (newMenu: string) => {
  selectedComponent.value = COMPONENT_MAP.get(newMenu);
  currPage.value = newMenu;
}

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <top-bar
            @changeMenu="changeMenu"
        >
        </top-bar>
      </el-header>
      <el-container>
        <el-main
            :class="{mainPage:currPage === DEFAULT_MENU,
            notMainPage:currPage !== DEFAULT_MENU}">
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
  overflow-y: scroll;
  &.mainPage {
    position: relative;
    top: calc(90px);
  }
  &.mainPage::-webkit-scrollbar {
    width: 0;
  }
  &.notMainPage {
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
