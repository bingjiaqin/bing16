<script setup>
import {isMobile} from "@/utils/MobileUtils";
import IMG_1166 from '@/assets/picture/index/image/IMG_1166.JPG';
import P30102 from '@/assets/picture/index/image/P30102.JPG';
import IMG_2150 from '@/assets/picture/index/image/IMG_2150.JPG';
import IMG_2169 from '@/assets/picture/index/image/IMG_2169.JPG';
import IMG_2355 from '@/assets/picture/index/image/IMG_2355.JPG';
import IMG_2366 from '@/assets/picture/index/image/IMG_2366.JPG';
import IMG_2372 from '@/assets/picture/index/image/IMG_2372.JPG';
import IMG_2439 from '@/assets/picture/index/image/IMG_2439.JPG';
import IMG_2615 from '@/assets/picture/index/image/IMG_2615.JPG';
import IMG_2618 from '@/assets/picture/index/image/IMG_2618.JPG';
import IMG_2626 from '@/assets/picture/index/image/IMG_2626.JPG';
import IMG_2674 from '@/assets/picture/index/image/IMG_2674.JPG';
import IMG_2721 from '@/assets/picture/index/image/IMG_2721.JPG';
import IMG_2722 from '@/assets/picture/index/image/IMG_2722.JPG';

const mobile = isMobile()
const picList = [IMG_1166, P30102, IMG_2150, IMG_2169,
  IMG_2355, IMG_2366, IMG_2372, IMG_2439, IMG_2615, IMG_2618,
  IMG_2626, IMG_2674, IMG_2721, IMG_2722];
</script>

<template>
  <el-row class="look-for">
    <el-col :sm="0" :md="1">
    </el-col>
    <el-col :sm="24" :md="13">
      <div class="pic">
        <el-image
            :class="{smallPic: index !== 0}"
            v-for="(pic, index) in picList"
            :preview-src-list="picList"
            :initial-index="index"
            :src="pic" fit="cover" />
      </div>
    </el-col>
    <el-col :sm="24" :md="10">
      <div class="text">
        <h1>寻觅 · 什么是永恒与唯一</h1>
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
  background-color: #000000;
  color: #ffffff;
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
  color: #ffffff;
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