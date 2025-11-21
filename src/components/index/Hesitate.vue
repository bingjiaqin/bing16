<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref,nextTick} from "vue";

const mobile = isMobile()
const picList = [
  "https://lsky.bing16.xyz:2096/i/2025/11/21/69204eb646558.jpeg",
  "https://lsky.bing16.xyz:2096/i/2025/11/21/69204c8d1697c.jpeg",
  "https://lsky.bing16.xyz:2096/i/2025/11/21/69204ca555bb3.jpeg",
  "https://lsky.bing16.xyz:2096/i/2025/11/21/692058f7f4017.jpeg",
  "https://lsky.bing16.xyz:2096/i/2025/11/21/692058c875e0d.jpeg",
  "https://lsky.bing16.xyz:2096/i/2025/11/21/69204cc64c417.jpeg",
  "https://lsky.bing16.xyz:2096/i/2025/11/21/692058438b1db.jpg"
];
const picThumbnailList = [
  "https://lsky.bing16.xyz:2096/i/2025/11/21/69204eb646558.jpeg",
  "https://lsky.bing16.xyz:2096/thumbnails/953b518edc17e307767efd45996ccbf0.png",
  "https://lsky.bing16.xyz:2096/thumbnails/d70e45b667e35bc6195f0d6369532e12.png",
  "https://lsky.bing16.xyz:2096/thumbnails/18c627ff99ac6b0181181e08f5f6a67c.png",
  "https://lsky.bing16.xyz:2096/thumbnails/458efa2639c0f1d5dea6cd62198e88ce.png",
  "https://lsky.bing16.xyz:2096/thumbnails/a946f2debf8482f511c04348de447a69.png",
  "https://lsky.bing16.xyz:2096/thumbnails/48482de9b4df877ae63ecdd426960fdd.png"
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
        <h1>迷茫 · 痛苦与厌倦</h1>
        <i>2025.Q3</i>
        <div>我触碰到了那有温度的东西，</div>
        <div>但又瞬间跌入了迷茫。</div>
        <div>我脱离了旧的困境，</div>
        <div>又到达了新的困境。</div>
        <div>人生总在寻寻觅觅，</div>
        <div>当得到时又陷入了新的痛苦。</div>
        <div>我总想逃脱，</div>
        <div>却又无法逃脱。</div>
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