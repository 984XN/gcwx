<template>
  // 党费缴纳，此功能未排入计划 20180607
  <div class="page page-user-fees">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
