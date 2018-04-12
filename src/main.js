// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store';

import 'src/assets/common.styl';
import 'src/assets/font/iconfont.css';

// 数据类型是 observer 使用时总是 undefined
// // 全局导航菜单数据 this.$menu
// import Menu from 'src/config';
// Vue.use(Menu);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
