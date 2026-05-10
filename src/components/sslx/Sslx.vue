<script setup>
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue';
import { DATA } from './sslx.js';
import { isMobile } from "@/utils/MobileUtils";
import { Search, CircleClose } from '@element-plus/icons-vue';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const data = DATA;

// 搜索相关（放在前面，后面依赖它）
const searchFiltered = ref(data);  // 纯关键词过滤结果
const filteredData = ref(data);    // 关键词 + 年份过滤结果
const currPage = ref(filteredData.value.length);
const currData = ref(filteredData.value[currPage.value - 1]);
const keyword = ref('');
const mobile = isMobile();

// 年份 tab 相关
const selectedYear = ref('全部');

const yearTabs = computed(() => {
  const years = [...new Set(searchFiltered.value.map(item => item.year))].sort((a, b) => b - a);
  return ['全部', ...years];
});

// 如果选中的年份不在当前搜索结果里，自动切回全部
watch(searchFiltered, (newVal) => {
  const availableYears = new Set(newVal.map(item => item.year));
  if (!availableYears.has(selectedYear.value) && selectedYear.value !== '全部') {
    selectedYear.value = '全部';
    applyFilters();
  }
});

const selectYear = (year) => {
  selectedYear.value = year;
  applyFilters();
};

const applyFilters = () => {
  // 先按关键词过滤
  // 再按年份叠加过滤
  if (selectedYear.value === '全部') {
    filteredData.value = searchFiltered.value;
  } else {
    filteredData.value = searchFiltered.value.filter(item => item.year === selectedYear.value);
  }
  currentChange(filteredData.value.length);
};

const currentChange = (curr) => {
  currPage.value = curr;
  if (filteredData.value.length === 0) {
    currData.value = { year: '', subTitle: '' };
  } else {
    currData.value = filteredData.value[curr - 1];
  }
};

const filter = (key) => {
  keyword.value = key;
  if (keyword.value.length > 0) {
    const filtered = [];
    for (const item of data) {
      if (item.subTitle.toUpperCase().includes(keyword.value.toUpperCase())
          || item.year.toUpperCase().includes(keyword.value.toUpperCase())) {
        filtered.push(item);
      } else {
        const lists = item.lists.filter(
          subItem => subItem.content.toUpperCase().includes(keyword.value.toUpperCase())
                  || subItem.time.toUpperCase().includes(keyword.value.toUpperCase())
        );
        if (lists.length !== 0) {
          filtered.push({ year: item.year, subTitle: item.subTitle, lists });
        }
      }
    }
    searchFiltered.value = filtered;
  } else {
    searchFiltered.value = data;
  }
  applyFilters();
};

// Gitalk
const gitUser = ref('');
let timerId = null;

onMounted(() => {
  loadGitalk();
  nextTick(() => {
    timerId = setInterval(() => {
      const doms = document.getElementsByClassName('gt-user-name');
      for (const dom of doms) {
        gitUser.value = dom.innerText;
      }
    }, 500);
  });
});

onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});

const textarea = ref('');

const submit = async () => {
  try {
    const token = localStorage.getItem('GT_ACCESS_TOKEN');
    const headers = token ? { 'Authorization': `token ${token}` } : {};
    const response = await axios.post('https://blog.remnants.cc:2096/blog/sslx', { data: textarea.value }, { headers });
    if (response.data.status === 'fail') {
      throw new Error(response.data.message);
    }
    textarea.value = '';
    ElMessage({
      message: `✅ 提交成功，站点正在部署中，预计 2-3 分钟生效后刷新页面查看`,
      type: 'success',
    });
  } catch (error) {
    ElMessage({
      message: `提交失败：${error.message}`,
      type: 'error',
    });
  }
};

const loadGitalk = () => {
  const gitalk = new Gitalk({
    proxy: 'https://cors-server-bingjiaqins-projects.vercel.app/github_access_token',
    clientID: 'bd70159022856152eba3',
    clientSecret: '00c5f2aa482dab0cad6074e4d96ccae5def604a5',
    repo: 'bing16',
    owner: 'bingjiaqin',
    admin: ['bingjiaqin'],
    id: `sslx`,
    distractionFreeMode: false
  });
  gitalk.render('gitalk-container');
};
</script>

