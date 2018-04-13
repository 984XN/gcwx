import Article from 'src/view/article/index';
import ArticleYingZhiYingHui from 'src/view/article/YingZhiYingHui';
import ArticleYingZhiYingHuiDetail from 'src/view/article/YingZhiYingHuiDetail';
import ArticleDangZhangDangGui from 'src/view/article/DangZhangDangGui';
import ArticleXiLieJiangHua from 'src/view/article/XiLieJiangHua';
import ArticleDangShiBoLan from 'src/view/article/DangShiBoLan';
import ArticleDianXingFengCai from 'src/view/article/DianXingFengCai';
import ArticleBuWangChuXin from 'src/view/article/BuWangChuXin';
import ArticleXinDeTiHui from 'src/view/article/XinDeTiHui';
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
      name: 'yingzhiyinghui',
      component: ArticleYingZhiYingHui,
      meta: {
        title: '应知应会',
        auth: true,
        keepAlive: false
      },
      children: [
        {
          path: 'detail',
          name: 'yingzhiyinghui-detail',
          component: ArticleYingZhiYingHuiDetail,
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
      name: 'dangzhangdanggui',
      component: ArticleDangZhangDangGui,
      meta: {
        title: '党章党规',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'xiliejianghua',
      name: 'xiliejianghua',
      component: ArticleXiLieJiangHua,
      meta: {
        title: '系列讲话',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dangshibolan',
      name: 'dangshibolan',
      component: ArticleDangShiBoLan,
      meta: {
        title: '党史博览',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dianxingfengcai',
      name: 'dianxingfengcai',
      component: ArticleDianXingFengCai,
      meta: {
        title: '典型风采',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'buwangchuxin',
      name: 'buwangchuxin',
      component: ArticleBuWangChuXin,
      meta: {
        title: '不忘初心',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'xindetihui',
      name: 'xindetihui',
      component: ArticleXinDeTiHui,
      meta: {
        title: '心得体会',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'detail',
      name: 'article-detail',
      component: ArticleDetail,
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
