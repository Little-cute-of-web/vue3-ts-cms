<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separatot="/">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="item.url">{{ item.name }} </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { IBreadcrumb } from '../type';

interface Props {
  breadcrumb: IBreadcrumb[];
}
const props = withDefaults(defineProps<Props>(), {
  breadcrumb: () => [],
});
</script>
<style lang="less" scoped></style>
