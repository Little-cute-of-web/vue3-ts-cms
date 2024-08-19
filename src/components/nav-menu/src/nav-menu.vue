<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="@/assets/logo.png" alt="慧敏" />
      <span v-if="!collapse" class="title">Vue3+TS{{ collapse }}</span>
    </div>
  </div>

  <el-menu
    default-active="39"
    class="el-menu-vertical"
    :collapse="collapse"
    background-color="#0c2135"
    text-color="#b7bdc3"
    active-text-color="#0a60bd"
  >
    <!-- 菜单 -->
    <template v-for="item in userMenus" :key="item.id">
      <!-- 二级菜单 -->
      <template v-if="item.type === 1">
        <!-- 二级菜单标题 -->
        <el-sub-menu :index="item.id + ''">
          <template #title>
            <el-icon v-if="item.icon">
              <Component :is="formatIcon(item)"></Component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item
              :index="subItem.id + ''"
              @click="hanldeMenuItemClick(subItem)"
            >
              <el-icon v-if="subItem.icon">
                <Component :is="formatIcon(subItem)"></Component>
              </el-icon>
              <span>{{ subItem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else-if="item.type === 2">
        <el-menu-item :index="item.id + ''">
          <el-icon v-if="item.icon">
            <Component :is="formatIcon(item)"></Component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </template>
    <!-- <el-sub-menu :index="'38'">
      <template #title>
        <el-icon><Setting></Setting></el-icon>
        <span>系统总览</span>
      </template>
      <el-menu-item :index="'39'">
        <span>核心技术</span>
      </el-menu-item>
      <el-menu-item :index="'40'">
        <span>商品统计</span>
      </el-menu-item>
      <el-menu-item :index="'41'">
        <span>随便聊聊吧</span>
      </el-menu-item>
    </el-sub-menu> -->
  </el-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import type { IRootState } from '@/store/type';

interface Props {
  collapse: boolean;
}
withDefaults(defineProps<Props>(), {
  collapse: false,
});
const router = useRouter();
const store = useStore<IRootState>();
const userMenus = computed(() => {
  return store.state.login.userMenus;
});
console.log('userMenus', userMenus);

const formatIcon = computed(() => {
  return (item: any) => {
    return item.icon.replace('el-icon', '');
  };
});
const hanldeMenuItemClick = (item: any) => {
  router.push({
    path: item.url ?? '/not-found',
  });
};
</script>
<style lang="less" scoped>
.main {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
  .el-menu {
    border-width: none;
  }
  .el-sub-menu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }
  :deep(el-sub-menu__title) {
    background-color: #001529 !important;
  }
  .el-menu-item:hover {
    color: #fff !important;
  }
  .el-menu-item.is-active {
    color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
