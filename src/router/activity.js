import Activity from 'src/view/activity/index';
import ActivityCanYuTouPiao from 'src/view/activity/CanYuTouPiao';
import ActivityDaTiCuXue from 'src/view/activity/DaTiCuXue';
import ActivityDaTiCuXueList from 'src/view/activity/DaTiCuXueList';
import ActivityDaTiCuXueRecords from 'src/view/activity/DaTiCuXueRecords';
import ActivityZhiShiJingSai from 'src/view/activity/ZhiShiJingSai';
import ActivityZhengNengLiang from 'src/view/activity/ZhengNengLiang';
import ActivityZhengNengLiangForm from 'src/view/activity/ZhengNengLiangForm';
import ActivityJianYanXianCe from 'src/view/activity/JianYanXianCe';
import ActivityZhiBuEJia from 'src/view/activity/ZhiBuEJia';
import ActivityJiFenChouJiang from 'src/view/activity/JiFenChouJiang';

const RouterActivity = {
  path: '/activity',
  component: Activity,
  meta: { title: '互动专区', auth: true },
  children: [
    {
      path: '/',
      redirect: {
        path: 'canyutoupiao'
      }
    },
    {
      path: 'canyutoupiao',
      name: 'canyutoupiao',
      component: ActivityCanYuTouPiao,
      meta: {
        title: '参与投票',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'daticuxue',
      name: 'daticuxue',
      component: ActivityDaTiCuXue,
      meta: {
        title: '答题促学',
        auth: true,
        fullpage: true,
        keepAlive: false
      },
      children: [
        {
          path: '/',
          redirect: {
            path: 'list'
          }
        },
        {
          path: 'list',
          component: ActivityDaTiCuXueList,
          meta: {
            title: '答题练习',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'records',
          component: ActivityDaTiCuXueRecords,
          meta: {
            title: '学习记录',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: 'zhishijingsai',
      name: 'zhishijingsai',
      component: ActivityZhiShiJingSai,
      meta: {
        title: '知识竞赛',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'zhengnengliang',
      name: 'zhengnengliang',
      component: ActivityZhengNengLiang,
      meta: {
        title: '正能量',
        auth: true,
        fullpage: true,
        keepAlive: false
      },
      children: [
        {
          path: 'add',
          component: ActivityZhengNengLiangForm,
          meta: {
            title: '正能量',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: 'jianyanxiance',
      name: 'jianyanxiance',
      component: ActivityJianYanXianCe,
      meta: {
        title: '建言献策',
        auth: true,
        fullpage: true,
        keepAlive: false
      }
    },
    {
      path: 'zhibuejia',
      name: 'zhibuejia',
      component: ActivityZhiBuEJia,
      meta: {
        title: '支部e家',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'jifenchoujiang',
      name: 'jifenchoujiang',
      component: ActivityJiFenChouJiang,
      meta: {
        title: '积分抽奖',
        auth: true,
        fullpage: true,
        keepAlive: false
      }
    }
  ]
};

export default {
  ...RouterActivity
};
