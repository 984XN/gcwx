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
    addScore() {
      let self = this;
      let minute = Math.round(self.viewSecond / self.videoAddScoreUnit);
      // console.log('methods.addScore:', self.viewSecond);
      api.article
        .addScore({
          // ID: self.article.files[0].id,
          ID: self.article.baseInfo.id,
          Title: self.article.baseInfo.title,
          Minute: minute,
          _debug: {
            ReadStart: self.date('Y-m-d H:i:s', self.readyTime),
            ReadEnd: self.date('Y-m-d H:i:s')
          }
        })
        .then(res => {
          // console.log('addScore by online:', res);
          if (res.StatusCode === 1200) {
            self.$vux.toast.show({
              text: '阅读了 ' + minute + ' 分钟，增加 1 积分',
              type: 'text',
              width: '18em',
              position: 'top'
            });
          } else {
            // console.log('addScore error:', res.Message || '加积分时出错');
          }
        });
    },
    setViewd() {
      let self = this;
      api.article.setViewd({ ID: self.article.baseInfo.id }).then(res => {
        // console.log('setViewd by online:', res);
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
        api.article.setViewd({ ID: self.article.baseInfo.id }).then(res => {
          // console.log('setViewd by online:', res);
        });
      }
    }
  },
  mounted() {
    // 页面加载完成时的时间戳
    this.readyTime = this.time();
    this.$nextTick(function() {
      // console.log('this.$route', this.$route);
      let id = this.$route.params.id || 0;
      if (!id) {
        this.$router.replace({
          path: '/',
          query: { error: 'missing-id', from: this.$route.fullPath }
        });
      }
      this.$vux.loading.show({
        text: '正在获取数据'
      });
      api.article
        .getOne({
          ID: id
        })
        .then(res => {
          this.$vux.loading.hide();
          this.article = res.Data.Article;
          // console.log('getOne:', res);
        })
        .catch(() => {
          this.$vux.loading.hide();
          this.$router.go(-1);
        });
    });
  },
  beforeDestroy() {
    let self = this;
    if (self.article.baseInfo.type === 10) {
      self.addScore();
    }
  }
};
</script>
