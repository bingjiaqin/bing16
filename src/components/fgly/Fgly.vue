<script setup>
import { ref } from 'vue';
import { DATA } from './fgly.js'

const data = DATA;
const filteredData = ref(data.itmes);
</script>

<template>
  <div class="masonry">
    <div
        v-for="(item, index) in filteredData"
        :key="index"
        class="masonry-item"
    >
      <div class="card">
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
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/_masonry.scss';
</style>