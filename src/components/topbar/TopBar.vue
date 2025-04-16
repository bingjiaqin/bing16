<template>
  <div @mouseleave="openDropMenu=false">
    <header class="header">
      <div class="header_box">
        <img src="../../assets/logo.png" class="logo" alt="bing16">
        <span class="website-name">Bing16</span>
        <div class="flex-grow" />
        <div class="main_menu"
          :class="{'active':activeIndex===item.key}"
          v-if="props.backTo === ''"
          v-for="item in MENU_LIST"
          :index="item.key"
        >
          <router-link :to="`/${item.key}`"
          @click="handleSelect(item.key)">
          {{ item.name }}
          </router-link>
        </div>
        <div class="text_menu" v-if="props.backTo !== ''">
          <router-link :to="{ path: props.backTo }">返回</router-link>
        </div>
        <el-divider direction="vertical" class="split menu_line"/>
        <div class="text_menu text_menu_right" v-if="props.backTo !== ''">
          <router-link :to="{ path: props.backTo }" @click="close">关闭</router-link>
        </div>
        <div class="main_menu about"
          :class="{'active':activeIndex===INTRO}"
          v-if="props.backTo === ''"
          :index="INTRO">
          <router-link :to="`/${INTRO}`"
          @click="handleSelect(INTRO)">
            关于我
          </router-link>
        </div>
        <el-button class="menu_button" v-if="props.backTo === ''"  @click="openDropMenu=!openDropMenu">
          <el-icon v-show="openDropMenu"><IconClose/></el-icon>
          <el-icon v-show="!openDropMenu"><IconMenu/></el-icon>
        </el-button>
      </div>
    </header>
    <div class="drop_down_menu_box"
      :class="{'open':openDropMenu}"
    >
      <div class="drop_down_menu_box_inner">
        <div class="main_menu"
          :class="{'active':activeIndex===item.key}"
          v-if="props.backTo === ''"
          v-for="item in MENU_LIST"
          :index="item.key"
        >
          <router-link :to="`/${item.key}`"
          @click="handleSelect(item.key)">
          {{ item.name }}
          </router-link>
        </div>
        <div class="main_menu"
          :class="{'active':activeIndex===INTRO}"
          v-if="props.backTo === ''"
          :index="INTRO">
          <router-link :to="`/${INTRO}`"
          @click="handleSelect(INTRO)">
            关于我
          </router-link>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { MENU_LIST, INTRO, DEFAULT_MENU } from './config/Menu.js'
import {
  Menu as IconMenu,
  CaretTop as IconClose
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
const openDropMenu = ref(false)

const router = useRoute()
const handleSelect = (key: string) => {
  emit('changeMenu', key);
  activeIndex.value = key;
  openDropMenu.value = false;
}

const close = () => {
  window.close();
}
</script>

<style>
.header {
  position: absolute;
  padding: 20px 60px;
  width: 100%;
  z-index: 99;
  height: 75px;
  z-index: 99;
  background: linear-gradient(to top, rgba(var(--color-background-num), 0.5), var(--color-background));
  backdrop-filter: blur(10px) saturate(1.8);
  -webkit-backdrop-filter: blur(10px) saturate(1.8);
}
.header a {
  color: inherit;
}
.header a:hover {
  color: var(--el-color-primary);
}
.header .el-button {
  background-color: var(--color-background);
}
.header_box {
  display: flex;
  align-items: center;

  .website-name {
    position: relative;
    margin-left: 15px;
    margin-right: 15px;
  }
  .logo {
      position: relative;
      top: -2px;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .main_menu {
    color: inherit;
    width: 6em;
    padding-bottom: 5px;
    text-align: center;
  }
  .text_menu {
    color: inherit;
    width: 4em;
    padding-bottom: 5px;
    text-align: center;
  }
  .text_menu_right {
    width: 3em;
    text-align: right;
  }
  .about {
    width: 5em;
  }
  .active {
    color: var(--el-color-primary);
    border-bottom: 2px solid var(--el-color-primary);
  }

  .menu_button {
    color: var(--el-color-primary);
    border: 0;
  }
  @media (min-width: 992px) {
    .menu_button {
      display: none;
    }
  }

  @media (max-width: 992px) {
    .main_menu {
      display: none;
    }
    .split {
      display: none;
    }
  }
}
.drop_down_menu_box {
  display: none;
  position: absolute;
  z-index: 101;
  top: 70px;
  right: 60px;
  width: 10em;
  text-align: left;
  overflow: hidden;
  height: 0;
  transition: height .2s cubic-bezier(0.175, 0.885, 0.32, 1.05);
  background-color: rgb(var(--color-background-num));

  border: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 2px 3px 6px var(--color-shadow),
             -2px -3px 6px var(--color-light);

  .drop_down_menu_box_inner {
    padding: 0.5rem;
  }

  .main_menu {
    position: relative;
    padding: 0.3rem 1em;
  }
  .active {
    color: var(--el-color-primary);
  }
}

.drop_down_menu_box.open  {
  height: 12em;
}

@media (max-width: 992px) {
  .drop_down_menu_box {
    display: block;
  }
}
</style>
