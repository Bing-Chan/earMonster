<template>
  <div class="main-page">
    <RouterView v-slot="{ Component }" v-if="$route.meta.keepAlive">
      <keep-alive>
        <component :is="Component" :key="$route.path" />
      </keep-alive>
    </RouterView>
    <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  </div>
  <!-- <nut-tabbar unactive-color="#364636" active-color="#1989fa" bottom v-model="activeTab" v-show="tabbarVisible" @tab-switch="tabSwitch">
    <nut-tabbar-item v-for="item in tabItem" :key="item.key" :tab-title="$t(`tabbar.${item.key}`)" :icon="item.icon" />
  </nut-tabbar> -->
</template>

<script lang="ts" setup name="BasicLayoutPage">
  import { usePageHead } from '/@/hooks/usePageHead';

  usePageHead();
</script>

<style scoped lang="scss">
  .nut-navbar {
    margin-bottom: 0;
  }

  .main-page {
    box-sizing: border-box;
  }
</style>
