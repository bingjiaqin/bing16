<script setup>
import { ref } from 'vue';
import { DATA } from './wyzx.js'

const data = DATA;
const filteredData = ref(data);
</script>

<template>
  <el-row :gutter="20">
    <el-col
        v-for="(item, index) in filteredData"
        :key="index"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        style="text-align: center; margin-bottom: 20px"
    >
      <el-card :body-style="{ padding: '0px' }">
        <el-image :src="item.pic"/>
        <div style="padding: 14px">
          <h3>{{ item.title }}</h3>
          <div class="bottom">
            <time class="time">{{ item.intro }}</time>
          </div>
          <div>
            <a :href="item.href" target="_blank">查看</a>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-card {
  border-radius: 20px;
}
</style>