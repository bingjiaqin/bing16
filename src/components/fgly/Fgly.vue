<script setup>
import { ref } from 'vue';
import { DATA } from './fgly.js'

const data = DATA;
const filteredData = ref(data.itmes);
</script>

<template>
  <div class="content">
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
        <div class="card" :body-style="{ padding: '0px' }">
          <div style="padding: 14px">
            <h3 style="margin-bottom: 20px;">{{ item.title }}</h3>
            <div class="bottom" style="margin-bottom: 20px;">
              <time class="time">{{ item.intro }}</time>
            </div>
            <div style="margin-bottom: 20px;">[{{ item.group }}]</div>
            <div v-if="item.type==='md'">
              <router-link :to="{ path: `/article/${item.href}` }" target="_blank">查看</router-link>
            </div>
            <div v-else>
              <a :href="item.href" target="_blank">查看</a>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
@import '../../styles/_card.scss';

.content {
  padding: 100px 60px;
}
.el-col {
  padding-top: 30px;
}
.card {
  border-radius: 8px;
}
</style>