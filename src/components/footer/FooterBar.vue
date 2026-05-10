<script setup>

</script>

<template>
  <div class="footer">
    © 2018-2024 <a href="https://remnants.cc">Bing16.</a> All rights reserved.
    <a target="_blank" rel="noopener noreferrer" title="51la网站统计" href="https://v6.51.la/land/KAB7DS6mDtzdJLC4">
      <img src="https://sdk.51.la/icon/2-2.png" style="height: 13px" alt="51la网站统计">
    </a>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  padding: 40px 60px 20px;
  text-align: right;
  z-index: 99;
  font-size: 13px;
  color: var(--el-text-color-secondary, #999);

  &:hover {
    opacity: 0.7;
  }

  a {
    color: inherit;
    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>