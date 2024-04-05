<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref} from "vue";

const mobile = isMobile()
const picList = [
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be46b4a2e1a.jpg",
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48364c05f.jpg",
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be470613695.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be47640078f.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be477a97f4b.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be478ebb037.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be47a0c1e7d.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be47b35eccc.jpg",
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be47dc546d5.jpg",
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be47c724be0.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be47eeb08d9.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48026fab3.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be48160ae06.jpg", 
  "https://bing16.dynv6.net:1443/i/2024/02/03/65be4821672cc.jpg"];
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
  <el-row class="look-for" :style="{ 'background-color': bgColor, color: color }">
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
        <h1>寻觅 · 什么是永恒与唯一</h1>
        <i>2023.Q1</i>
        <div>2023 我失去了你。</div>
        <div>带着悲伤来到你生活的地方，又独自待到黎明。</div>
        <div>那天人群如潮的时候我想找寻你，却意料之中的没有找到。</div>
        <div>可能我们之间的关系就如同那天的烟花那样稍纵即逝。</div>
        <div>在努力也没有解法的时候，我只能去寻求玄学。</div>
        <div>身体的苦与痛对于我来说已经不算什么。</div>
        <div>但求玄而又玄的神明能保佑我们。</div>
        <div>只是当机会再次来临的时候，我又搞砸了。</div>
        <div>我去走你走过的路，</div>
        <div>看你可能曾看过的风景。</div>
        <div>只是我应该已经让你太失望。</div>
        <div>终究要到了告别的时候了吧，在春天来临时。</div>
        <div>我开始找寻你未曾来过时的记忆，</div>
        <div>就当我们从未认识，我也从未有过期待。</div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.look-for {
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