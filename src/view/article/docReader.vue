<template>
  <div class="article-detail-doc-reader">
    <iframe v-if="type==='file'" :src="src" frameborder="0"></iframe>
    <div v-else-if="type==='video'">
      <video id="player" width="100%" class="video" autoplay="autoplay" poster="">
        <source :src="src" type="video/mp4" />
      </video>
    </div>
    <div v-else data-remark="正常情况下不可能执行到这里，请检查文末JS代码">未知文件类型：{{type}}</div>
  </div>
</template>

<script>
import * as api from 'src/api/article';

export default {
  data() {
    return {
      readingHandel: null,
      watchTime: 0, // 视频页面停留时间
      type: 'file', // file | video
      src: '/static/html/docReaderLoading.html'
    };
  },
  methods: {
    addScore(data) {
      let self = this;
      // console.log('addScore data:', data);
      // console.log('methods.addScore:', self.viewSecond);
      if (!self.hasPower('member')) {
        console.log('非党员，学习时不加积分');
      } else {
        api.article
          .addScore({
            // ID: self.article.files[0].id,
            ID: data.id || '',
            Title: data.title || '',
            Minute: data.minute || ''
          })
          .then(res => {
            // console.log('addScore by online:', res);
            if (res.StatusCode === 1200) {
              self.$vux.toast.show({
                text: '学习了 ' + data.minute + ' 分钟，积分已增加',
                type: 'text',
                width: '18em',
                position: 'top'
              });
            } else {
              // console.log('addScore error:', res.Message || '加积分时出错');
            }
            console.log('server say:', res.Message);
          });
      }
    }
  },
  mounted() {
    let self = this;
    // 页面加载完成时的时间戳
    let src = self.$route.query.src || '';
    self.readyTime = self.time();
    self.id = self.$route.query.id || '';
    self.title = self.$route.query.title || '';
    self.$nextTick(() => {
      // console.log(self.$route);
      if (!src) {
        self.$vux.alert.show({
          title: '数据错误',
          content: '缺少SRC',
          onHide() {
            self.$router.go(-1);
          }
        });
      } else {
        // console.log('找到了SRC:', src);
        self.src = src;
        let ext = src
          .toLowerCase()
          .split('')
          .reverse()
          .join('')
          .split('.')[0]
          .split('')
          .reverse()
          .join('');
        switch (ext) {
          case 'mp4':
            self.type = 'video';
            break;
          default:
            self.type = 'file';
            break;
        }
        // console.log('ext:', ext);
      }
      // 在页面上停留的秒数
      self.readingHandel = setInterval(() => {
        let online = self.time() - self.readyTime;
        // 文档
        if (self.type === 'file' && online >= 30) {
          let data = {
            id: self.id,
            title: self.title,
            minute: (online / 60).toFixed(1)
          };
          // console.log('data:', data);
          self.addScore(data);
          clearInterval(self.readingHandel);
        }
        // 视频
        if (self.type === 'video') {
          var isFullscreen =
            document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            false;
          if (!isFullscreen) {
            console.log('未全屏', isFullscreen);
          } else {
            console.log('已全屏', isFullscreen);
          }
          let player = document.getElementById('player');
          let duration = player.duration;
          let currentTime = player.currentTime;
          self.watchTime = currentTime;
          if (currentTime >= duration && duration !== 0) {
            clearInterval(self.readingHandel);
          }
          console.log('duration:', duration, currentTime);
        }
        // 提示活动中
        console.log('正在阅读……', online);
      }, 1000);
    });
  },
  beforeDestroy() {
    let self = this;
    try {
      clearInterval(self.readingHandel);
      if (self.type === 'video') {
        let data = {
          id: self.id,
          title: self.title,
          minute: (self.watchTime / 60).toFixed(1)
        };
        self.addScore(data);
      }
    } catch (error) {}
  }
};
</script>

<style lang="stylus">
.article-detail-doc-reader {
  height 100%
  width 100%
  position absolute
  left 0
  top 0
  iframe {
    width 100%
    height 100%
  }
}
</style>
