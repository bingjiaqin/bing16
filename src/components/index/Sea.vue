<script setup>
import { ref } from 'vue';
import {isMobile} from "@/utils/MobileUtils";

const mobile = isMobile()
const picList = [
  "https://lsky.bing16.xyz:2096/i/2024/02/03/65be43b3da60f.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/02/03/65be44ba503e5.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/02/03/65be444796cdd.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/02/03/65be448c727d5.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/02/03/65be450ba5d4e.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/02/03/65be44e6c6c47.jpg"];
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
            v-for="(pic, index) in picList"
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