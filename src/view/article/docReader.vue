<template>
  <div class="article-detail-doc-reader">
    <iframe :src="src" frameborder="0"></iframe>
  </div>
</template>

<script>
import * as api from 'src/api/article';

export default {
  data() {
    return {
      readingHandel: null,
      src:
        'data:text/html;base64,Jmx0OyFET0NUWVBFIGh0bWwmZ3Q7Jmx0O2h0bWwgbGFuZz0iZW4iJmd0OyZsdDtoZWFkJmd0OyZsdDttZXRhIGNoYXJzZXQ9IlVURi04IiZndDsmbHQ7bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCImZ3Q7Jmx0O3RpdGxlJmd0O+WKoOi9veS4rSZsdDsvdGl0bGUmZ3Q7Jmx0O3N0eWxlJmd0O2h0bWwsYm9keSB7d2lkdGg6IDEwMCU7aGVpZ2h0OiAxMDAlO3Bvc2l0aW9uOiByZWxhdGl2ZTttYXJnaW46IDA7cGFkZGluZzogMDtvdmVyZmxvdzogaGlkZGVuO31kaXYge3dpZHRoOiAxMDBweDtoZWlnaHQ6IDUwcHg7bGluZS1oZWlnaHQ6IDUwcHg7dGV4dC1hbGlnbjogY2VudGVyO3Bvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiA1MCU7dG9wOiA1MCU7bWFyZ2luLWxlZnQ6IC01MHB4O21hcmdpbi10b3A6IC0yNXB4O30mbHQ7L3N0eWxlJmd0OyZsdDsvaGVhZCZndDsmbHQ7Ym9keSZndDsmbHQ7ZGl2Jmd0O+ato+WcqOaJk+W8gCZsdDsvZGl2Jmd0OyZsdDsvYm9keSZndDsmbHQ7L2h0bWwmZ3Q7'
    };
  },
  methods: {
    addScore(data) {
      let self = this;
      // console.log('addScore data:', data);
      // console.log('methods.addScore:', self.viewSecond);
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
              text: '阅读了 ' + data.minute + ' 分钟，积分已增加',
              type: 'text',
              width: '18em',
              position: 'top'
            });
          } else {
            // console.log('addScore error:', res.Message || '加积分时出错');
          }
          console.log(res.Message);
        });
    }
  },
  mounted() {
    let self = this;
    // 页面加载完成时的时间戳
    let src = self.$route.query.src || '';
    self.readyTime = self.time();
    self.id = self.$route.query.id || '';
    self.title = self.$route.query.title || '';

    // 在页面上停留的秒数
    self.readingHandel = setInterval(() => {
      let online = self.time() - self.readyTime;
      if (online >= 30) {
        let data = {
          id: self.id,
          title: self.title,
          minute: (online / 60).toFixed(1)
        };
        // console.log('data:', data);
        self.addScore(data);
        clearInterval(self.readingHandel);
      }
      console.log('正在阅读……', online);
    }, 1000);
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
      }
    });
  },
  beforeDestroy() {
    try {
      clearInterval(this.readingHandel);
    } catch (error) {}
  }
};
</script>

<style lang="stylus">
.article-detail-doc-reader {
  height 100%
  width 100%
  iframe {
    width 100%
    height 100%
  }
}
</style>
