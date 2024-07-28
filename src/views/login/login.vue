<template>
  <div class="login">
    <LoginPanel></LoginPanel>
  </div>
</template>

<script setup lang="ts" name="Login">
import { ref, reactive } from 'vue';
import LoginPanel from './components/login-panel.vue';
</script>
<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets//img//login-bg.svg');
}
</style>
