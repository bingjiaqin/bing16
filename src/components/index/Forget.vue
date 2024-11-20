<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref} from "vue";

const mobile = isMobile()
const picList = [
  "https://lsky.bing16.xyz:2096/i/2024/03/01/65e0ab0aea2ff.jpg", 
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab804675f7.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab878f16c0.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab8876037a.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab886da6a3.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab8826209c.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab88419f81.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab8911e4bc.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab89813f7a.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab896298c4.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab89423a38.jpg"
];
const picThumbnailList = [
  "https://lsky.bing16.xyz:2096/i/2024/03/01/65e0ab0aea2ff.jpg", 
  "https://lsky.bing16.xyz:2096/thumbnails/6cb69b909962cc0297acee3d94f59f46.png",
  "https://lsky.bing16.xyz:2096/thumbnails/50c28e29ba4e5c4f31b38b8f5929e414.png",
  "https://lsky.bing16.xyz:2096/thumbnails/9ba27de0cacccdb47475232c6c57c517.png",
  "https://lsky.bing16.xyz:2096/thumbnails/d3d8821cc765bea2229717f6008eee12.png",
  "https://lsky.bing16.xyz:2096/thumbnails/9cc45192af573cac977281754d6d7bff.png",
  "https://lsky.bing16.xyz:2096/thumbnails/6c769e262a750dccf9f92d89c116fa3a.png",
  "https://lsky.bing16.xyz:2096/thumbnails/04176d0e216b3b2b52424a855532300f.png",
  "https://lsky.bing16.xyz:2096/thumbnails/9eabd7644080072bc721adcb1d6ac3b5.png",
  "https://lsky.bing16.xyz:2096/thumbnails/cf97621a4ceee79d6d0599b1fef6625a.png",
  "https://lsky.bing16.xyz:2096/thumbnails/5fae26a6857d4f18af98de8b940e6443.png"
];
const index = ref(0);
const showViewer = ref(false);

const view = (idx) => {
  index.value = idx;
  showViewer.value = true;
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
</script>

<template>
  <el-row class="color"
   :style="{ 'background-color': bgColor, color: color }"
   :class="{mobile:mobile, notMobile:!mobile}">
    <el-col :sm="2" :md="1">
    </el-col>
    <el-col :sm="20" :md="13">
      <div class="pic">
        <img
            :class="{smallPic: index !== 0, mainPic: index === 0}"
            v-for="(pic, index) in picThumbnailList"
            @click="view(index)"
            :src="pic"
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
    <el-col :sm="20" :md="10">
      <div class="text"
       :class="{mobile:mobile, notMobile:!mobile}">
        <h1>遗忘 · 重蹈覆辙</h1>
        <i>2024.Q1</i>
        <div>我仍记得他说了一句不要得寸进尺。</div>
        <div>虽然在后面仍见过几次YMW，但是一切都变了。</div>
        <div>错过的终究是错过，一回头已经是不同的道路。</div>
        <div>对于Y是这样，对于Z也是。</div>
        <div>我似乎已经忘了曾经欲求不得的痛苦。</div>
        <div>但一次次的重蹈覆辙告诉我，</div>
        <div>这似乎只是下一个重复的开始。</div>
        <div></div>
      </div>
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
    text-align: ce;
  }
  &.notMobile {
    padding: 60px 60px;
  }
}
h1 {
  padding-bottom: 10px;
}
div {
  padding-top: 10px;
}
</style>