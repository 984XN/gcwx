<template>
  <container top="0" bottom="0" v-if="article.title">
    <article class="article">
      <div class="article-head">
        <h1>{{article.title}}</h1>
        <div class="atricle-head-attr">
          <!-- <span v-if="article.author" class="author">申请人：{{article.author}}</span> -->
          <span v-if="article.date" class="date">申请于 {{article.date}}</span>
        </div>
      </div>
      <div class="article-body">
        <!-- 1待审核、2.审核通过、3审核退回 -->
        <div class="process" :class="statusClass">
          <step v-model="processStep">
            <step-item title="发起申请"></step-item>
            <step-item title="正在审核"></step-item>
            <step-item title="审核结束"></step-item>
          </step>
          <div class="process-text" v-if="article.statusCode !== 2 || article.statusCode !== 3">
            {{article.process}}
          </div>
          <ol class="records" v-if="article.records.length">
            <li v-for="(r, index) in article.records" :key="index">
              <div class="date">{{r.date}}</div>
              <div class="name">{{r.organization}}</div>
              <div class="remark">{{r.remark}}</div>
            </li>
          </ol>
        </div>
        <div v-html="$options.filters.clearStyle(article.content)" v-if="article.content" class="article-body-content"></div>
        <div v-if="article.imgs && article.imgs.length" class="article-body-files article-body-files-img">
          <div class="weui-cells__title">图片列表</div>
          <div class="article-body-files-img-body">
            <div v-for="(img, index) in files" :key="index"><img :src="img.src" :alt="img.name || img.remark"></div>
          </div>
        </div>
      </div>
      <load-more :show-loading="false" tip="底线"></load-more>
    </article>
  </container>
</template>

<script>
import * as api from 'src/api/user';
import { Step, StepItem } from 'vux';

export default {
  components: {
    Step,
    StepItem
  },
  data() {
    return {
      article: {}
    };
  },
  computed: {
    processStep: {
      get: function() {
        let self = this;
        let step = 0; // 只要进这个页面就是第一步（第一步是0）
        let code = parseInt(self.article.statusCode);
        code = isNaN(code) ? 0 : code;
        if (code === 1) {
          // 1待审，2通过，3拒绝
          step = 1;
        } else if (code === 2 || code === 3) {
          step = 2;
        }
        return step;
      },
      set: function() {}
    },
    files() {
      let self = this;
      return [...self.article.imgs, ...self.article.records];
    },
    statusClass() {
      let self = this;
      let classVal = [];
      // 1待审核、2.审核通过、3审核退回，2和3都是完成（通过或拒绝）
      switch (self.article.statusCode) {
        case 1:
          classVal.push('step2');
          break;
        case 2:
        case 3:
          classVal.push('step3');
          break;
        default:
          classVal.push('step1');
      }
      // 1待审核、2.审核通过、3审核退回
      switch (self.article.statusCode) {
        case 1:
          classVal.push('stepIng');
          break;
        case 2:
          classVal.push('stepPass');
          break;
        case 3:
          classVal.push('stepReject');
          break;
      }
      return classVal.join(' ');
    }
  },
  methods: {
    online(second) {}
  },
  mounted() {
    let self = this;
    let id = self.$route.params.id || 0;
    self.$nextTick(function() {
      // console.log('self.$route', self.$route);
      if (!id) {
        self.$router.replace({
          path: '/',
          query: { error: 'missing-id', from: self.$route.fullPath }
        });
      }
      self.$vux.loading.show({
        text: '正在获取数据'
      });
      api.user.DangNeiGuanAi.detail({
        ID: parseInt(id)
      })
        .then(res => {
          self.$vux.loading.hide();
          console.log('detail:', res);
          if (res.Data.article) {
            self.article = res.Data.article;
          }
        })
        .catch(() => {
          self.$vux.loading.hide();
          self.$router.go(-1);
        });
    });
  }
};
</script>

<style lang="stylus" scoped>
.process {
  padding 20px
  background-color #fff
  border-bottom 1px solid #EEE
}
.process-text {
  margin-top 20px
  position relative
  padding 10px
  border 1px dotted #5fae62
  background-color #e1ffc2
  font-size 14px
  text-align center
  border-radius 5px
  &:after {
    content ''
    background-color #e1ffc2
    border 1px dotted #5fae62
    border-right-color transparent
    border-bottom-color transparent
    width 10px
    height 10px
    margin-left -6px
    transform rotate(45deg)
    position absolute
    left 50%
    top -6px
  }
}
.process.step1 .process-text:after {
  left 10%
}
.process.step2 .process-text:after {
  left 50%
}
.process.step3 .process-text:after {
  left 90%
}
.process.step3.stepReject .process-text {
  border-color #C00
  background-color #ffded3
  color #C00
  &:after {
    background-color #ffded3
    border-left-color #C00
    border-top-color #C00
  }
}
.weui-cells__title {
  margin-top 0.77em
  margin-bottom 0.3em
  padding-left 15px
  padding-right 15px
  color #999999
  font-size 14px
}
.article-body-files-img {
  .article-body-files-img-body {
    padding 10px
    background-color #fff
    text-align center
    img {
      max-width 90%
      border solid 2px #f0f0f0
    }
  }
}
.records {
  list-style none
  border 1px solid #DDD
  border-radius 5px
  margin-top 10px
  font-size 12px
  li {
    border-bottom 1px solid #EEE
    padding 10px
    &:last-child {
      border-bottom none
    }
    .date {
      color #999
    }
    .name {
      color #000
    }
    .remark {
      font-size 14px
      color #333
      position relative
      padding-left 15px
      overflow hidden
      &:before {
        content '“'
        color #CCC
        font-size 36px
        line-height 1
        position absolute
        left 0
        top -5px
      }
    }
  }
}
</style>
