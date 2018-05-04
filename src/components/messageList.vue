<template>
  <ol class="messageList">
    <li v-for="(message, messageIndex) in list" :key="messageIndex" class="message">
      <div class="message-head">
        <div class="message-head-avatar">
          <img :src="message.avatar" alt="AVATAR">
        </div>
        <div class="message-head-info">
          <div class="name">{{message.author}}</div>
          <div class="date">{{message.date}}</div>
        </div>
        <div class="message-head-other">
          <x-button mini class="share">
            {{(message.page.page-1) * message.page.size + message.page.index + 1}}
            <sup>#</sup>
            <!-- <i class="iconfont icon-share"></i> -->
          </x-button>
        </div>
      </div>
      <div class="message-body">
        <div v-if="message.content" class="text">
          {{message.content}}
        </div>
        <Matrix v-if="message.imgs" class="imgs" :list="message.imgs"></Matrix>
      </div>
      <div class="message-sns">
        <div class="view">浏览人数：{{message.view}}</div>
        <x-button mini class="reply" @click.native.stop="setReplyInfo(message)">
          <i class="iconfont icon-community"></i>
          {{getReplyNumber(message)}}
        </x-button>
        <x-button mini class="like" :class="{ liked : message.liked }" @click.native.stop="like(messageIndex, message.id, message.liked)">
          <i class="iconfont icon-like"></i>
          {{message.like ? message.like : ''}}
        </x-button>
      </div>
      <div class="replies" v-if="message.replies && message.replies.length">
        <ol class="list">
          <li class="reply" v-for="(reply, replyIndex) in message.replies" :key="replyIndex" @click.stop="setReplyInfo(message, reply)">
            <span class="name">{{reply.author}}</span>
            <span class="content">{{reply.content}}</span>
            <ol class="subList" v-if="reply.comment && reply.comment.length">
              <li class="subReply" v-for="(comment, commentIndex) in reply.comment" :key="commentIndex">
                <span class="name">{{comment.author}}</span>
                <span class="content">{{comment.content}}</span>
                <span class="date">{{comment.date|textTime}}</span>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </li>
  </ol>
</template>

<script>
import Matrix from 'src/components/matrix';

export default {
  components: {
    Matrix
  },
  props: {
    list: Array
  },
  methods: {
    setReplyInfo(message = {}, reply = {}) {
      // console.log('msgList setReplyInfo:', message, reply);
      this.$emit('setReplyInfo', message, reply);
    },
    like(messageIndex, messageId, messageLiked) {
      this.$emit('like', messageIndex, messageId, messageLiked);
    },
    getReplyNumber(message) {
      let number = 0;
      if (message.replies && message.replies.length) {
        number += message.replies.length;
        for (let i = 0; i < message.replies.length; i++) {
          const reply = message.replies[i];
          if (reply.comment && reply.comment.length) {
            number += reply.comment.length;
          }
        }
      }
      return number || '';
    }
  }
};
</script>

<style lang="stylus" scoped>
.messageList {
  margin 10px
  &:after {
    content ''
    display block
    clear both
  }
  .message {
    border-radius 5px
    background-color #FFF
    padding 10px
    width 100%
    box-sizing border-box
    margin-bottom 10px
    float left
    &:last-child {
      margin-bottom 0
    }
    .message-head {
      display flex
      .message-head-avatar {
        width 50px
        height 50px
        margin-right 10px
        background-color #CCC
        color #CCC
        border-radius 50%
        overflow hidden
        img {
          width 100%
          height 100%
        }
      }
      .message-head-info {
        flex 1
        padding-top 5px
        .name {
          font-size 16px
        }
        .date {
          font-size 12px
          color #999
        }
      }
      .message-head-other {
        width 60px
        button {
          float right
          margin 10px 0 0 0
          sup {
            font-size 0.8em
          }
        }
      }
    }
    .message-body {
      .text {
        padding-top 10px
        line-height 1.4
        word-wrap break-word
      }
      .imgs {
        padding-top 10px
        margin-left -5px
      }
    }
    .weui-btn {
      margin -0.5em 0
      padding 0.5em
      line-height 1
      background none
      color #999
      margin-left 10px
      &.weui-btn:not(.weui-btn_disabled):active {
        color rgba(0, 0, 0, 0.6)
        background-color #DEDEDE
      }
      &:after {
        display none
      }
      i {
        color #666
      }
    }
    .message-sns {
      margin-top 10px
      text-align right
      font-size 14px
      line-height 22px
      .view {
        float left
        font-size 12px
        color #999
      }
      .liked {
        color #f17474
        i {
          color #f17474
        }
      }
    }
    .replies {
      border-top 1px solid #eee
      margin-top 10px
      padding-top 10px
      .list {
        list-style none
        font-size 14px
        li.reply {
          margin -5px
          padding 5px
          border-radius 3px
          &:active {
            background #f0f0f0
          }
          .name {
            color #666
            &:after {
              content '：'
            }
          }
          .content {
            color #333
          }
          .date {
            color #CCC
            font-size 12px
            padding-left 10px
          }
          .subList {
            list-style none
            padding-left 2.5em
            li {
              position relative
              &:before {
                content ' '
                display inline-block
                height 12px
                width 6px
                border-width 0 0 2px 2px
                border-color #c8c8cd
                border-style solid
                position absolute
                top 0
                left -15px
              }
            }
          }
        }
      }
    }
  }
}
</style>
