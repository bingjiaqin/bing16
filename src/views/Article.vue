<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import TopBar from "@/components/topbar/TopBar.vue";
import FooterBar from "@/components/footer/FooterBar.vue";
import { isMobile } from '@/utils/MobileUtils';

const markdown = ref('');
const root = ref('notFound');
const mobile = isMobile()

 const previewRef = ref();

 const handleAnchorClick = (anchor:any) => {
  const { lineIndex } = anchor;

  const heading = previewRef.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

  if (heading) {
    window.scrollTo({
      top: heading.offsetTop,
      behavior: 'smooth'
    });
  }
};


const titles = ref();

const updateTitiles = () => {
  const anchors = previewRef.value.$el.querySelectorAll('h2,h3,h4,h5');
  debugger
  titles.value = Array.from(anchors).filter((title:any) => !!title.innerText.trim());
  if (!titles.value.length) {
    titles.value = [];
    return;
  }
  const hTags = Array.from(new Set(titles.value.map((title) => title.tagName))).sort();

  titles.value = titles.value.map((el:any) => ({
    title: `· ${el.innerText}`,
    lineIndex: el.getAttribute('data-v-md-line'),
    indent: hTags.indexOf(el.tagName),
  }));
}

onMounted(() => updateTitiles());

 // 动态导入txt文件内容
 async function loadTxtFile() {
    const { path, query, params } = useRoute();
    const filePath = `${path}.md`;
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error('Failed to load the file');
        markdown.value = await response.text();
        const rootStart = path.indexOf('/', 1);
        root.value = path.substring(rootStart, path.indexOf('/', rootStart + 1));
        await nextTick();
        updateTitiles();
    } catch (error) {
        console.log(`Error loading the text file: ${error}`);
        markdown.value = '## 404 Not Fount';
        root.value = 'notFound';
    }
 }

 loadTxtFile();
 
</script>

<template>

  <div class="common-layout">
      <el-header>
        <top-bar :backTo="root">
        </top-bar>
      </el-header>
      <el-backtop :right="mobile ? 10 : 100" :bottom="100" />
      <el-main class="mainPage">
        <div class="article">
          <el-popover
              placement="top"
              :width="250"
              style="right: 200px"
              trigger="click"
            >
              <template #reference>
                <div class="directory"
                 :style="{ right: mobile ? '10px' : '40px',  bottom: mobile ? '40px' : '100px'}">
                  <el-icon style="color: var(--el-color-primary);"><Memo /></el-icon>
                </div>
              </template>
              <div
                v-for="anchor in titles"
                :style="{ padding: `2px 0 2px ${anchor.indent * 14}px`, fontSize: '14px' }"
                @click="handleAnchorClick(anchor)"
                >
                <a style="cursor: pointer">{{ anchor.title }}</a>
              </div>
            </el-popover>
          <v-md-editor :model-value="markdown" mode="preview" ref="previewRef"></v-md-editor>
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

    .directory {
      position: fixed;
      width: 40px;
      height: 40px;
      background-color: #fff;
      border-radius: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 999;
      box-shadow: var(--el-box-shadow-lighter);
    }

    .directory:hover {
      background-color: #fffaf9;
    }
  }
}
</style>
