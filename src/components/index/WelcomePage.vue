<script setup>
import { PIC_LIST } from "@/components/index/PicConfig";
import {isMobile} from "@/utils/MobileUtils";

const mobile = isMobile()
</script>

<template>
  <el-col :sm="2" :md="0"></el-col>
  <el-col :sm="20" :md="12">
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
        <span>
            欢迎联系我
          </span>。
      </p>
    </div>
  </el-col>
  <el-col :sm="2" :md="0"></el-col>
  <el-col :sm="24" :md="12">
    <div class="main-col">
      <el-carousel
          :height="mobile ? '300px' : '450px'"
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
              fit="contain"/>
        </el-carousel-item>
      </el-carousel>
    </div>
  </el-col>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.main-col {
  position: relative;
  top:50%;
  transform: translateY(-70%);
}
.main-text {
  position: relative;
  &.mobile {
    min-height: 20px;
    top:calc(50%);
    transform: translateY(-70%);
  }
  &.notMobile {
    min-height: 350px;
    top:calc(50%);
    transform: translateY(-50%);
  }
}
.pic {
  &.mobile {
    height: 350px;
  }
  &.notMobile {
    height: 450px;
  }
}
</style>