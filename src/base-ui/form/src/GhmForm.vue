<template>
  <div class="form">
    <div class="header"><slot name="header"></slot></div>
    <el-form :label-width="labelWidth">
      <el-row>
        <!-- <el-col v-bind="colLayout">
          <el-form-item label="用户名">
            <el-input
              :model-value="modelValue.name"
              placeholder="请输入用户名"
              @update:modelValue="handleValueChange($event, 'name')"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col v-bind="colLayout">
          <el-row>
            <el-form-item label="状态">
              <el-select
                :model-value="modelValue.enable"
                placeholder="请选择状态"
                @update:modelValue="handleValueChange($event, 'enable')"
              >
                <el-option label="启用" value="1"></el-option>
                <el-option label="停用" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-col> -->
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="rules"
              :style="itemStyle"
            >
              <tamplate
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </tamplate>
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    >{{ option.title }}</el-option
                  >
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 底部插槽 -->
    <div class="footer"><slot name="footer"></slot></div>
  </div>
</template>

<script setup lang="ts">
import { IFormItem } from '../types';
import { ref, reactive } from 'vue';

interface Props {
  modelValue: any;
  labelWidth: string;
  colLayout: any;
  itemStyle: any;
  formItems: IFormItem[];
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: {},
  labelWidth: '100px',
  colLayout: { xl: 6, lg: 8, md: 12, sm: 24, xs: 24 },
  itemStyle: () => ({ padding: '10px 40px' }),
  formItems: () => [],
});
// let labelWidth = ref('100px');
const emit = defineEmits<{
  (e: 'update:modelValue', newFormData: any): void;
}>();

const handleValueChange = (value: any, key: string) => {
  const newFormData = reactive({ ...props.modelValue, [key]: value });
  emit('update:modelValue', newFormData);
};
defineExpose({
  handleValueChange,
});
</script>
<style lang="less" scoped></style>
