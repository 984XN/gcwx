import User from 'src/view/user';
import UserProfile from 'src/view/user/profile';

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
    }
  ]
};

export default {
  ...RouterUser
};
