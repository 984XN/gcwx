import User from 'src/view/user';
import UserIndex from 'src/view/user/catalog';
import UserProfile from 'src/view/user/profile';
import UserWechat from 'src/view/user/wechat/index';
import UserWechatBinding from 'src/view/user/wechat/binding';
import UserWechatUnbinding from 'src/view/user/wechat/unbinding';
import UserPassword from 'src/view/user/password';
import UserGifts from 'src/view/user/gifts';
import UserScore from 'src/view/user/score';
import UserZhengNengLiang from 'src/view/user/ZhengNengLiang';
import UserZhengNengLiangList from 'src/view/user/ZhengNengLiangList';
import UserZhengNengLiangEdit from 'src/view/user/ZhengNengLiangEdit';
import UserDetail from 'src/view/user/detail';
import UserList from 'src/view/user/list';
import UserDocReader from 'src/view/user/docReader';
import UserDangNeiGuanAi from 'src/view/user/DangNeiGuanAi';
import UserDangNeiGuanAiList from 'src/view/user/DangNeiGuanAiList';
import UserDangNeiGuanAiAdd from 'src/view/user/DangNeiGuanAiAdd';
// import UserDangNeiGuanAiEdit from 'src/view/user/DangNeiGuanAiEdit';
import UserDangNeiGuanAiDetail from 'src/view/user/DangNeiGuanAiDetail';

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
      path: 'score',
      components: { default: UserScore },
      meta: {
        title: '个人积分',
        auth: true,
        keepAlive: true
      }
    },
    {
      path: 'gifts',
      components: { default: UserGifts },
      meta: {
        title: '中奖记录',
        auth: true,
        keepAlive: true
      }
    },
    {
      path: 'zhengnengliang',
      components: { default: UserZhengNengLiang },
      meta: { title: '我的正能量', auth: true },
      children: [
        {
          path: '/',
          components: { default: UserZhengNengLiangList },
          meta: {
            title: '我的正能量',
            auth: true
          }
        },
        {
          path: 'edit/:id',
          components: { default: UserZhengNengLiangEdit },
          meta: { title: '我的正能量', auth: true }
        }
      ]
    },
    {
      path: 'dangneiguanai',
      components: { default: UserDangNeiGuanAi },
      meta: { title: '党内关爱', auth: true },
      children: [
        {
          path: '/',
          components: { default: UserDangNeiGuanAiList },
          meta: {
            title: '党内关爱',
            auth: true
          }
        },
        {
          path: 'add',
          components: { default: UserDangNeiGuanAiAdd },
          meta: { title: '党内关爱', auth: true }
        },
        // {
        //   path: 'edit/:id',
        //   components: { default: UserDangNeiGuanAiEdit },
        //   meta: { title: '党内关爱', auth: true }
        // },
        {
          path: 'detail/:id',
          components: { default: UserDangNeiGuanAiDetail },
          meta: { title: '党内关爱', auth: true }
        }
      ]
    },
    {
      path: 'list/:type',
      components: { default: UserList },
      meta: {
        title: '信息列表',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'detail/:id',
      components: { default: UserDetail },
      meta: {
        title: '正文',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'doc-reader',
      // name: 'article-detail',
      components: {
        default: UserDocReader
      },
      meta: {
        title: '文档',
        auth: true,
        keepAlive: false
      }
    }
  ]
};

export default {
  ...RouterUser
};
