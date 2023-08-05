<script setup>
import { ref } from 'vue'
import { DATA } from './sslx.js'

const data = DATA;
const currPage = ref(data.length);
const currData = ref(data[currPage.value - 1]);

const currentChange = (curr) => {
  currPage.value = curr;
  currData.value = data[curr - 1];
}
</script>
<template>
  <div class="pagination-box">
    <el-pagination
        class="pagination-top"
        :page-size="1"
        :pager-count="data.length"
        :current-page="currPage"
        layout="prev, pager, next, jumper"
        :total="data.length"
        @currentChange="currentChange"
    />
  </div>
  <div class="card-box">
    <h1 class="title">{{ currData.year }}</h1>
    <h2 class="title">{{ currData.subTitle }}</h2>
    <el-card
        class="box-card"
        shadow="hover"
        v-for="item in currData.lists"
    >
      <div v-html="item.content"></div>
      <div class="time-box">
        <div>{{ item.time }}</div>
      </div>
    </el-card>
  </div>
  <div class="pagination-box">
    <el-pagination
        class="pagination-bottom"
        :page-size="1"
        :pager-count="data.length"
        :current-page="currPage"
        layout="prev, pager, next, jumper"
        :total="data.length"
        @currentChange="currentChange"
    />
  </div>
</template>

<style scoped>
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.pagination-box {
  width: 100%;
  text-align: right;
}
.pagination-top {
  position: absolute;
  right: 0;
  margin-bottom: 30px;
}
.pagination-bottom {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-bottom: 30px;
}
.card-box {
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;
}
.box-card {
  margin-top: 10px;
  margin-bottom: 10px;
}
.time-box {
  width: 100%;
  text-align: right;
  margin-top: 10px;
}
.el-card {
  border: 0;
}
</style>