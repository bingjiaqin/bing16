<script setup>
import { PIC_LIST } from "@/components/index/PicConfig";
import {isMobile} from "@/utils/MobileUtils";
import { h } from 'vue'
import { ElMessageBox, ElNotification } from 'element-plus'

const mobile = isMobile()

function showInfo() {
  ElMessageBox({
    title: '特殊物品✨',
    message: h('p', null, [
      h('div', null, '其他联系方式：'),
      h('div', null, 'WeChat：At_Deprecated'),
      h('div', null, '网易云音乐：KareNoNeko'),
      h('div', null, '新浪微博：香香的鸽子牌柠檬味复读机'),
    ]),
    buttonSize: 'small',
    confirmButtonText: '关闭袋子 +'
  })
}

function findMe() {
  ElNotification({
    title: '呀哈哈~',
    message: h('div', null, [
      h('div', { style: 'color: teal' }, "获得呀哈哈给予的小小果实。"),
      h('div', { style: 'text-align: right; font-size: 10px', onClick: showInfo }, "打开袋子 +")
    ]),
    offset: 100,
  })
}
</script>

<template>
  <el-row class="welcome1"
  :class="{mobile:mobile, notMobile:!mobile}">
    <el-col :sm="24" :md="12">
      <div
        class="main-col main-text"
        :class="{mobile:mobile, notMobile:!mobile}">
        <h1>你好，欣喜相逢</h1>
        <p><span>我就是我</span>。</p>
        <p>这里是我的个人网站，会有一些个人的
          <span>项目记录</span>
          以及比较
          <span>个人的随感</span>。
        </p>
        <p>如果你从别的地方找到这里，
          <span @click="findMe">欢迎联系我</span>。
        </p>
        <p style="padding-top: 10px"><small>建议使用ipv6网络环境访问</small></p>
      </div>
    </el-col>
    <el-col :sm="24" :md="12">
      <div class="main-col"
        :class="{mobile:mobile, notMobile:!mobile}">
        <el-carousel
            :height="mobile ? '260px' : '450px'"
            indicator-position="outside"
            arrow="never"
            :interval="6000">
          <el-carousel-item v-for="(item, index) in PIC_LIST" :key="index">
            <el-image
                :src="item.src"
                :key="index"
                :title="item.title"
                class="pic"
                :class="{mobile:mobile, notMobile:!mobile}"
                loading="lazy"
                fit="contain">
              <template #error>
                <el-image
                    :src="item.src.replace('lsky.bing16.xyz','lskyv4.bing16.xyz')"
                    :key="index"
                    :title="item.title"
                    class="pic"
                    :class="{mobile:mobile, notMobile:!mobile}"
                    loading="lazy"
                    fit="contain">
                </el-image>
              </template>
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :sm="0" :md="1">
    </el-col>
  </el-row>
</template>

<style scoped>
h1 {
  margin-bottom: 18px;
}
.main-col {
  position: relative;
  
  &.notMobile {
    top: 35%;
    transform: translateY(-55%);
  }
}
.main-text {
  min-height: 350px;
  position: relative;
  transform: translateY(-30%);

  &.mobile {
    min-height: 20px;
    top:calc(35%);
    transform: translateY(-50%);
  }
  &.notMobile {
    min-height: 350px;
    top:calc(32%);
    transform: translateY(-30%);
  }
}
.pic {
  &.mobile {
    height: 300px;
  }
  &.notMobile {
    height: 450px;
  }
}
.welcome1 {
  width: 100%;
  z-index: 100;
  min-height: 100vh;
  background: linear-gradient(to bottom, rgba(var(--color-background-num), 0.5), var(--color-background) 40%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &.mobile {
    top: 70px;
    padding: 90px 60px;
  }
  &.notMobile {
    top: 150px;
    padding: 90px 60px 0 60px;
  }
}
</style>