<template>
  <Article :article="article" @online="online"></Article>
</template>

<script>
import Article from 'src/components/article';
import * as api from 'src/api/article';
// import { setTimeout, clearTimeout } from 'timers';

export default {
  components: {
    Article
  },
  data() {
    return {
      status: {
        viewed: false // 是否已经标记成了已读
      },
      setViewedThreshold: 30, // 这个秒数后访问量+1
      viewSecond: 0, // 已阅读秒数
      readyTime: null, // 页面加载完成时的时间戳
      videoAddScoreUnit: 10, // 每这个秒数加一次分
      article: { baseInfo: {}, files: [] },
      articleTpl: {
        title: 'Lorem ipsum，中文又称“乱数假文”',
        author: '某某人',
        date: '2018-04-12 14:29',
        content: `
          <p>Lorem ipsum从西元15世纪开始就被广泛地使用在西方的印刷、设计领域中，在电脑排版盛行之后，这段被传统印刷产业使用几百年的无意义文字又再度流行。由于这段文字以“Lorem ipsum”起头，并且常被用于标题的测试中，所以一般称为Lorem ipsum，简称为Lipsum。</p>
          <p>常见的Lorem ipsum起头如下：</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>原先大家以为这段拉丁文只是没有意义的组合， [1] 目的是让阅读者不要被文章内容所影响，而只专注于观察字型或版型，并借此填满空间。但根据美国拉丁学者Richard McClintock的研究，Lorem ipsum原来起源于西赛罗的《善恶之尽》（De finibus bonorum et malorum）：</p>
          <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit…</p>
          <p>（中译：无人爱苦，亦无人寻之欲之，乃因其苦…）</p>
          <p>为了减少Lorem ipsum的可读性，并且让字母出现的频率与现代英语接近，所以有些版本中部分字母被K、W、Z等拉丁文中没有的字母替换，或是加入zzril、takimata等字。除了原始的Lorem ipsum版本外，目前还有几套新的Lorem ipsum。</p>
        `
      }
    };
  },
  methods: {
    setViewed() {
      let self = this;
      api.article.setViewed({ ID: self.article.baseInfo.id }).then(res => {
        // console.log('setViewed by online:', res);
      });
    },
    // 文档停留30秒才算阅读过
    // 视频停留 5分钟内、10分钟内、10分钟以上分别得 0.5、1个积分
    online(second) {
      let self = this;
      // let type = self.article.baseInfo.type;
      self.viewSecond = second;
      // console.log('online:', second, 'sec. type:' + type);
      // 30秒即可标记为已读
      if (!self.status.viewed && self.viewSecond > self.setViewedThreshold) {
        self.status.viewed = true; // api 200 ok 时再标记会导致请求过程中多次执行标记操作
        api.article.setViewed({ ID: self.article.baseInfo.id }).then(res => {
          // console.log('setViewed by online:', res);
        });
      }
    }
  },
  mounted() {
    // 页面加载完成时的时间戳
    let self = this;
    self.readyTime = self.time();
    self.$nextTick(function() {
      // console.log('self.$route', self.$route);
      let id = self.$route.params.id || 0;
      if (!id) {
        self.$router.replace({
          path: '/',
          query: { error: 'missing-id', from: self.$route.fullPath }
        });
      }
      self.$vux.loading.show({
        text: '正在获取数据'
      });
      api.article
        .detail({
          ID: id
        })
        .then(res => {
          self.$vux.loading.hide();
          // console.log('detail:', res);
          if (res.Data.article.videos && res.Data.article.videos.length > 0) {
            if (!res.Data.article.files) {
              res.Data.article.files = [];
            }
            for (const video of res.Data.article.videos) {
              video.type = 'video'
              res.Data.article.files.push(video);
            }
            delete res.Data.article.videos;
          }
          self.article = res.Data.article;
        })
        .catch(() => {
          self.$vux.loading.hide();
          self.$router.go(-1);
        });
    });
  }
};
</script>
