<script setup>
import { ref } from 'vue';
import { DATA } from './wyzx.js'

const data = DATA;
const filteredData = ref(data);
</script>

<template>
  <div class="masonry">
    <div
        v-for="(item, index) in filteredData"
        :key="index"
        class="masonry-item"
    >
      <div class="card">
        <el-image :src="item.pic">
          <template #error>
            <el-image :src="item.pic.replace('lsky.remnants.cc','lskyv4.remnants.cc')">
            </el-image>
          </template>
        </el-image>
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
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/_masonry.scss';
</style>
