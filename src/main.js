// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import filter from './filter';
import { focus, scroll } from './directive';
import func from './function';
import {
  AlertPlugin,
  Badge,
  Cell,
  CheckIcon,
  ConfirmPlugin,
  Group,
  Loading,
  LoadingPlugin,
  LoadMore,
  Selector,
  Tab,
  TabItem,
  Toast,
  ToastPlugin,
  XButton,
  XInput,
  XTextarea
} from 'vux';
import Container from 'src/components/container';
import NoData from 'src/components/noData';

import 'src/assets/common.styl';
import 'src/assets/font/iconfont.css';

// 数据类型是 observer 使用时总是 undefined
// // 全局导航菜单数据 this.$menu
// import Menu from 'src/config';
// Vue.use(Menu);

Vue.use(filter);
Vue.use(func);

Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);

Vue.component('badge', Badge);
Vue.component('cell', Cell);
Vue.component('check-icon', CheckIcon);
Vue.component('container', Container);
Vue.component('no-data', NoData);
Vue.component('group', Group);
Vue.component('loading', Loading);
Vue.component('load-more', LoadMore);
Vue.component('selector', Selector);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('toast', Toast);
Vue.component('x-button', XButton);
Vue.component('x-input', XInput);
Vue.component('x-textarea', XTextarea);

Vue.directive('focus', focus);
Vue.directive('scroll', scroll);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
