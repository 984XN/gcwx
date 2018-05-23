<template>
  <div class="article-detail-doc-reader">
    <iframe v-if="type==='file'" :src="src" frameborder="0"></iframe>
    <div v-else-if="type==='video'">
      <video id="player" width="100%" class="video" autoplay="autoplay" poster="">
        <source :src="src" type="video/mp4" />
      </video>
    </div>
    <div v-else data-remark="正常情况下不可能执行到这里，请检查文末JS代码">未知文件类型：{{type}}</div>
    <div class="learnClock" v-if="learning" @click="showRole">
      {{learnClock}}
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/article';

export default {
  data() {
    return {
      scoreRequireTimeThreshold: {
        file: 30, // 学习够这个秒数可得积分
        video: 0 // 视频根据时长加积分，具体规划在后台管理，前端控制不了，这个数值也没有作用，仅用于标志有这个功能
      },
      learningHandel: null,
      learning: false,
      learnTime: 0, // 视频页面停留时间
      type: 'file', // file | video
      src: '/static/html/docReaderLoading.html'
    };
  },
  computed: {
    learnClock() {
      let self = this;
      let min = Math.floor(self.learnTime / 60);
      let sec = self.learnTime % 60;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      return '学习中 ' + min + ':' + sec;
    }
  },
  methods: {
    showRole() {
      let self = this;
      self.$vux.alert.show({
        title: '积分规则',
        content: `
          <ol style="text-align:left;font-size:14px;list-style:none;">
            <li>1. 文档类学习${self.scoreRequireTimeThreshold.file}秒即可得到积分</li>
            <li>2. 视频类详见相关规则文件</li>
            <li>3. 重复学习不得积分</li>
          </ol>
        `
      });
    },
    addScore(data) {
      let self = this;
      // console.log('addScore data:', data);
      // console.log('methods.addScore:', self.viewSecond);
      if (!self.hasPower('member')) {
        self.$vux.toast.show({
          text: '已学习够 ' + data.minute + ' 分钟了',
          type: 'text',
          width: '10em',
          position: 'top'
        });
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
            console.log('addScore by online:', res);
            if (res.StatusCode === 1200) {
              self.$vux.toast.show({
                text: '学习了 ' + data.minute + ' 分钟，' + res.Message,
                type: 'text',
                width: '18em',
                position: 'top'
              });
            } else {
              self.$vux.toast.show({
                text: res.Message,
                type: 'text',
                width: '18em',
                position: 'top'
              });
              console.log('addScore error:', res.Message || '加积分时出错');
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
        self.learning = true;
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
      self.learningHandel = setInterval(() => {
        let online = self.time() - self.readyTime;
        // 文档
        if (self.type === 'file') {
          self.learnTime = online;
          if (online >= self.scoreRequireTimeThreshold.file) {
            let data = {
              id: self.id,
              title: self.title,
              minute: (online / 60).toFixed(1)
            };
            // console.log('data:', data);
            self.addScore(data);
            self.learning = false;
            clearInterval(self.learningHandel);
          }
          // 提示活动中
          console.log('正在阅读……', self.learnTime);
        } else if (self.type === 'video') {
          // 视频
          var isFullscreen =
            document.fullscreen ||
            document.webkitIsFullScreen ||
            document.mozFullScreen ||
            false;
          if (!isFullscreen) {
            // console.log('未全屏', isFullscreen);
          } else {
            // console.log('已全屏', isFullscreen);
          }
          let player = document.getElementById('player');
          let duration = player.duration;
          let currentTime = player.currentTime;
          self.learnTime = Math.floor(currentTime);
          if (currentTime >= duration && duration !== 0) {
            clearInterval(self.learningHandel);
          }
          // console.log('duration:', duration, currentTime);
          // 提示活动中
          console.log('正在观看……', self.learnTime);
        } else {
          console.log('正在计时，未知类型……', self.type, self.learnTime);
        }
      }, 1000);
    });
  },
  beforeDestroy() {
    let self = this;
    try {
      clearInterval(self.learningHandel);
      if (self.type === 'video') {
        let data = {
          id: self.id,
          title: self.title,
          minute: (self.learnTime / 60).toFixed(1)
        };
        self.learning = false;
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
  .learnClock {
    position fixed
    right 10px
    bottom 10px
    background-color rgba(255, 255, 255, 0.3)
    color #000
    padding 5px
    line-height 1
    font-size 12px
    border 1px solid #CCC
    border-radius 3px
  }
}
</style>
