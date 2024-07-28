<template>
  <nav>
    <router-link to="/">Main</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view />
</template>

<style lang="less">
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
