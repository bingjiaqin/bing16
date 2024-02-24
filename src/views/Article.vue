<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import TopBar from "@/components/topbar/TopBar.vue";
import FooterBar from "@/components/footer/FooterBar.vue";
import { isMobile } from '@/utils/MobileUtils';

const markdown = ref('## 404 Not Fount');
const root = ref('notFound');
const mobile = isMobile()
 
 // 动态导入txt文件内容
 async function loadTxtFile() {
    const { path, query, params } = useRoute();
    const filePath = `/public/${path}.md`;
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to load the file');
        markdown.value = await response.text();
    } catch (error) {
        console.log(`Error loading the text file: ${error}`);
    }
    const rootStart = path.indexOf('/', 1);
    root.value = path.substring(rootStart, path.indexOf('/', rootStart + 1))
 }

 loadTxtFile();
 
</script>

<template>

  <div class="common-layout">
      <el-header>
        <top-bar :backTo="root">
        </top-bar>
      </el-header>
      <el-backtop v-if="!mobile" :right="100" :bottom="100" />
      <el-main class="mainPage">
          <div class="article">
              <v-md-editor :model-value="markdown" mode="preview"></v-md-editor>
          </div>
      </el-main>
      <el-footer>
        <footer-bar></footer-bar>
      </el-footer>
  </div>
</template>

<style scoped>
.common-layout {
  position:absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .article {
    max-width: 850px;
    margin: auto;
    padding: 0 2rem;
    
    :deep(.vuepress-markdown-body) {
      background-color: var(--color-background);
      color: var(--color-text);
    }
  }
}
</style>
