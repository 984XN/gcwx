import Article from 'src/view/article/index';
import ArticleYingZhiYingHui from 'src/view/article/YingZhiYingHui';
import ArticleDangZhangDangGui from 'src/view/article/DangZhangDangGui';
import ArticleXiLieJiangHua from 'src/view/article/XiLieJiangHua';
import ArticleDangShiBoLan from 'src/view/article/DangShiBoLan';
import ArticleDianXingFengCai from 'src/view/article/DianXingFengCai';
import ArticleBuWangChuXin from 'src/view/article/BuWangChuXin';
import ArticleXinDeTiHui from 'src/view/article/XinDeTiHui';

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
      name: 'YingZhiYingHui',
      component: ArticleYingZhiYingHui,
      meta: {
        title: '应知应会',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dangzhangdanggui',
      name: 'DangZhangDangGui',
      component: ArticleDangZhangDangGui,
      meta: {
        title: '党章党规',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'xiliejianghua',
      name: 'XiLieJiangHua',
      component: ArticleXiLieJiangHua,
      meta: {
        title: '系列讲话',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dangshibolan',
      name: 'DangShiBoLan',
      component: ArticleDangShiBoLan,
      meta: {
        title: '党史博览',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'dianxingfengcai',
      name: 'DianXingFengCai',
      component: ArticleDianXingFengCai,
      meta: {
        title: '典型风采',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'buwangchuxin',
      name: 'BuWangChuXin',
      component: ArticleBuWangChuXin,
      meta: {
        title: '不忘初心',
        auth: true,
        keepAlive: false
      }
    },
    {
      path: 'xindetihui',
      name: 'XinDeTiHui',
      component: ArticleXinDeTiHui,
      meta: {
        title: '心得体会',
        auth: true,
        keepAlive: false
      }
    }
  ]
};

export default {
  ...RouterArticle
};
