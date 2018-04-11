import Vue from 'vue';
import Router from 'vue-router';
import Login from 'src/view/login';
import Welcome from 'src/view/welcome';
import Tpl from 'src/view/tpl';

import RouterArticle from 'src/router/article';
import RouterActivity from 'src/router/activity';
import RouterUser from 'src/router/user';

Vue.use(Router);

const router = new Router({
  routes: [
    RouterArticle,
    RouterActivity,
    RouterUser,
    {
      path: '/welcome',
      name: 'welcome',
      meta: {
        auth: true,
        title: '系统首页'
      },
      component: Welcome
    },
    {
      path: '/tpl',
      name: 'tpl',
      meta: {
        auth: false,
        title: '页面模板'
      },
      component: Tpl
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: Login /* ,hidden: true, // 自定义属性，在组件中可以通过 this.$route.hidden 获取值 */
    },
    {
      path: '*',
      redirect: {
        path: '/login'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;

  // 判断是否需要校验
  if (to.matched.some(m => m.meta.auth)) {
    if (sessionStorage.isLogin) {
      // 校验通过，正常跳转到你设置好的页面
      next();
    } else {
      // 校验失败，跳转至登录界面
      // 将跳转的路由path作为参数，用于在登录成功后获取并跳转到该路径
      next({ path: '/login', query: { redirect: to.fullPath } });
    }
  }

  // 前进刷新，后退不刷新 https://juejin.im/post/5a69894a518825733b0f12f2
  const toDepth = to.path.split('/').length;
  const fromDepth = from.path.split('/').length;
  if (toDepth < fromDepth) {
    console.log('route back...');
    from.meta.keepAlive = false;
    to.meta.keepAlive = true;
  }
  next();
});

export default router;
