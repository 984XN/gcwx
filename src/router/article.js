import Article from 'src/view/article/index';
import ArticleTab from 'src/view/article/indexTab';
import ArticleMenu from 'src/view/article/indexMenu';
import ArticleYingZhiYingHui from 'src/view/article/YingZhiYingHui';
import ArticleYingZhiYingHuiDetail from 'src/view/article/YingZhiYingHuiDetail';
import ArticleYingZhiYingHuiList from 'src/view/article/YingZhiYingHuiList';
import ArticleDangZhangDangGui from 'src/view/article/DangZhangDangGui';
import ArticleXiLieJiangHua from 'src/view/article/XiLieJiangHua';
import ArticleDangShiBoLan from 'src/view/article/DangShiBoLan';
import ArticleDianXingFengCai from 'src/view/article/DianXingFengCai';
import ArticleBuWangChuXin from 'src/view/article/BuWangChuXin';
import ArticleDetail from 'src/view/article/detail';

const RouterArticle = {
  path: '/article',
  component: Article,
  meta: { title: '学习平台', auth: true },
  children: [
    {
      path: '/',
      redirect: {
        path: 'yingzhiyinghui'
      }
    },
    {
      path: 'yingzhiyinghui',
      components: {
        page: ArticleYingZhiYingHui
      },
      meta: {
        title: '应知应会',
        auth: true,
        keepAlive: false
      },
      children: [
        {
          path: '/',
          components: {
            tab: ArticleTab,
            menu: ArticleMenu,
            page: ArticleYingZhiYingHuiList
          },
          meta: {
            title: '应知应会',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        },
        {
          path: 'detail',
          components: {
            detail: ArticleYingZhiYingHuiDetail
          },
          meta: {
            title: '应知应会',
            auth: true,
            fullpage: true,
            keepAlive: false
          }
        }
      ]
    },
    {
      path: 'dangzhangdanggui',
      components: {
        tab: ArticleTab,
        menu: ArticleMenu,
        page: ArticleDangZhangDangGui
      },
      meta: {
        title: '党章党规',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'xiliejianghua',
      // name: 'xiliejianghua',
      components: {
        tab: ArticleTab,
        menu: ArticleMenu,
        page: ArticleXiLieJiangHua
      },
      meta: {
        title: '系列讲话',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dangshibolan',
      // name: 'dangshibolan',
      components: {
        tab: ArticleTab,
        menu: ArticleMenu,
        page: ArticleDangShiBoLan
      },
      meta: {
        title: '党史博览',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dianxingfengcai',
      // name: 'dianxingfengcai',
      components: {
        tab: ArticleTab,
        menu: ArticleMenu,
        page: ArticleDianXingFengCai
      },
      meta: {
        title: '典型风采',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'buwangchuxin',
      // name: 'buwangchuxin',
      components: {
        tab: ArticleTab,
        menu: ArticleMenu,
        page: ArticleBuWangChuXin
      },
      meta: {
        title: '不忘初心',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'detail/:id',
      // name: 'article-detail',
      component: ArticleDetail,
      components: {
        detail: ArticleDetail
      },
      meta: {
        title: '正文',
        auth: true,
        fullpage: true,
        keepAlive: false
      }
    }
  ]
};

export default {
  ...RouterArticle
};
