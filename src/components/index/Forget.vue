<script setup>
import {isMobile} from "@/utils/MobileUtils";
import IMG_3916 from '@/assets/picture/index/image/IMG_3916.JPG';
import IMG_3962 from '@/assets/picture/index/image/IMG_3962.JPG';
import IMG_3982 from '@/assets/picture/index/image/IMG_3982.JPG';
import IMG_4116 from '@/assets/picture/index/image/IMG_4116.JPG';
import IMG_4106 from '@/assets/picture/index/image/IMG_4106.JPG';
import IMG_4112 from '@/assets/picture/index/image/IMG_4112.JPG';
import IMG_4114 from '@/assets/picture/index/image/IMG_4114.JPG';
import IMG_4117 from '@/assets/picture/index/image/IMG_4117.JPG';
import IMG_4719 from '@/assets/picture/index/image/IMG_4719.JPG';
import IMG_4717 from '@/assets/picture/index/image/IMG_4717.JPG';
import IMG_4716 from '@/assets/picture/index/image/IMG_4716.JPG';
import IMG_4714 from '@/assets/picture/index/image/IMG_4714.JPG';
import {ref} from "vue";

const mobile = isMobile()
const picList = [IMG_4714, IMG_3916, IMG_3962, IMG_3982, IMG_4116, IMG_4106, IMG_4112, IMG_4114, IMG_4117, IMG_4719, IMG_4717, IMG_4716];
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
    <el-col :sm="24" :md="13">
      <div class="pic">
        <el-image
            :class="{smallPic: index !== 0}"
            v-for="(pic, index) in picList"
            @click="view(index)"
            :src="pic"
            loading="lazy"
            fit="cover" />
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