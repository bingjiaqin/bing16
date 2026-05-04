<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { DATA } from './fgly.js'

const data = DATA.itmes;

// 响应式列数
const getColumnCount = () => {
  const w = window.innerWidth;
  if (w > 1400) return 5;
  if (w > 1100) return 4;
  if (w > 768) return 3;
  if (w > 480) return 2;
  return 1;
};

const columnCount = ref(getColumnCount());

const onResize = () => {
  columnCount.value = getColumnCount();
};

onMounted(() => window.addEventListener('resize', onResize));
onUnmounted(() => window.removeEventListener('resize', onResize));

// 按 round-robin 分配数据到各列
const columns = computed(() => {
  const cols = [];
  const count = columnCount.value;
  for (let i = 0; i < count; i++) {
    cols.push([]);
  }
  data.forEach((item, index) => {
    cols[index % count].push(item);
  });
  return cols;
});
</script>

<template>
  <div class="masonry">
    <div
        v-for="(col, colIndex) in columns"
        :key="colIndex"
        class="masonry-col"
    >
      <div
          v-for="(item, index) in col"
          :key="colIndex + '-' + index"
          class="card"
      >
        <div class="card-body">
          <h3 class="card-title">{{ item.title }}</h3>
          <div class="bottom">
            <time class="time">{{ item.intro }}</time>
          </div>
          <div class="card-group">[{{ item.group }}]</div>
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
