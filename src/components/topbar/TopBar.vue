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
      <el-sub-menu index="2-4" v-if="props.backTo === ''">
        <template #title>
          <el-icon><IconMenu /></el-icon>
        </template>
        <el-menu-item
            v-for="item in MENU_LIST"
            :index="item.key">
            <router-link :to="`/${item.key}`">{{ item.name }}</router-link>
        </el-menu-item>
        <el-menu-item :index="INTRO"><router-link :to="`/${INTRO}`">关于我</router-link></el-menu-item>
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
      <el-menu-item v-if="props.backTo === ''"
          v-for="item in MENU_LIST"
          :index="item.key">
          <router-link :to="`/${item.key}`">{{ item.name }}</router-link>
      </el-menu-item>
      <el-menu-item v-if="props.backTo !== ''">
        <router-link :to="{ path: props.backTo }">返回</router-link>
      </el-menu-item>
      <el-divider direction="vertical" class="split"/>
      <el-menu-item v-if="props.backTo === ''" :index="INTRO"><router-link :to="`/${INTRO}`">关于我</router-link></el-menu-item>
      <el-menu-item v-if="props.backTo !== ''" @click="close">关闭</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { MENU_LIST, INTRO, DEFAULT_MENU } from './config/Menu.js'
import { isMobile } from '@/utils/MobileUtils'
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'

const props = defineProps({
    backTo: {
      default: '',
      type: String,
    },
    default: {
      default: DEFAULT_MENU,
      type: String,
    }
});

const emit = defineEmits(["changeMenu"])
const activeIndex = ref(props.default)
const mobile = isMobile()

const router = useRoute()
const handleSelect = (key: string) => {
  emit('changeMenu', key);
}

const close = () => {
  window.close();
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.top-manu {
  height: 90px;
  padding-top: 20px;
  padding-left: 60px;
  padding-right: 60px;

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
    background-color: unset;
  }
  .el-menu--horizontal .el-menu-item:not(.is-disabled):hover, .el-menu--horizontal .el-menu-item:not(.is-disabled):focus {
    background-color: unset;
  }
  .el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
    background-color: unset;
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
