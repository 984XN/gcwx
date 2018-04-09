<template>
  <div class="app">
    <template v-if="$route.name ==='login'">
      <router-view></router-view>
    </template>
    <template v-if="$route.name !=='login'">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件 -->
        </router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件 -->
        </router-view>
    </template>
  </div>
</template>
