import Vue from 'vue';

const Menu = [
  {
    name: '学习平台',
    route: '/article',
    icon: require('src/assets/img/tab1.png'),
    iconActive: require('src/assets/img/tab1_active.png'),
    children: [
      { name: '应知应会', route: '/article/yingzhiyinghui' },
      { name: '党章党规', route: '/article/dangzhangdanggui' },
      { name: '系列讲话', route: '/article/xiliejianghua' },
      { name: '党史博览', route: '/article/dangshibolan' },
      { name: '典型风采', route: '/article/dianxingfengcai' },
      { name: '不忘初心', route: '/article/buwangchuxin' },
      { name: '心得体会', route: '/article/xindetihui' }
    ]
  },
  {
    name: '互动专区',
    route: '/activity',
    icon: require('src/assets/img/tab2.png'),
    iconActive: require('src/assets/img/tab2_active.png')
  },
  {
    name: '个人中心',
    route: '/user',
    icon: require('src/assets/img/tab3.png'),
    iconActive: require('src/assets/img/tab3_active.png')
  }
];

export default {
  install() {
    Vue.prototype.$menu = Menu;
  }
};
