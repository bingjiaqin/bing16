<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref} from "vue";

const mobile = isMobile()
const picList = [
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be4920c91f5.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be489a670c2.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48aab6e33.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48b5b4350.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48d392a0f.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48de7349a.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48e9057d8.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48ffbb3ce.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be49130492b.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be492fe76d0.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be49358552c.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be495034639.jpg"
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