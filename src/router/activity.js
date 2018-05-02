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
import ActivityJianYanXianCeDetail from 'src/view/activity/JianYanXianCeDetail';
import ActivityZhiBuEJia from 'src/view/activity/ZhiBuEJia/index';
import ActivityZhiBuEJiaTab from 'src/view/activity/ZhiBuEJia/Tab';
import ActivityZhiBuEJiaLiuYanPingLun from 'src/view/activity/ZhiBuEJia/LiuYanPingLun';
import ActivityZhiBuEJiaLiuYanPingLunList from 'src/view/activity/ZhiBuEJia/LiuYanPingLunList';
import ActivityZhiBuEJiaLiuYanPingLunAdd from 'src/view/activity/ZhiBuEJia/LiuYanPingLunAdd';
import ActivityZhiBuEJiaDangWuZiXun from 'src/view/activity/ZhiBuEJia/DangWuZiXun';
import ActivityZhiBuEJiaXinDeTiHui from 'src/view/activity/ZhiBuEJia/XinDeTiHui';
import ActivityZhiBuEJiaSiXiangHuiBao from 'src/view/activity/ZhiBuEJia/SiXiangHuiBao';
import ActivityZhiBuEJiaDetail from 'src/view/activity/ZhiBuEJia/Detail';
import ActivityChouJiangZhuanQu from 'src/view/activity/ChouJiangZhuanQu';
import ActivityChouJiangZhuanQuTab from 'src/view/activity/ChouJiangZhuanQuTab';
import ActivityChouJiangZhuanQuTurntableScore from 'src/view/activity/ChouJiangZhuanQuTurntableScore';
import ActivityChouJiangZhuanQuTurntableQuestion from 'src/view/activity/ChouJiangZhuanQuTurntableQuestion';
import ActivityChouJiangZhuanQuRecords from 'src/view/activity/ChouJiangZhuanQuRecords';

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
        },
        {
          path: 'detail/:id',
          components: {
            detail: ActivityJianYanXianCeDetail
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
      component: ActivityZhiBuEJia,
      meta: {
        title: '支部e家',
        auth: true,
        fullpage: true,
        keepAlive: false
      },
      children: [
        {
          path: '/',
          redirect: {
            path: 'xindetihui'
          }
        },
        {
          path: 'liuyanpinglun',
          components: {
            page: ActivityZhiBuEJiaLiuYanPingLun
          },
          meta: {
            title: '留言评论',
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
                tab: ActivityZhiBuEJiaTab,
                page: ActivityZhiBuEJiaLiuYanPingLunList
              },
              meta: {
                title: '留言评论',
                auth: true,
                fullpage: true,
                keepAlive: false
              }
            },
            {
              path: 'add',
              components: {
                page: ActivityZhiBuEJiaLiuYanPingLunAdd
              },
              meta: {
                title: '增加留言',
                auth: true,
                fullpage: true,
                keepAlive: false
              }
            }
          ]
        },
        {
          path: 'dangwuzixun',
          components: {
            tab: ActivityZhiBuEJiaTab,
            page: ActivityZhiBuEJiaDangWuZiXun
          },
          meta: {
            title: '党务咨询',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'xindetihui',
          components: {
            tab: ActivityZhiBuEJiaTab,
            page: ActivityZhiBuEJiaXinDeTiHui
          },
          meta: {
            title: '心得体会',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'sixianghuibao',
          components: {
            tab: ActivityZhiBuEJiaTab,
            page: ActivityZhiBuEJiaSiXiangHuiBao
          },
          meta: {
            title: '思想汇报',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'detail/:id',
          components: {
            detail: ActivityZhiBuEJiaDetail
          },
          meta: {
            title: 'detail',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: 'choujiangzhuanqu',
      component: ActivityChouJiangZhuanQu,
      meta: {
        title: '抽奖专区',
        auth: true,
        fullpage: true,
        keepAlive: false
      },
      children: [
        {
          path: '/',
          redirect: {
            path: 'turntable-score'
          }
        },
        {
          path: 'turntable-score',
          components: {
            tab: ActivityChouJiangZhuanQuTab,
            turntable: ActivityChouJiangZhuanQuTurntableScore
          },
          meta: {
            title: '抽奖专区',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'turntable-question',
          components: {
            tab: ActivityChouJiangZhuanQuTab,
            turntable: ActivityChouJiangZhuanQuTurntableQuestion
          },
          meta: {
            title: '答题抽奖',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'records',
          components: {
            records: ActivityChouJiangZhuanQuRecords
          },
          meta: {
            title: '抽奖专区',
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
