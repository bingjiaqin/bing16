<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import TopBar from "@/components/topbar/TopBar.vue";
import FooterBar from "@/components/footer/FooterBar.vue";
import { isMobile } from '@/utils/MobileUtils';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';

const markdown = ref('');
const root = ref('notFound');
const mobile = isMobile()

 const previewRef = ref();

 const handleAnchorClick = (anchor:any) => {
  const { lineIndex } = anchor;
  const heading = previewRef.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
  if (heading) {
    const layout = document.querySelector('.common-layout');
    if (layout) {
      layout.scrollTo({
        top: heading.offsetTop - 5,
        behavior: 'smooth'
      });
    }
  }
};


const titles = ref();

const updateTitiles = () => {
  nextTick(() => {
    const anchors = previewRef.value.$el.querySelectorAll('h2,h3,h4,h5');
    titles.value = Array.from(anchors).filter((title:any) => !!title.innerText.trim());
    if (!titles.value.length) {
      titles.value = [];
      return;
    }
    const hTags = Array.from(new Set(titles.value.map((title) => title.tagName))).sort();

    titles.value = titles.value.map((el:any) => ({
      title: `· ${el.innerText}`,
      lineIndex: el.getAttribute('data-v-md-line') || el.getAttribute('data-line'),
      indent: hTags.indexOf(el.tagName),
    }));
  });
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
        const gitalk = new Gitalk({
          proxy: 'https://cors-server-bingjiaqins-projects.vercel.app/github_access_token',
          clientID: 'bd70159022856152eba3',
          clientSecret: '00c5f2aa482dab0cad6074e4d96ccae5def604a5',
          repo: 'bing16',      // The repository of store comments,
          owner: 'bingjiaqin',
          admin: ['bingjiaqin'],
          id: filePath,      // Ensure uniqueness and length less than 50
          distractionFreeMode: false  // Facebook-like distraction free mode
        });
        gitalk.render('gitalk-container');
    } catch (error) {
        console.log(`Error loading the text file: ${error}`);
        markdown.value = '## 404 Not Fount';
        root.value = 'notFound';
    }
 }

loadTxtFile();

 const showDir = ref(false);
</script>

<template>

  <div class="common-layout">
      <el-header>
        <top-bar :backTo="root">
        </top-bar>
      </el-header>
      <el-backtop :right="mobile ? 10 : 100" :bottom="100" 
      target=".common-layout"
    />
      <el-main class="mainPage">
        <div class="article">
          <div class="directory"
            @click="showDir=!showDir"
            :style="{ right: mobile ? '10px' : '40px', bottom: mobile ? '40px' : '100px',
             'background-color': showDir ? '#fffaf9' : ''}">
            <el-icon style="color: var(--el-color-primary);"><Memo /></el-icon>
          </div>
          <div class="directory-box"
            v-show="showDir"
            :style="{ right: mobile ? '10px' : '40px',  bottom: mobile ? '96px' : '156px'}">
            <div
              v-for="anchor in titles"
              class="directory-item"
              :style="{ padding: '6px 16px 6px ' + (anchor.indent * 14 + 16) + 'px', fontSize: '14px' }"
              @click="handleAnchorClick(anchor)"
              >
              <a style="cursor: pointer">{{ anchor.title }}</a>
            </div>
          </div>
          <!-- <el-popover
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
                :style="{ paddingLeft: `${anchor.indent * 14}px`, fontSize: '14px' }"
                @click="handleAnchorClick(anchor)"
                >
                <a style="cursor: pointer">{{ anchor.title }}</a>
              </div>
            </el-popover> -->
          <v-md-editor :model-value="markdown" mode="preview" ref="previewRef"></v-md-editor>
          <el-divider />
          <div id="gitalk-container"></div>
        </div>
      </el-main>
      <el-footer>
        <footer-bar></footer-bar>
      </el-footer>
  </div>
</template>

<style scoped>
.el-main {
  overflow: visible;
}

.common-layout {
  position:absolute;
  overflow-y: auto;
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
      background: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 999;
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      color: var(--color-text);
    }

    .directory:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      transform: scale(1.1);
      box-shadow: 0 0 8px rgba(234, 88, 87, 0.25);
    }

    .directory-box {
      position: fixed;
      z-index: 998;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 12px 0;
      border-radius: 12px;
      width: 280px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
    }

    .directory-item {
      cursor: pointer;
      transition: background 150ms ease;
    }

    .directory-item a {
      color: rgba(255, 255, 255, 0.85);
      display: block;
    }

    .directory-item:hover {
      background: rgba(234, 88, 87, 0.5);
    }

    .directory-item:hover a {
      color: #fff;
    }
  }
}
</style>
