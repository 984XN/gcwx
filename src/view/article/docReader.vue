<template>
  <div class="article-detail-doc-reader">
    <iframe v-if="type==='file'" :src="src" frameborder="0"></iframe>
    <video v-else-if="type==='video'" id="player" style="background-color:#000;" width="100%" height="100%" class="video" autoplay="autoplay" controls="controls" poster="" x5-playsinline="" playsinline="" webkit-playsinline="" preload="auto">
      <source :src="src" type="video/mp4" />
    </video>
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
      videoScoreAdded: false, // 视频已看完并已得分不需要退出时再得分了
      learningHandel: null,
      learning: false, // 是否显示“学习中”的提示
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
      let threshold = self.scoreRequireTimeThreshold.file;
      self.$vux.alert.show({
        title: '积分规则',
        content: `
          <ol style="text-align:left;font-size:14px;list-style:none;">
            <li>1. 文档类学习${threshold}秒即可得到积分</li>
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
          text: '已学习了 ' + self.$options.filters.second2clock(data.timeLength),
          type: 'text',
          time: 5000,
          width: '10em',
          position: 'middle'
        });
        console.log('非党员，学习时不加积分');
      } else {
        api.article
          .addScore({
            // ID: self.article.files[0].id,
            ID: data.id || '',
            Title: data.title || '',
            timeLength: data.timeLength || ''
          })
          .then(res => {
            console.log('addScore by online:', res);
            if (res.StatusCode === 1200) {
              self.$vux.confirm.show({
                content: res.Message,
                confirmText: '关闭提示',
                cancelText: '积分记录',
                onCancel() {
                  self.$router.replace({ path: '/user/score' });
                },
                onConfirm() {
                  // console.log('plugin confirm');
                }
              });
            } else {
              self.$vux.toast.show({
                text: res.Message,
                type: 'text',
                time: 5000,
                width: '18em',
                position: 'middle'
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
        let ext = src.toLowerCase();
        ext = ext.split('');
        ext = ext.reverse();
        ext = ext.join('');
        ext = ext.split('.')[0];
        ext = ext.split('');
        ext = ext.reverse();
        ext = ext.join('');
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
              timeLength: online
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
          let player = document.getElementById('player');
          let duration = Math.floor(player.duration);
          let currentTime = player.currentTime;
          self.learnTime = Math.floor(
            currentTime < online ? currentTime : online
          );
          if (currentTime >= duration && duration !== 0) {
            self.videoScoreAdded = true;
            self.learning = false;
            let data = {
              id: self.id,
              title: self.title,
              timeLength: self.learnTime
            };
            self.addScore(data);
            clearInterval(self.learningHandel);
            // 退出全屏（挡住得积分的提示了）
            let isFullscreen =
              document.fullscreen ||
              document.webkitIsFullScreen ||
              document.mozFullScreen ||
              false;
            if (isFullscreen) {
              try {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                }
              } catch (e) {
                console.log('不能退出全屏：', e);
              }
            } else {
              console.log('非全屏，不需要退出全屏以显示得分结果');
            }
          }
          // console.log('duration:', duration, currentTime);
          // 提示活动中
          console.log('正在观看……', self.learnTime, duration, currentTime);
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
      if (self.type === 'video' && !self.videoScoreAdded) {
        let data = {
          id: self.id,
          title: self.title,
          timeLength: self.learnTime
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
  background-color #fff
  iframe {
    width 100%
    height 100%
  }
  .learnClock {
    position fixed
    right 10px
    top 10px
    background-color rgba(255, 255, 255, 0.8)
    color #C00
    padding 5px
    line-height 1
    font-size 12px
    border 1px solid rgba(128, 128, 128, 0.4)
    border-radius 3px
  }
}
</style>
