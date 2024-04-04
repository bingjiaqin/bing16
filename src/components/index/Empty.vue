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
      <div class="pic" style="text-align: center;">
        <h1>你好，欣喜相逢</h1>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.empty {
  width: 100%;
  text-align: center;
  z-index: 0;
}
.pic {
  position: relative;
  width: 100%;
  top:calc(40%);
  transform: translateY(-50%);
}
h1 {
  padding-bottom: 10px;
}
div {
  padding-top: 10px;
}
</style>