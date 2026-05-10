import { ref, computed, onMounted, onUnmounted } from 'vue';

/**
 * Masonry 瀑布流布局 composable
 * @param {() => any[]} getData - 获取数据的函数
 * @param {(width: number) => number} getColumnCount - 根据视口宽度返回列数
 */
export function useMasonry(getData, getColumnCount) {
  const columnCount = ref(getColumnCount(window.innerWidth));

  const onResize = () => {
    columnCount.value = getColumnCount(window.innerWidth);
  };

  onMounted(() => window.addEventListener('resize', onResize));
  onUnmounted(() => window.removeEventListener('resize', onResize));

  const columns = computed(() => {
    const cols = Array.from({ length: columnCount.value }, () => []);
    getData().forEach((item, index) => {
      cols[index % columnCount.value].push(item);
    });
    return cols;
  });

  return { columns, columnCount };
}