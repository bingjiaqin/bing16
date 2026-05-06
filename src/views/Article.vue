<script lang="ts" setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import TopBar from "@/components/topbar/TopBar.vue";
import { Top } from '@element-plus/icons-vue';
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

onMounted(() => {
   updateTitiles();
   document.addEventListener('click', closeDir);
   document.addEventListener('mousemove', onDocMouseMove);
 });

 onUnmounted(() => {
   document.removeEventListener('click', closeDir);
   document.removeEventListener('mousemove', onDocMouseMove);
 });

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

 let dirTimer: ReturnType<typeof setTimeout> | null = null;

 // 动态计算hover梯形多边形顶点(viewport坐标)
 const getHoverZonePolygon = (): number[][] => {
   const btn = document.querySelector('.directory') as HTMLElement;
   const box = document.querySelector('.directory-box') as HTMLElement;
   if (!btn || !box) return [];

   const btnRect = btn.getBoundingClientRect();
   const boxRect = box.getBoundingClientRect();

   // 梯形: 按钮顶边 -> 卡片顶边(两腰向内收)
   // 左腰: 按钮左上 -> 卡片左上
   // 右腰: 按钮右上 -> 卡片右上
   const polygon = [
     [boxRect.left, boxRect.top],           // 卡左上
     [boxRect.right, boxRect.top],          // 卡右上
     [btnRect.right, btnRect.top],          // 按钮右上(顶边中点偏右)
     [btnRect.left + btnRect.width * 0.3, btnRect.top],  // 按钮顶边向内一点
     [btnRect.left + btnRect.width * 0.3, btnRect.bottom], // 按钮左上向内
     [btnRect.left, btnRect.bottom],         // 按钮左下
     [boxRect.left, boxRect.bottom],        // 卡左下
   ];
   return polygon;
 };

 const isInHoverZone = (e: MouseEvent) => {
   if (!showDir.value) return false;
   const polygon = getHoverZonePolygon();
   if (!polygon.length) return false;
   return isPointInPolygon(e.clientX, e.clientY, polygon);
 };

 const isPointInPolygon = (x: number, y: number, polygon: number[][]): boolean => {
   let inside = false;
   for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
     const xi = polygon[i][0], yi = polygon[i][1];
     const xj = polygon[j][0], yj = polygon[j][1];
     const intersect = ((yi > y) !== (yj > y)) &&
       (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
     if (intersect) inside = !inside;
   }
   return inside;
 };

 const onDocMouseMove = (e: MouseEvent) => {
   if (!showDir.value) return;
   if (isInHoverZone(e)) {
     if (dirTimer) { clearTimeout(dirTimer); dirTimer = null; }
   } else {
     if (!dirTimer) dirTimer = setTimeout(() => { showDir.value = false; }, 150);
   }
 };

 const closeDir = (e: MouseEvent) => {
   const btn = document.querySelector('.directory');
   const box = document.querySelector('.directory-box');
   if (btn && btn.contains(e.target as Node)) return;
   if (box && box.contains(e.target as Node)) return;
   showDir.value = false;
 };

 const scrollToTop = () => {
   const layout = document.querySelector('.common-layout');
   if (layout) layout.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const showDir = ref(false);
</script>

<template>

  <div class="common-layout">
      <el-header>
        <top-bar :backTo="root">
        </top-bar>
      </el-header>
      <div class="backtop-btn"
        :style="{ right: mobile ? '10px' : '40px', bottom: mobile ? '40px' : '100px' }"
        @click="scrollToTop">
        <el-icon style="color: var(--color-text);"><Top /></el-icon>
      </div>
      <el-main class="mainPage">
        <div class="article">
          <div class="directory"
            @click="showDir=!showDir"
            :style="{ right: mobile ? '10px' : '40px', bottom: mobile ? '40px' : '100px',
             'background-color': showDir ? '#fffaf9' : ''}">
            <el-icon style="color: var(--el-color-primary);"><Memo /></el-icon>
          </div>
          <div class="directory-box"
            :class="{ 'is-visible': showDir }"
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

  display: flex;
  flex-direction: column;
}

.el-main {
  overflow: visible;
  flex: 1;
}

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
      transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
      color: var(--color-text);
    }

    .directory:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      transform: scale(1.12);
      box-shadow: 0 0 16px rgba(234, 88, 87, 0.3);
    }

    .backtop-btn {
      position: fixed;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid var(--color-border);
      background: var(--color-background);
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 250ms cubic-bezier(0.34, 1.56, 0.64, 1);
      z-index: 998;
      color: var(--color-text);
    }

    .backtop-btn:hover {
      border-color: var(--color-primary);
      color: var(--color-primary);
      transform: scale(1.12);
      box-shadow: 0 0 16px rgba(234, 88, 87, 0.3);
    }

    .backtop-btn:active {
      transform: scale(0.95);
      transition-duration: 80ms;
    }

    .directory:active {
      transform: scale(0.95);
      transition-duration: 80ms;
    }



    .directory-box {
      position: fixed;
      z-index: 998;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      padding: 12px 0;
      border-radius: 16px;
      width: 280px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.08);
      opacity: 0;
      transform: translateY(8px) scale(0.97);
      transform-origin: bottom right;
      pointer-events: none;
      transition: opacity 280ms cubic-bezier(0.4, 0, 0.2, 1),
                  transform 280ms cubic-bezier(0.34, 1.2, 0.64, 1),
                  backdrop-filter 280ms ease,
                  box-shadow 280ms ease;
    }

    .directory-box.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .directory-item {
      cursor: pointer;
      transition: background 200ms ease, transform 150ms ease;
      transform: translateX(0);
    }

    .directory-item a {
      color: rgba(255, 255, 255, 0.85);
      display: block;
      transition: color 150ms ease;
    }

    .directory-item:hover {
      background: rgba(234, 88, 87, 0.45);
      transform: translateX(2px);
    }

    .directory-item:hover a {
      color: #fff;
    }
  }
</style>
