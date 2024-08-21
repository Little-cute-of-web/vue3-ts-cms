<template>
  <div class="user">
    <PageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></PageSearch>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import PageSearch from '@/components/page-search/src/page-search.vue';
import { searchFormConfig } from './config/search.config';

const resetBtnClick = () => {
  console.log('重置按钮点击');
};
const queryBtnClick = (formData: any) => {
  console.log('查询按钮点击', formData);
};
</script>
<style lang="less" scoped></style>
