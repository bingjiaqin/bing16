<script setup>
import {ref} from "vue";

const index = ref(0);
const showViewer = ref(false);

const view = (idx) => {
  index.value = idx;
  showViewer.value = true;
}

defineProps({
  bgColor:{
    type: String,
    default: ''
  },
  color:{
    type: String,
    default: ''
  }
})
</script>

<template>
  <el-row class="empty">
    <el-col :span="24">
      <div class="text" style="text-align: center;">
        <h1>你好，欣喜相逢</h1>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.empty {
  width: 100%;
}
.text {
  position: relative;
  width: 100%;
  height: calc(100vh - 120px);
  background-color: var(--color-background);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  padding-bottom: 10px;
}
div {
  padding-top: 0;
}
</style>