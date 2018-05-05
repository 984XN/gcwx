import User from 'src/view/user';
import UserIndex from 'src/view/user/catalog';
import UserProfile from 'src/view/user/profile';
import UserWechat from 'src/view/user/wechat/index';
import UserWechatBinding from 'src/view/user/wechat/binding';
import UserWechatUnbinding from 'src/view/user/wechat/unbinding';
import UserPassword from 'src/view/user/password';
import UserZhengNengLiang from 'src/view/user/ZhengNengLiang';

const RouterUser = {
  path: '/user',
  component: User,
  meta: { title: '个人中心', auth: true },
  children: [
    {
      path: '/',
      components: { default: UserIndex },
      meta: { title: '个人中心', auth: true }
    },
    {
      path: 'profile',
      components: { default: UserProfile },
      meta: { title: '个人资料', auth: true }
    },
    {
      path: 'wechat',
      components: { default: UserWechat },
      meta: { title: '微信绑定', auth: true },
      children: [
        {
          path: '/',
          redirect: {
            path: 'binding'
          }
        },
        {
          path: 'binding',
          components: { untie: UserWechatBinding },
          meta: { title: '微信绑定', auth: true }
        },
        {
          path: 'unbinding',
          components: { untie: UserWechatUnbinding },
          meta: { title: '微信解绑', auth: true }
        }
      ]
    },
    {
      path: 'password',
      components: { default: UserPassword },
      meta: { title: '修改密码', auth: true }
    },
    {
      path: 'zhengnengliang',
      components: {default: UserZhengNengLiang},
      meta: { title: '修改密码', auth: true }
    }
  ]
};

export default {
  ...RouterUser
};