<template>
  <div class="content">
    <!-- 搜索 + 年份 tab -->
    <div class="top-bar">
      <el-input
        v-model="keyword"
        class="search-input"
        placeholder="搜索"
        @change="filter"
      >
        <template #suffix>
          <div class="suffix-icons">
            <el-icon v-if="keyword" class="clear-icon" @click="keyword = ''; filter('')"><CircleClose /></el-icon>
            <el-icon class="search-icon" @click="filter(keyword)"><Search /></el-icon>
          </div>
        </template>
      </el-input>
      <div class="year-tabs-row">
        <div class="year-tabs">
          <span
            v-for="year in yearTabs"
            :key="year"
            class="year-tab"
            :class="{ active: selectedYear === year }"
            @click="selectYear(year)"
          >
            {{ year }}
          </span>
        </div>
        <a href="sslx/History.html" target="_blank" rel="noopener noreferrer" class="more-link">more</a>
      </div>
      <div class="page-selector">
        <el-pagination
          :small="!!mobile"
          :page-size="1"
          :pager-count="mobile ? 2 : 11"
          :current-page="currPage"
          layout="prev, pager, next"
          :total="filteredData.length"
          @currentChange="currentChange"
        />
      </div>
    </div>

    <!-- 内容区 -->
    <div class="card-box">
      <h1 class="title">{{ currData.year }}</h1>
      <h2 class="title">{{ currData.subTitle }}</h2>
      <el-card
        class="box-card"
        shadow="hover"
        v-for="item in currData.lists"
        :key="item.time"
      >
        <div>
          <el-image
            v-if="item.pic"
            :src="item.pic"
            :title="item.title"
            style="padding-left: 2em; width: 300px"
            fit="contain"
          />
        </div>
        <div v-html="item.content"></div>
        <div class="time-box">
          <div>{{ item.time }}</div>
        </div>
      </el-card>
    </div>

    <!-- 分页 -->
    <div class="pagination-box">
      <el-pagination
        :small="!!mobile"
        class="pagination-bottom"
        :page-size="1"
        :pager-count="mobile ? 2 : 11"
        :current-page="currPage"
        layout="prev, pager, next"
        :total="filteredData.length"
        @currentChange="currentChange"
      />
    </div>

    <!-- 站长工具 -->
    <div v-if="gitUser === 'bingjiaqin'">
      <el-divider />
      <h3>站长工具：添加内容</h3>
      <div style="padding: 10px 0;">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入需要添加的内容"
          v-model="textarea"
        />
      </div>
      <div style="padding-bottom: 10px; width: 100%; text-align: right;">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>

    <el-divider />
    <div id="gitalk-container"></div>
  </div>
</template>

<style scoped>
.content {
  padding: 100px 60px;
}

.top-bar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
}

.search-input {
  width: 200px;
}

.year-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.year-tabs-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.year-tab {
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 2px;
  font-size: 14px;
  color: var(--color-text);
  opacity: 0.6;
  transition: all 0.2s;
}

.year-tab:hover {
  opacity: 0.85;
}

.year-tab.active {
  background: var(--color-primary);
  color: #fff;
  opacity: 1;
}

.title {
  margin-top: 20px;
  margin-bottom: 20px;
}

.card-box {
  width: 100%;
  margin-bottom: 60px;
}

.box-card {
  margin-top: 10px;
  margin-bottom: 10px;
}

.time-box {
  width: 100%;
  text-align: right;
  margin-top: 10px;
}

.pagination-box {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  min-height: 60px;
}

.page-selector {
  display: flex;
  justify-content: flex-end;
}

.more-link {
  color: var(--color-primary);
  font-size: 14px;
  text-decoration: none;
}

.more-link:hover {
  opacity: 0.75;
}

.el-card {
  border: 0;
  border-radius: 1px;
}

.suffix-icons {
  display: flex;
  align-items: center;
  gap: 4px;
}

.search-icon {
  cursor: pointer;
  color: #999;
}

.clear-icon {
  cursor: pointer;
  color: #999;
}

.clear-icon:hover {
  color: #666;
}

:deep(.el-input__wrapper) {
  height: 23px;
}
</style>