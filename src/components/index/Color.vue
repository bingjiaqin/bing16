<script setup>
import {isMobile} from "@/utils/MobileUtils";
import IMG_0414 from '@/assets/picture/index/image/IMG_0414.JPG';
import IMG_0410 from '@/assets/picture/index/image/IMG_0410.JPG';
import IMG_0450 from '@/assets/picture/index/image/IMG_0450.JPG';
import IMG_0444 from '@/assets/picture/index/image/IMG_0444.JPG';
import IMG_0440 from '@/assets/picture/index/image/IMG_0440.JPG';
import IMG_0429 from '@/assets/picture/index/image/IMG_0429.JPG';
import IMG_0454 from '@/assets/picture/index/image/IMG_0454.JPG';
import IMG_0443 from '@/assets/picture/index/image/IMG_0443.JPG';

const mobile = isMobile()
const picList = [IMG_0414, IMG_0410, IMG_0450, IMG_0444, IMG_0440, IMG_0429, IMG_0454, IMG_0443];
</script>

<template>
  <el-row class="color">
    <el-col :sm="24" :md="10">
      <div class="text">
        <h1>生活 · 奔波与停留</h1>
        <div>从早晨，</div>
        <div>到傍晚，</div>
        <div>再到晚上，</div>
        <div>一直到窗外的灯光穿过玻璃窗照在墙顶。</div>
        <div>从天空由紫色，</div>
        <div>到蓝色，</div>
        <div>再到手中点亮的灯。</div>
        <div>发现奔波与停留之间，生活依旧充满色彩。</div>
      </div>
    </el-col>
    <el-col :sm="24" :md="13">
      <div class="pic">
        <el-image
            :class="{smallPic: index !== 0}"
            v-for="(pic, index) in picList"
            :preview-src-list="picList"
            :initial-index="index"
            :src="pic"
            loading="lazy"
            fit="cover" />
      </div>
    </el-col>
    <el-col :sm="0" :md="1">
    </el-col>
  </el-row>
</template>

<style scoped>
.color {
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
  width: calc(100%/7);
  aspect-ratio: 3 / 2;
}
.text {
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