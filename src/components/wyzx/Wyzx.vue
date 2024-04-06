<script setup>
import { ref } from 'vue';
import { DATA } from './wyzx.js'

const data = DATA;
const filteredData = ref(data);
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
          <el-image :src="item.pic"/>
          <div style="padding: 14px">
            <h3>{{ item.title }}</h3>
            <div class="bottom">
              <time class="time">{{ item.intro }}</time>
            </div>
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
.content {
  padding: 100px 60px;
}
.el-col {
  padding-top: 30px;
}
.card {
  border: 0;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 6px 6px 9px var(--color-shadow),
             -6px -6px 9px var(--color-light);
  transition: all 100ms linear;
}
.card:hover {
  transform: scale(1.02);
  transition: all 100ms linear;
  box-shadow: 10px 10px 20px var(--color-shadow),
             -3px -3px 12px var(--color-light);
}
</style>