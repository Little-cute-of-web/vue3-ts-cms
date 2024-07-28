<template>
  <div class="logi-phone">
    <el-form label-width="60px" :model="phone" ref="formRef">
      <el-form-item label="手机号">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input v-model="phone.code"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
const phone = reactive({
  number: '',
  code: '',
});
const formRef = ref<FormInstance>();
</script>
<style lang="less" scoped></style>
