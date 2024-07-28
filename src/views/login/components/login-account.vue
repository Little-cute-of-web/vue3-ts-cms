<template>
  <div class="logi-account">
    <el-form label-width="60px" :model="account" :rules="rules" ref="formRef">
      <el-form-item label="账号">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="account.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="LoginAccoount">
import { ref, reactive, defineExpose } from 'vue';
import type { FormInstance } from 'element-plus';
import { useStore } from 'vuex';
import localCache from '@/utils/cache';

const store = useStore();
const account = reactive({
  name: '',
  password: '',
});
const rules = {};
const formRef = ref<FormInstance>();
const loginAction = (isKeepPassword: boolean) => {
  console.log('isKeepPassword', isKeepPassword);
  formRef?.value?.validate((valid) => {
    if (valid) {
      // 是否需要记住用户名和密码
      if (isKeepPassword) {
        localCache.setCache('name', account.name);
        localCache.setCache('password', account.password);
      } else {
        localCache.deleteCache('name');
        localCache.deleteCache('password');
      }
      // 进行登录验证
      store.dispatch('login/accountLoginAction', { ...account });
    }
  });
};
const setFormFields = (name: string, password: string) => {
  account.name = name;
  account.password = password;
};
defineExpose({
  loginAction,
  setFormFields,
});
</script>
<style lang="less" scoped></style>
