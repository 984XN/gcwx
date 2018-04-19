import Activity from 'src/view/activity/index';
import ActivityLiangDianTouPiao from 'src/view/activity/LiangDianTouPiao';
import ActivityLiangDianTouPiaoList from 'src/view/activity/LiangDianTouPiaoList';
import ActivityLiangDianTouPiaoVote from 'src/view/activity/LiangDianTouPiaoVote';
import ActivityLiangDianTouPiaoDetail from 'src/view/activity/LiangDianTouPiaoDetail';
import ActivityDaTiCuXue from 'src/view/activity/DaTiCuXue';
import ActivityDaTiCuXueTab from 'src/view/activity/DaTiCuXueTab';
import ActivityDaTiCuXueList from 'src/view/activity/DaTiCuXueList';
import ActivityDaTiCuXuePaper from 'src/view/activity/DaTiCuXuePaper';
import ActivityDaTiCuXueRecords from 'src/view/activity/DaTiCuXueRecords';
import ActivityZhiShiJingSai from 'src/view/activity/ZhiShiJingSai';
import ActivityZhiShiJingSaiTab from 'src/view/activity/ZhiShiJingSaiTab';
import ActivityZhiShiJingSaiList from 'src/view/activity/ZhiShiJingSaiList';
import ActivityZhiShiJingSaiPaper from 'src/view/activity/ZhiShiJingSaiPaper';
import ActivityZhiShiJingSaiOrder from 'src/view/activity/ZhiShiJingSaiOrder';
import ActivityZhengNengLiang from 'src/view/activity/ZhengNengLiang';
import ActivityZhengNengLiangForm from 'src/view/activity/ZhengNengLiangForm';
import ActivityJianYanXianCe from 'src/view/activity/JianYanXianCe';
import ActivityJianYanXianCeTab from 'src/view/activity/JianYanXianCeTab';
import ActivityJianYanXianCeForm from 'src/view/activity/JianYanXianCeForm';
import ActivityJianYanXianCeRecords from 'src/view/activity/JianYanXianCeRecords';
import ActivityZhiBuEJia from 'src/view/activity/ZhiBuEJia';
import ActivityJiFenChouJiang from 'src/view/activity/JiFenChouJiang';
import ActivityJiFenChouJiangTurntable from 'src/view/activity/JiFenChouJiangTurntable';
import ActivityJiFenChouJiangRecords from 'src/view/activity/JiFenChouJiangRecords';

const RouterActivity = {
  path: '/activity',
  component: Activity,
  meta: { title: '互动专区', auth: true },
  children: [
    {
      path: '/',
      redirect: {
        path: 'liangdiantoupiao'
      }
    },
    {
      path: 'liangdiantoupiao',
      component: ActivityLiangDianTouPiao,
      meta: {
        title: '亮点投票',
        auth: true,
        // fullpage: true,
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
          components: {
            list: ActivityLiangDianTouPiaoList
          },
          meta: {
            title: '亮点投票',
            auth: true,
            // fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'vote/:id',
          components: {
            vote: ActivityLiangDianTouPiaoVote
          },
          meta: {
            title: '亮点投票',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'detail/:id',
          components: {
            vote: ActivityLiangDianTouPiaoDetail
          },
          meta: {
            title: '亮点投票',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: 'daticuxue',
      components: {
        tab: ActivityDaTiCuXueTab,
        default: ActivityDaTiCuXue
      },
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
          components: {
            tab: ActivityDaTiCuXueTab,
            default: ActivityDaTiCuXueList
          },
          meta: {
            title: '答题练习',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'paper',
          component: ActivityDaTiCuXuePaper,
          meta: {
            title: '试卷',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'records',
          components: {
            tab: ActivityDaTiCuXueTab,
            default: ActivityDaTiCuXueRecords
          },
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
      component: ActivityZhiShiJingSai,
      meta: {
        title: '知识竞赛',
        auth: true,
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
          components: {
            tab: ActivityZhiShiJingSaiTab,
            default: ActivityZhiShiJingSaiList
          },
          meta: {
            title: '答题练习',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'paper',
          component: ActivityZhiShiJingSaiPaper,
          meta: {
            title: '试卷',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'order',
          components: {
            tab: ActivityZhiShiJingSaiTab,
            default: ActivityZhiShiJingSaiOrder
          },
          meta: {
            title: '竞赛排名',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
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
      component: ActivityJianYanXianCe,
      meta: {
        title: '建言献策',
        auth: true,
        fullpage: true,
        keepAlive: false
      },
      children: [
        {
          path: '/',
          redirect: {
            path: 'form'
          }
        },
        {
          path: 'form',
          components: {
            tab: ActivityJianYanXianCeTab,
            form: ActivityJianYanXianCeForm
          },
          meta: {
            title: '建言献策',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'records',
          components: {
            tab: ActivityJianYanXianCeTab,
            records: ActivityJianYanXianCeRecords
          },
          meta: {
            title: '建言献策',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
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
      component: ActivityJiFenChouJiang,
      meta: {
        title: '积分抽奖',
        auth: true,
        fullpage: true,
        keepAlive: false
      },
      children: [
        {
          path: '/',
          redirect: {
            path: 'turntable'
          }
        },
        {
          path: 'turntable',
          components: {
            turntable: ActivityJiFenChouJiangTurntable
          },
          meta: {
            title: '积分抽奖',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'records',
          components: {
            records: ActivityJiFenChouJiangRecords
          },
          meta: {
            title: '积分抽奖',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    }
  ]
};

export default {
  ...RouterActivity
};
