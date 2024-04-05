<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref} from "vue";

const mobile = isMobile()
const picList = [
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be45ac06dc7.jpg",
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be45bfbde56.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be463153865.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be4619f241c.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be45eb58950.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be45d6adf60.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be464562fde.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be4601054ae.jpg"];
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
  <el-row class="color" :style="{ 'background-color': bgColor, color: color }">
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
  </el-row>
</template>

<style scoped>
.color {
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