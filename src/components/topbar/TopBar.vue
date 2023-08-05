<template>
  <div class="top-manu">
    <el-menu
        v-if="mobile"
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        class="mobile"
    >
      <img src="../../assets/logo.png" class="logo logo-phone" alt="bing16">
      <div class="flex-grow" />
      <el-sub-menu index="2-4">
        <template #title>
          <el-icon><IconMenu /></el-icon>
        </template>
        <el-menu-item
            v-for="item in MENU_LIST"
            :index="item.key">
          {{ item.name }}
        </el-menu-item>
        <el-menu-item :index="INTRO">关于我</el-menu-item>
      </el-sub-menu>
    </el-menu>

    <el-menu
        v-if="!mobile"
        :default-active="activeIndex"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <img src="../../assets/logo.png" class="logo" alt="bing16">
      <span class="website-name">Bing16</span>
      <div class="flex-grow" />
      <el-menu-item
          v-for="item in MENU_LIST"
          :index="item.key">
        {{ item.name }}
      </el-menu-item>
      <el-divider direction="vertical" class="split"/>
      <el-menu-item :index="INTRO">关于我</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MENU_LIST, INTRO, DEFAULT_MENU } from './config/Menu'
import { isMobile } from '@/utils/MobileUtils'
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'

const emit = defineEmits(["changeMenu"])
const activeIndex = ref(DEFAULT_MENU)
const showVertical = ref(false)
const mobile = isMobile()

const handleSelect = (key: string) => {
  emit('changeMenu', key);
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.top-manu {
  height: 90px;
  padding-top: 25px;
  background-color: #ffffff;

  .logo {
    position: relative;
    top: -2px;
  }
  .website-name {
    position: relative;
    margin-left: 15px;
    margin-top: 7px;
    margin-right: 15px;
  }
  .split {
    position: relative;
    margin-left: 3px;
    margin-top: 12px;
    margin-right: 3px;
  }
  .el-menu--horizontal.el-menu {
    border-bottom: 0;
  }
  .el-menu {
    height: 40px;
  }
  .el-menu-item {
    width: 90px;
  }
  .el-sub-menu {
    width: 40px;
  }
  .el-menu-vertical-demo {
    width: 100%;
  }
  .el-sub-menu__icon-arrow {
    display: none;
  }
  .el-menu--horizontal > .el-sub-menu.is-active .el-sub-menu__title {
    border-bottom: 0;
  }
}
</style>
