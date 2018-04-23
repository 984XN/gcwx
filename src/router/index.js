import Vue from 'vue';
import Router from 'vue-router';
import Login from 'src/view/login';
import LoginFromBrowser from 'src/view/login/browser';
import LoginFromWechat from 'src/view/login/wechat';
import Welcome from 'src/view/welcome';
import NotFound from 'src/view/404';
import Feedback from 'src/view/feedback';
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
      path: '/',
      redirect: {
        path: '/article'
      }
    },
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
      path: '/404',
      name: 'not-found',
      meta: {
        auth: false,
        title: '404 Not Found'
      },
      component: NotFound
    },
    {
      path: '/feedback',
      name: 'feedback',
      meta: {
        auth: false,
        title: '系统问题反馈'
      },
      component: Feedback
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
      meta: {
        title: '登录'
      },
      component: Login,
      children: [
        {
          path: '/',
          redirect: {
            path: 'browser'
          }
        },
        {
          path: 'browser',
          component: LoginFromBrowser,
          meta: {
            title: '系统登录',
            auth: false,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'wechat',
          component: LoginFromWechat,
          meta: {
            title: '微信登录',
            auth: false,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '*',
      redirect: {
        path: '/404'
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;

  // 判断是否需要校验
  if (to.matched.some(m => m.meta.auth)) {
    // sessionStorage存储的内容是string类型的，所以不管你是设置为true或者是false，都是 true
    let isLogin = sessionStorage.isLogin || 0;
    isLogin = JSON.parse(isLogin);
    if (isLogin) {
      console.log('已登录', isLogin, sessionStorage.isLogin);
      // 校验通过，正常跳转到你设置好的页面
      next();
    } else {
      // 校验失败，跳转至登录界面
      // 将跳转的路由path作为参数，用于在登录成功后获取并跳转到该路径
      let path = {
        path: '/login/browser',
        replace: true,
        query: { redirect: to.fullPath }
      };
      if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
        path = {
          path: '/login/wechat',
          replace: true,
          query: { redirect: to.fullPath }
        };
      }
      console.log('未登录', isLogin, sessionStorage.isLogin, path);
      next(path);
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
