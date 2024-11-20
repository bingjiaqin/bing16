<script setup>
import {isMobile} from "@/utils/MobileUtils";
import {ref} from "vue";

const mobile = isMobile()
const picList = [
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9bac2047.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9c58f308.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9c893767.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9d0f0457.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9de6066c.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9d6323bd.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9d48a8f5.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9da0f218.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9df80f71.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9f73ecc6.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665aba04a2ed9.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9fd7b8ee.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665aba01e7121.jpg",
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665aba12c4afc.jpg"
];
const picThumbnailList = [
  "https://lsky.bing16.xyz:2096/i/2024/06/01/665ab9bac2047.jpg",
  "https://lsky.bing16.xyz:2096/thumbnails/ad023270dcd193ab1cd30b0a2ed13278.png",
  "https://lsky.bing16.xyz:2096/thumbnails/76315ac27ed9461c75759055e81cb019.png",
  "https://lsky.bing16.xyz:2096/thumbnails/a5832bf21281b9354fd3bd240f51ff9a.png",
  "https://lsky.bing16.xyz:2096/thumbnails/537917e6a5150acbf60f1bf878939388.png",
  "https://lsky.bing16.xyz:2096/thumbnails/04a2d4195d4042be07a86d2f67c33be3.png",
  "https://lsky.bing16.xyz:2096/thumbnails/e9d9cf71406a5bf7ab1e1c60fb07791e.png",
  "https://lsky.bing16.xyz:2096/thumbnails/9fd52ccee97f2cc381f5cabb3decd0c9.png",
  "https://lsky.bing16.xyz:2096/thumbnails/f26a99ed9097a5fe0b646b1fabe766d6.png",
  "https://lsky.bing16.xyz:2096/thumbnails/30752fbad9bbf00dce85b640a8a5ab3a.png",
  "https://lsky.bing16.xyz:2096/thumbnails/f9b51f07605800a18e1bbd7232341dea.png",
  "https://lsky.bing16.xyz:2096/thumbnails/db6c564abcd48dd0d8375645b51dd2d5.png",
  "https://lsky.bing16.xyz:2096/thumbnails/78225269872688868f81b52f10082964.png",
  "https://lsky.bing16.xyz:2096/thumbnails/8814b77c52b251de552ca447b93749a5.png"
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
  <el-row class="look-for"
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