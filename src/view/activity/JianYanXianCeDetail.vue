<template>
  <div class="page-activity-jianyanxiance">
    <container :bottom="containerBottom" top="0" @click.native.stop="hideReplyForm">
      <Article :article="article" @online="online" @setReplyInfo="setReplyInfo"></Article>
    </container>
    <form class="formReply" method="post" @submit.prevent="submit" v-show="form.visible">
      <label>
        <input type="text" v-model="form.content" name="message" :placeholder="replyPlaceholder">
      </label>
      <button @click="submit">回复</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import { System } from 'src/config';
import Article from 'src/components/article';
import * as api from 'src/api/activity';

export default {
  components: {
    Article
  },
  data() {
    return {
      form: {
        visible: false,
        submitting: false,
        content: '',
        reply: {}
      },
      article: {
        baseInfo: {}
      }
    };
  },
  computed: {
    replyPlaceholder: function() {
      let placeholder = '请输入回复内容';
      let maxLength = 10;
      let self = this;
      if (self.form.reply && self.form.reply.author) {
        let tail = self.form.reply.content.length <= maxLength ? '' : '…';
        placeholder =
          '回复“' +
          self.form.reply.author +
          '”的“' +
          self.form.reply.content.substr(0, 10) +
          tail +
          '”';
      }
      return placeholder;
    },
    containerBottom: function() {
      // replyForm 显示时 bottom 45px
      let bottom = this.form.visible ? 45 : 0;
      // console.log('bottom', bottom);
      return bottom;
    }
  },
  methods: {
    submit() {
      let self = this;
      if (self.form.submitting) {
        return false;
      }
      // console.log('form.submited', this.form);
      if (self.form.content === '') {
        this.$vux.toast.show({
          text: '请填写评论内容',
          width: '10em',
          time: 1000,
          type: 'warn'
        });
        return false;
      }
      self.form.submitting = true;
      let params = {
        model: {
          BeUserID: self.form.reply.uid || null,
          SuggestionsID: self.$route.params.id || null,
          CommentContent: self.form.content,
          BeMsgID: self.form.reply.id || null
        }
      };
      api.activity.JianYanXianCe.reply(params).then(res => {
        if (res.StatusCode === 1200) {
          self.$vux.toast.show({
            text: '评论成功',
            time: 1000
          });
          // 将评论添加到评论列表中
          const session = self.session('userSystem');
          for (let i = 0; i < self.article.replies.length; i++) {
            const reply = self.article.replies[i];
            if (reply.id === self.form.reply.id) {
              self.article.replies[i].comment.unshift({
                author: session.UserName || '',
                avatar: session.PhotoName || System.avatarDefault,
                content: self.form.content,
                date: self.date('Y-m-d H:i:s'),
                id: res.Data || -1,
                uid: session.ID || 0
              });
              Vue.set(self.article.replies, i, self.article.replies[i]);
              break;
            }
          }
          // 重置数据
          self.form.visible = false;
          self.form.content = '';
          self.form.reply = {};
        } else {
          self.$vux.alert.show({
            title: '评论失败',
            content: res.Message
          });
        }
        self.form.submitting = false;
      });
      return false;
    },
    // 设置被回复消息的ID，用于replyForm
    setReplyInfo(reply = {}) {
      // console.log('setReplyInfo:', reply);
      let self = this;
      let id = reply.id || {};
      if (id) {
        self.form.visible = true;
      } else {
        self.form.visible = false;
      }
      self.form.reply = reply;
      console.log('self.form:', self.form);
    },
    hideReplyForm() {
      let self = this;
      self.form.visible = false;
      self.form.reply = {};
      // console.log('hideReplyForm:', this.form);
    },
    online(second) {}
  },
  mounted() {
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
      api.activity.JianYanXianCe.detail({
        ID: id
      })
        .then(res => {
          this.$vux.loading.hide();
          this.article = res.Data.article;
          if (
            res.Data.suggestions &&
            res.Data.suggestions[0] &&
            res.Data.suggestions[0].OrganizationName
          ) {
            this.article.baseInfo.content =
              '<div><span style="font-size:14px;color:#999;">建言对象：</span><br />' +
              res.Data.suggestions[0].OrganizationName +
              '</div><span style="font-size:14px;color:#999;">建言内容：</span><br />' +
              this.article.baseInfo.content;
          }
          console.log('detail:', res);
        })
        .catch(e => {
          this.$vux.loading.hide();
          this.$vux.confirm.show({
            title: '出错了',
            content: e.message || '接口数据错误',
            confirmText: '返回上一页',
            cancelText: '关闭提示',
            onConfirm() {
              this.$router.go(-1);
            }
          });
        });
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>
