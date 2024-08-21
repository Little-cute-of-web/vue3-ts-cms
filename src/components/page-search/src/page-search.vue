<template>
  <div class="page-search">
    <ghm-form v-model="formData" v-bind="searchFormConfig">
      <template #footer>
        <div class="hanlde-btns">
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </div>
      </template>
    </ghm-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import GhmForm from '@/base-ui/form/src/GhmForm.vue';
import { searchFormConfig } from '@/views/main/system/user/config/search.config';

const emit = defineEmits<{
  (e: 'resetBtnClick'): void;
  (e: 'queryBtnClick', newFormData: any): void;
}>();
interface Props {
  searchFormConfig: any;
}
const props = withDefaults(defineProps<Props>(), {
  searchFormConfig: () => ({}),
});
const formItems = props.searchFormConfig?.formItems ?? [];
// const formOriginData: any = reactive({
//   name: null,
//   enable: null,
// });
const formOriginData: any = {};
// 清空初始值
for (const item of formItems) {
  formOriginData[item.field] = '';
}
const formData = ref(formOriginData);
// 点击重置
const handleResetClick = () => {
  formData.value = formOriginData;
  emit('resetBtnClick');
};
// 点击查询
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value);
};
</script>
<style lang="less" scoped></style>
