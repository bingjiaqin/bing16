<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref,nextTick} from "vue";

const mobile = isMobile()
const picList = [
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc6c9acd3.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc70e2060.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc76d25f0.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc7b5bb19.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc7daca36.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc8109f24.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc8527f49.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc8956f1b.jpg"
];
const picThumbnailList = [
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abc6c9acd3.jpg",
  "https://lsky.bing16.xyz:2096/thumbnails/5f9e4c3dfa528573483c958cd43527dd.png",
  "https://lsky.bing16.xyz:2096/thumbnails/212b591e575a841d233bd742039d6cfa.png",
  "https://lsky.bing16.xyz:2096/thumbnails/fa0cf6aaa55d2637077261b5ef13fc17.png",
  "https://lsky.bing16.xyz:2096/thumbnails/2b566cee320b55da9ddb339a7b9e8a2d.png",
  "https://lsky.bing16.xyz:2096/thumbnails/1faa86515d39349d5fab62ef9c1fe687.png",
  "https://lsky.bing16.xyz:2096/thumbnails/e380b44cfccf62ec54969f9c1acdf807.png",
  "https://lsky.bing16.xyz:2096/thumbnails/42387d0be7a067100229d83ab3edd22c.png"
];
const index = ref(0);
const showViewer = ref(false);

const view = (idx) => {
  index.value = idx;
  showViewer.value = true;
  setViverOnError();
}

defineProps({
  bgColor:{
    type: String,
    default: ''
  },
  color:{
    type: String,
    default: ''
  }
})

const setViverOnError = () => {
  nextTick(() => {
    const elements = document.querySelectorAll('.el-image-viewer__img');
    elements.forEach(element => {
      element.setAttribute("onerror", "this.onerror=null;this.src=this.src.replace('lsky.bing16.xyz', 'lskyv4.bing16.xyz');");
    });
  });
};
</script>

<template>
  <el-row class="color"
   :style="{ 'background-color': bgColor, color: color }"
   :class="{mobile:mobile, notMobile:!mobile}">
    <el-col :sm="2" :md="1">
    </el-col>
    <el-col :sm="20" :md="12">
      <div class="pic">
        <img
            :class="{smallPic: index !== 0, mainPic: index === 0}"
            v-for="(pic, index) in picThumbnailList"
            @click="view(index)"
            :src="pic"
            onerror="this.onerror=null;this.src=this.src.replace('lsky.bing16.xyz', 'lskyv4.bing16.xyz');"
            loading="lazy"/>
        <el-image-viewer
            hide-on-click-modal
            teleported
            v-if="showViewer"
            :url-list="picList"
            :initial-index="index"
            @close="showViewer=false"
        >
        </el-image-viewer>
      </div>
    </el-col>
    <el-col :sm="2" :md="0">
    </el-col>
    <el-col :sm="2" :md="1">
    </el-col>
    <el-col :sm="20" :md="10">
      <div class="text"
       :class="{mobile:mobile, notMobile:!mobile}">
        <h1>生活 · 奔波与停留</h1>
        <i>2022.Q4</i>
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
    <el-col :sm="2" :md="0">
    </el-col>
  </el-row>
</template>

<style scoped>
.color {
  width: 100%;
  text-align: center;

  &.mobile {
    padding: 50px 60px;
  }
  &.notMobile {
    padding: 50px 0;
  }
}
.pic {
  position: relative;
  width: 100%;
  top:calc(50%);
  transform: translateY(-50%);
}
.mainPic {
  width: 100%;
}
.smallPic {
  width: calc(100%/7);
  aspect-ratio: 3 / 2;
}
.text {
  text-align: left;
  position: relative;
  top:calc(50%);
  transform: translateY(-50%);

  &.mobile {
    padding: 30px 0;
  }
  &.notMobile {
    padding: 60px 0;
  }
}
h1 {
  padding-bottom: 10px;
}
div {
  padding-top: 10px;
}
</style>