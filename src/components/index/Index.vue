<script setup>
import { PIC_LIST } from "@/components/index/PicConfig";

</script>

<template>
  <el-row class="main-row">
    <el-col :sm="24" :md="12">
      <div class="main-col main-text">
        <h1>你好，欣喜相逢</h1>
        <p><span class="divcss5-x2-r">我就是我</span>。</p>
        <p>这里是我的个人网站，会有一些个人的
          <span class="divcss5-x2-b">项目记录</span>
          以及比较
          <span class="divcss5-x2-y">个人的随感</span>。
        </p>
        <p>如果你从别的地方找到这里，
          <span class="divcss5-x2-r" @click="showMessage">
            欢迎联系我
          </span>。
        </p>
      </div>
    </el-col>
    <el-col :sm="24" :md="12">
      <div class="main-col">
        <el-carousel height="450px" indicator-position="outside" arrow="never" interval="6000">
          <el-carousel-item v-for="(item, index) in PIC_LIST" :key="index">
            <el-image
                :src="item.src"
                :key="index"
                :title="item.title"
                class="pic"
                fit="contain"/>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.main-row {
  min-height: 450px;
}
.main-col {
  position: relative;
  top:50%;
  transform: translateY(-50%);
  margin-bottom: 20px;
}
.main-text {
  position: relative;
  top:calc(50%);
  transform: translateY(-50%)
}
.pic {
  height: 450px;
}
</style>