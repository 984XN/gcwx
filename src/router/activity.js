import Activity from 'src/view/activity/index';
import ActivityCanYuTouPiao from 'src/view/activity/CanYuTouPiao';
import ActivityDaTiCuXue from 'src/view/activity/DaTiCuXue';
import ActivityZhiShiJingSai from 'src/view/activity/ZhiShiJingSai';
import ActivityZhengNengLiang from 'src/view/activity/ZhengNengLiang';
import ActivityJianYanXianCe from 'src/view/activity/JianYanXianCe';
import ActivityZhiBuEJia from 'src/view/activity/ZhiBuEJia';
import ActivityJiFenChouJiang from 'src/view/activity/JiFenChouJiang';

const RouterActivity = {
  path: '/Activity',
  component: Activity,
  meta: { title: '学习平台' },
  children: [
    {
      path: '/',
      redirect: {
        path: 'yingzhiyinghui'
      }
    },
    {
      path: 'canyutoupiao',
      name: 'CanYuTouPiao',
      component: ActivityCanYuTouPiao,
      meta: { title: '参与投票', auth: true }
    },
    {
      path: 'daticuxue',
      name: 'DaTiCuXue',
      component: ActivityDaTiCuXue,
      meta: { title: '答题促学', auth: true }
    },
    {
      path: 'zhishijingsai',
      name: 'ZhiShiJingSai',
      component: ActivityZhiShiJingSai,
      meta: { title: '知识竞赛', auth: true }
    },
    {
      path: 'zhengnengliang',
      name: 'ZhengNengLiang',
      component: ActivityZhengNengLiang,
      meta: { title: '正能量', auth: true }
    },
    {
      path: 'jianyanxiance',
      name: 'JianYanXianCe',
      component: ActivityJianYanXianCe,
      meta: { title: '建言献策', auth: true }
    },
    {
      path: 'zhibuejia',
      name: 'ZhiBuEJia',
      component: ActivityZhiBuEJia,
      meta: { title: '支部e家', auth: true }
    },
    {
      path: 'jifenchoujiang',
      name: 'JiFenChouJiang',
      component: ActivityJiFenChouJiang,
      meta: { title: '积分抽奖', auth: true }
    }
  ]
};

export default {
  ...RouterActivity
};
