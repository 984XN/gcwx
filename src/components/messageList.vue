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
        <div v-if="message.content" class="text" v-html="message.content"></div>
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
            <span class="date">{{reply.date|textTime}}</span>
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
