<script lang="ts" setup>
import {onMounted, shallowRef} from 'vue'
import { COMPONENT_MAP, DEFAULT_MENU } from './components/topbar/config/Menu.js'
import TopBar from "@/components/topbar/TopBar.vue";

const selectedComponent = shallowRef(COMPONENT_MAP.get(DEFAULT_MENU));

const changeMenu = (newMenu: string) => {
  selectedComponent.value = COMPONENT_MAP.get(newMenu);
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
        <el-main>
          <component :is="selectedComponent"></component>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

.common-layout {
  position:absolute;
  top: 0;
  left: 30px;
  bottom: 0;
  right: 30px;
}

.el-header {
  position: relative;
  width: 100%;
  height: 90px;
}

.el-main {
  position: absolute;
  width: 100%;
  top: 90px;
  bottom: 0;
  overflow-y: scroll;
}

@media (min-width: 1024px) {
}
</style>
