<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span>
            <el-icon><UserFilled /></el-icon>账号登录
          </span>
        </template>
        <LoginAccount ref="accountRef"></LoginAccount>
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span>
            <el-icon><Iphone /></el-icon>手机登录
          </span>
        </template>
        <loginPhone></loginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import loginPhone from './login-phone.vue';
import LoginAccount from './login-account.vue';
import localCache from '@/utils/cache';
let isKeepPassword = ref<boolean>(true);
const accountRef = ref<InstanceType<typeof LoginAccount>>();
const currentTab = ref('account');

onMounted(() => {
  const name = localCache.getCache('name') || 'coderwhy';
  const password = localCache.getCache('password') || '123456';
  accountRef?.value?.setFormFields(name, password);
});
const handleLoginClick = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value);
  } else {
    console.log('手机登录');
  }
};
</script>
<style lang="less" scoped>
.login-panel {
  margin-bottom: 150px;
  width: 320px;
  .title {
    text-align: center;
  }
  .account-control {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
