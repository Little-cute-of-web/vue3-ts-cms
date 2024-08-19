<template>
  <div class="nav-header">
    <el-icon class="fold-menu" @click="handleFoldClick">
      <Component :is="isFold ? 'expand' : 'fold'"></Component>
    </el-icon>
    <div class="content">
      <div>面包屑</div>
      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import UserInfo from './user-info.vue';

const emits = defineEmits(['foldChange']);
let isFold = ref(false);
const handleFoldClick = () => {
  isFold.value = !isFold.value;
  emits('foldChange', isFold.value);
};
defineExpose({
  isFold,
  handleFoldClick,
});
</script>
<style lang="less" scoped>
.nav-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-items: center;
  align-items: center;
  justify-content: space-between;
  .fold-menu {
    display: flex;
  }
  .content {
    padding-left: 20px;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-items: center;
    align-items: center;
    justify-content: space-between;
  }
  .header-center {
    padding: 0 15px;
    box-sizing: border-box;
    flex: 1;
  }
  .header-infobox {
    display: flex;
  }
}
</style>
