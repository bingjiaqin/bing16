<script setup>
import { ref } from 'vue';
import {isMobile} from "@/utils/MobileUtils";

const mobile = isMobile()
const picList = [
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd0ef0dcb.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd11e282a.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd1bb0f88.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd1a50092.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd21e1547.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd28b9e22.jpg"
];
const picThumbnailList = [
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665abd0ef0dcb.jpg",
  "https://lsky.bing16.xyz:2096/thumbnails/5dbeb5dfe21c50cabc07e3bcd860a806.png",
  "https://lsky.bing16.xyz:2096/thumbnails/71d9a92a812251014ddad67a015b08d7.png",
  "https://lsky.bing16.xyz:2096/thumbnails/5dd2e19a54ed744a5ef21d6ce3e2e1e2.png",
  "https://lsky.bing16.xyz:2096/thumbnails/3828e43ea4f7d5a027fe7a38fd4216ce.png",
  "https://lsky.bing16.xyz:2096/thumbnails/230e369b1b029afe0de0e81d03403987.png"
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
  <el-row class="sea" :style="{ 'background-color': bgColor, color: color }">
    <el-col :sm="0" :md="1">
    </el-col>
    <el-col :sm="24" :md="13">
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
    <el-col :sm="24" :md="10">
      <div class="text">
        <h1>旅途 · 在人间</h1>
        <i>2022.Q3</i>
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
  width: 100%;
  text-align: center;
  padding: 50px 0;
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
  width: calc(100%/5);
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