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
          <div class="file-item" v-for="(val, index) in article.videos" :key="index">
            <video :src="val.path" controls="controls" width="100%">
              您的浏览器不支持本系统的视频播放
            </video>
          </div>
        </div>
      </div>
      <group v-if="article.files && article.files.length" :title="'文件清单 (共' + article.files.length + '个)'" class="article-body-files article-body-files-document">
        <cell :title="(index+1) + '、' + val.name" :link="getArticleLink(val.path)" v-for="(val, index) in article.files" :key="index" class="file-item"></cell>
      </group>
      <div v-if="article.replies && article.replies.length" class="article-body-files article-body-files-reply">
        <div class="weui-cells__title">评论列表</div>
        <div class="article-body-files-reply-body">
          <ol class="list">
            <li class="reply" v-for="(reply, replyIndex) in article.replies" :key="replyIndex">
              <x-button mini class="btn" @click.native.stop="setReplyInfo(reply, replyIndex)">
                <i class="iconfont icon-community"></i>
                <span class="text">回复</span>
              </x-button>
              <span class="name">{{reply.author}}</span>
              <span class="date">{{reply.date|textTime}}</span>
              <span class="content">{{reply.content}}</span>
              <ol class="subList" v-if="reply.comment && reply.comment.length">
                <li class="subReply" v-for="(comment, commentIndex) in reply.comment" :key="commentIndex">
                  <span class="name">{{comment.author}}</span>
                  <span class="date">{{comment.date|textTime}}</span>
                  <span class="content">{{comment.content}}</span>
                </li>
              </ol>
            </li>
          </ol>
        </div>
      </div>
    </div>
    <load-more :show-loading="false" tip="底线"></load-more>
  </article>
</template>

<script>
import { setInterval, clearInterval } from 'timers';

export default {
  props: {
    article: Object
  },
  data() {
    return {
      fileServer: process.env.FILE_SERVER,
      readingHandel: null,
      readyTime: null
    };
  },
  methods: {
    getArticleLink(path) {
      let url = this.fileServer + path;
      // console.log('url:', url);
      return url;
    },
    setReplyInfo(reply = {}) {
      // console.log('msgList setReplyInfo:', message, reply);
      this.$emit('setReplyInfo', reply);
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
.article-body-files-reply {
  .article-body-files-reply-body {
    background-color #fff
    ol {
      list-style none
    }
    li.reply {
      border-bottom 1px solid #EEE
      padding 10px 15px
      &:last-child {
        border-bottom none
      }
      & > .btn {
        float right
        font-size 12px
        padding 0 0.5em
        line-height 20px
        color #999
        i {
          font-size 12px
        }
      }
      & > .content {
        padding-top 5px
        display block
        clear both
      }
      .name {
        font-size 14px
        color #f17474
      }
      .date {
        font-size 10px
        color #999
      }
      .subList {
        padding-left 10px
        margin-left 10px
        border-left 1px solid #eee
        list-style none
        .subReply {
          margin 10px 0
        }
        .content {
          display block
        }
      }
    }
  }
}
</style>
