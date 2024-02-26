<script setup>
import { onMounted, ref } from 'vue';
import { DATA } from './sslx.js';
import { isMobile } from "@/utils/MobileUtils";
import { Search } from '@element-plus/icons-vue';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';

const data = DATA;
const filteredData = ref(data);
const currPage = ref(filteredData.value.length);
const currData = ref(filteredData.value[currPage.value - 1]);
const keyword = ref('');
const mobile = isMobile()

const currentChange = (curr) => {
  currPage.value = curr;
  if (filteredData.value.length === 0) {
    currData.value = {
      year: '',
      subTitle: '',
    };
  } else {
    currData.value = filteredData.value[curr - 1];
  }
}

const filter = (key) => {
  keyword.value = key;
  if (keyword.value.length > 0) {
    const filtered = [];
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (item.subTitle.toUpperCase().includes(keyword.value.toUpperCase())
          || item.year.toUpperCase().includes(keyword.value.toUpperCase())) {
        filtered.push(item);
      } else {
        const lists = []
        for (let j = 0; j < item.lists.length; j++) {
          const subItem = item.lists[j]
          if (subItem.content.toUpperCase().includes(keyword.value.toUpperCase())
              || subItem.time.toUpperCase().includes(keyword.value.toUpperCase())) {
            lists.push(subItem)
          }
        }
        if (lists.length !== 0) {
          const newItem = {}
          newItem['year'] = item.year
          newItem['subTitle'] = item.subTitle
          newItem['lists'] = lists
          filtered.push(newItem);
        }
      }
    }
    filteredData.value = filtered;
  } else {
    filteredData.value = data;
  }
  currentChange(filteredData.value.length);
}

onMounted(() => {
  for (let elements of document.getElementsByClassName("el-pagination__goto")) {
    elements.childNodes[0].nodeValue = "";
  }
  loadGitalk();
});

const loadGitalk = () => {
  const gitalk = new Gitalk({
    proxy: 'https://cors-server-bingjiaqins-projects.vercel.app/github_access_token',
    clientID: 'bd70159022856152eba3',
    clientSecret: '00c5f2aa482dab0cad6074e4d96ccae5def604a5',
    repo: 'bing16',      // The repository of store comments,
    owner: 'bingjiaqin',
    admin: ['bingjiaqin'],
    id: `sslx`,      // Ensure uniqueness and length less than 50
    distractionFreeMode: false  // Facebook-like distraction free mode
  });
  gitalk.render('gitalk-container');
}

</script>
<template>
  <div class="content">
    <div class="pagination-box">
      <el-row>
        <el-col :sm="24" :md="12" class="search">
          <el-input
              v-model="keyword"
              class="w-50 m-2"
              placeholder="搜索"
              :suffix-icon="Search"
              @change="filter"
          />
        </el-col>
        <el-col :sm="24" :md="12">
          <el-pagination
              :small="!!mobile"
              class="pagination-top"
              :page-size="1"
              :pager-count="mobile ? 5 : 11"
              :current-page="currPage"
              layout="prev, pager, next, jumper"
              :total="filteredData.length"
              @currentChange="currentChange"
          />
        </el-col>
      </el-row>
    </div>
    <div class="card-box">
      <h1 class="title">{{ currData.year }}</h1>
      <h2 class="title">{{ currData.subTitle }}</h2>
      <el-card
          class="box-card"
          shadow="hover"
          v-for="item in currData.lists"
      >
        <div>
          <el-image
              v-if="item.pic"
              :src="item.pic"
              :title="item.title"
              style="padding-left: 2em; width: 300px"
              fit="contain"/></div>
        <div v-html="item.content"></div>
        <div class="time-box">
          <div>{{ item.time }}</div>
        </div>
      </el-card>
    </div>
    <div class="pagination-box">
      <el-row>
        <el-col :xs="24" :sm="22">
          <el-pagination
              :small="!!mobile"
              class="pagination-bottom"
              :page-size="1"
              :pager-count="mobile ? 5 : 11"
              :current-page="currPage"
              layout="prev, pager, next, jumper"
              :total="filteredData.length"
              @currentChange="currentChange"
          />
        </el-col>
        <el-col :xs="24" :sm="2">
          <a href="sslx/History.html">
            more
          </a>
        </el-col>
      </el-row>
    </div>
    <el-divider />
    <div id="gitalk-container"></div>
  </div>
</template>

<style scoped>
.content {
  padding: 0 60px;
}
.search {
  margin-bottom: 20px;
}
.title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.pagination-box {
  width: 100%;
  text-align: right;
  min-height: 90px;
  overflow-x: hidden;
}
.pagination-top {
  position: absolute;
  right: 0;
  margin-bottom: 30px;
}
.card-box {
  width: 100%;;
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
.el-card {
  border: 0;
  border-radius: 20px;
}
</style>