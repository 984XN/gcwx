<template>
  <article class="article">
    <div class="article-head">
      <h1>{{article.baseInfo.title}}</h1>
      <div class="atricle-head-attr">
        <span v-if="article.baseInfo.author" class="author">作者：{{article.baseInfo.author}}</span>
        <span v-if="article.baseInfo.date" class="date">发布：{{article.baseInfo.date}}</span>
        <span v-if="article.baseInfo.view" class="date">阅读：{{article.baseInfo.view}}</span>
      </div>
    </div>
    <div class="article-body">
      <div v-html="article.baseInfo.content" v-if="article.baseInfo.content" class="article-body-content"></div>
      <div v-if="article.imgs && article.imgs.length" class="article-body-files article-body-files-img">
        <div class="weui-cells__title">图片列表</div>
        <div class="article-body-files-img-body">
          <div v-for="(img, index) in article.imgs" :key="index"><img :src="img.src" alt="加载中"></div>
        </div>
      </div>
      <div v-if="article.videos && article.videos.length" class="article-body-files article-body-files-video">
        <div class="weui-cells__title">视频列表</div>
        <div class="article-body-files-video-body">
          <div class="file-item" v-for="(val, index) in article.files" :key="index">
            <video :src="val.path" controls="controls" width="100%">
              您的浏览器不支持本系统的视频播放
            </video>
          </div>
        </div>
      </div>
      <group :title="'文件清单 (共' + article.files.length + '个)'" v-if="article.files && article.files.length" class="article-body-files article-body-files-document">
        <cell :title="(index+1) + '、' + val.name" :link="getArticleLink(val.path)" v-for="(val, index) in article.files" :key="index" class="file-item"></cell>
      </group>
    </div>
    <load-more :show-loading="false" tip="底线"></load-more>
  </article>
</template>

<script>
import { ApiServer } from 'src/config';
import { setInterval, clearInterval } from 'timers';

export default {
  props: {
    article: Object
  },
  data() {
    return {
      serverUrl: ApiServer.origin,
      readingHandel: null,
      readyTime: null
    };
  },
  methods: {
    getArticleLink(path) {
      let url = this.serverUrl + path;
      // console.log('url:', url);
      return url;
    }
  },
  mounted() {
    // 页面加载完成时的时间戳
    this.readyTime = this.time();
    // 在页面上停留的秒数
    this.readingHandel = setInterval(() => {
      this.$emit('online', this.time() - this.readyTime);
    }, 1000);
  },
  beforeDestroy() {
    try {
      clearInterval(this.readingHandel);
    } catch (error) {}
  }
};
</script>

<style lang="stylus" scoped>
.article-body-content {
  margin-bottom 10px
}
.weui-cells__title {
  margin-top 0.77em
  margin-bottom 0.3em
  padding-left 15px
  padding-right 15px
  color #999999
  font-size 14px
}
.article-body-files-document {
  list-style none
  .file-item {
    counter-reset sectioncounter
    a {
      color #999
      display inline-block
      border 1px solid #CCC
      border-radius 3px
      padding 5px 10px
      &:before {
        content counter(sectioncounter) '、'
        counter-increment sectioncounter
      }
    }
  }
}
.article-body-files-video {
  .article-body-files-video-body {
    padding 15px
    background-color #fff
    .file-item {
      margin-bottom 10px
      &:last-child {
        margin-bottom 0
      }
    }
    video {
      background-color #000
      border-radius 3px
      overflow hidden
    }
  }
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
</style>
