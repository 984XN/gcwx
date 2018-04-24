import User from 'src/view/user';
import UserProfile from 'src/view/user/profile';
import UserWechat from 'src/view/user/wechat/index';
import UserWechatBinding from 'src/view/user/wechat/binding';
import UserWechatUnbinding from 'src/view/user/wechat/unbinding';

const RouterUser = {
  path: '/user',
  name: 'user',
  component: User,
  meta: { title: '个人中心', auth: true },
  children: [
    {
      path: 'profile',
      name: 'user-profile',
      component: UserProfile,
      meta: { title: '个人资料', auth: true }
    },
    {
      path: 'wechat',
      component: UserWechat,
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
    }
  ]
};

export default {
  ...RouterUser
};
