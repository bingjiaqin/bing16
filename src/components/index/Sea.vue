<script setup>
import {isMobile} from "@/utils/MobileUtils";
import IMG_0285 from '@/assets/picture/index/image/IMG_0285.JPG';
import IMG_0306 from '@/assets/picture/index/image/IMG_0306.JPG';
import IMG_0301 from '@/assets/picture/index/image/IMG_0301.JPG';
import IMG_0302 from '@/assets/picture/index/image/IMG_0302.JPG';
import P20716 from '@/assets/picture/index/image/P20716.JPG';
import IMG_0332 from '@/assets/picture/index/image/IMG_0332.JPG';

const mobile = isMobile()
const picList = [IMG_0285, IMG_0306, IMG_0301, IMG_0302, P20716, IMG_0332];
</script>

<template>
  <el-row class="sea">
    <el-col :sm="0" :md="1">
    </el-col>
    <el-col :sm="24" :md="13">
      <div class="pic">
        <el-image
            :class="{smallPic: index !== 0}"
            v-for="(pic, index) in picList"
            :preview-src-list="picList"
            :initial-index="index"
            :src="pic" fit="cover" />
      </div>
    </el-col>
    <el-col :sm="24" :md="10">
      <div class="text">
        <h1>旅途 · 在人间</h1>
        <div>我们决定来一场说走就走的旅行，</div>
        <div>在人间边界处，找到一所面朝大海的房子。</div>
        <div>在惠州的双月湾，</div>
        <div>我们看着海水和沙滩，</div>
        <div>听着潮起潮落，</div>
        <div>迎来第二天日出的失败。</div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.sea {
  background-color: #000000;
  color: #ffffff;
  width: 100%;
  text-align: center;
}
.pic {
  position: relative;
  width: 100%;
  top:calc(50%);
  transform: translateY(-50%);
}
.smallPic {
  width: calc(100%/5);
  aspect-ratio: 1.5;
}
.text {
  color: #ffffff;
  text-align: left;
  position: relative;
  padding: 60px 60px;
  top:calc(50%);
  transform: translateY(-50%);
}
h1 {
  padding-bottom: 10px;
}
div {
  padding-top: 10px;
}
</style>