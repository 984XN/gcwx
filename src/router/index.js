import Vue from 'vue';
import Router from 'vue-router';
import Login from 'src/view/login';
import LoginFromBrowser from 'src/view/login/browser';
import LoginWechat from 'src/view/login/wechat';
import LoginWechatGetCode from 'src/view/login/wechatGetCode';
import LoginWechatGetUser from 'src/view/login/wechatGetUser';
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
          component: LoginWechat,
          meta: {
            title: '微信登录',
            auth: false,
            fullpage: true,
            keepAlive: false
          },
          children: [
            {
              path: '/',
              redirect: {
                path: 'get-code'
              }
            },
            {
              path: 'get-code',
              components: { code: LoginWechatGetCode },
              meta: {
                title: '微信登录',
                auth: false,
                fullpage: true,
                keepAlive: false
              }
            },
            {
              path: 'get-user',
              components: { code: LoginWechatGetUser },
              meta: {
                title: '微信登录',
                auth: false,
                fullpage: true,
                keepAlive: false
              }
            }
          ]
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
  // console.log('router to:', to);
  // console.log('router from:', from);

  // 判断是否需要校验
  if (to.matched.some(m => m.meta.auth)) {
    // sessionStorage存储的内容是string类型的，所以不管你是设置为true或者是false，都是 true
    let logined = sessionStorage.logined || 0;
    logined = JSON.parse(logined);
    if (logined) {
      // console.log('已登录', logined, sessionStorage.logined);
      // 校验通过，正常跳转到你设置好的页面
      next();
    } else {
      // 校验失败，跳转至登录界面
      // 将跳转的路由path作为参数，用于在登录成功后获取并跳转到该路径
      let path = {
        path: router.getLoginUrl(),
        replace: true,
        query: { redirect: to.fullPath }
      };
      // console.log('未登录', logined, sessionStorage.logined, path);
      next(path);
    }
  }

  // // 前进刷新，后退不刷新 https://juejin.im/post/5a69894a518825733b0f12f2
  // const toDepth = to.path.split('/').length;
  // const fromDepth = from.path.split('/').length;
  // if (toDepth < fromDepth) {
  //   console.log('route back...');
  //   from.meta.keepAlive = false;
  //   to.meta.keepAlive = true;
  // }

  // 继续向下执行，这行不能删除
  next();
});

router.getLoginUrl = () => {
  let inWechat = navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
  let url = '/login/browser';
  if (inWechat) {
    url = '/login/wechat';
  }
  return url;
};

export default router;
