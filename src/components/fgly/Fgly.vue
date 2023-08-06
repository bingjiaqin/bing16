<script setup>
import { ref } from 'vue';
import { DATA } from './fgly.js'

const data = DATA;
const filteredData = ref(data.itmes);
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
        <div style="padding: 14px">
          <h3 style="margin-bottom: 20px;">{{ item.title }}</h3>
          <div class="bottom" style="margin-bottom: 20px;">
            <time class="time">{{ item.intro }}</time>
          </div>
          <div style="margin-bottom: 20px;">[{{ item.type }}]</div>
          <div>
            <a :href="item.href" target="_blank">查看</a>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>