<template>
  <div class="page-hudongzhuanqu-zhengnengliang-list">
    <container top="0" :bottom="containerBottom" @click.native.stop="hideReplyForm" :lazyload="lazyload" @loadData="loadData">
      <no-data v-if="!list.length && !lazyload.loading"></no-data>
      <MessageList v-if="list.length" :list="list" @setReplyInfo="setReplyInfo" @like="like"></MessageList>
    </container>
    <form class="formReply" method="post" @submit.prevent="submit" v-show="form.visible">
      <label>
        <input type="text" v-model="form.content" name="message" :placeholder="replyPlaceholder">
      </label>
      <button @click="submit">回复</button>
    </form>
    <router-link to="add" class="btnAdd" :style="StyleAddMessageBtn">
      <i class="iconfont icon-add"></i>
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue';
import { Config } from 'src/config';
import MessageList from 'src/components/messageList';
import * as api from 'src/api/activity';

export default {
  components: {
    MessageList
  },
  data() {
    return {
      form: {
        visible: false,
        submitting: false,
        message: {}, // 评论的参数，回复留言时用，从这里边提取留言人及留言ID
        reply: {}, // 评论的参数，回复留言下边的评论时用，从这里边提取评论人及评论ID
        content: '' // 回复的内容
      },
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      id: null, // 个人中心 - 我的正能量 - 查看时会通过 id 参数跳转到这个页面
      list: []
    };
  },
  computed: {
    replyPlaceholder: function() {
      let placeholder = '请输入评论内容';
      let maxLength = 10;
      let self = this;
      if (self.form.reply && self.form.reply.author) {
        let tail = self.form.reply.content.length <= maxLength ? '' : '…';
        placeholder =
          '回复“' +
          self.form.reply.author +
          '”的“' +
          self.form.reply.content.replace(/<[^>]+>/g, '').substr(0, 10) +
          tail +
          '”';
      } else if (self.form.message && self.form.message.author) {
        let tail = self.form.message.content.length <= maxLength ? '' : '…';
        placeholder =
          '回复“' +
          self.form.message.author +
          '”的“' +
          self.form.message.content.replace(/<[^>]+>/g, '').substr(0, 10) +
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
    },
    StyleAddMessageBtn: function() {
      let bottom = this.form.visible ? 65 : 20;
      return { bottom: bottom + 'px' };
    }
  },
  methods: {
    loadData() {
      let self = this;
      if (self.lazyload.loading) {
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        self.lazyload.loading = false;
      } else {
        api.activity.ZhengNengLiang.list({
          queryModel: {
            ID: self.id || null,
            IsAdopt: 1 // 1所有人审核通过的，0所有人审核没通过的，默认0
          },
          pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 },
          api: 'all'
        }).then(res => {
          if (res.Data.PageData && res.Data.PageData.length > 0) {
            res.Data.PageData = res.Data.PageData.map(val => {
              return {
                avatar: Config.avatarDefault,
                detailAppended: false,
                viewed: false,
                ...val
              };
            });
            this.list = [...this.list, ...res.Data.PageData];
            self.lazyload.page += 1;
            if (!res.Data.PageIndex) {
              // 没有分页功能
              self.lazyload.nodata = true;
            }
            self.appendDetail();
            self.setViewed();
          } else {
            self.lazyload.nodata = true;
          }
          self.lazyload.loading = false;
          console.log('loadData:', res);
        });
      }
    },
    // 在留言列表中追加图片列表和评论列表及用户头像
    appendDetail() {
      let self = this;
      // console.log('in appendDetail:', self.list);
      let allAppended = true;
      let message = null;
      let index = null;
      for (index = 0; index < self.list.length; index++) {
        let m = self.list[index];
        if (!m.detailAppended) {
          message = m;
          allAppended = false;
          break;
        }
      }
      if (allAppended) {
        return false;
      }
      api.activity.ZhengNengLiang.detail({ ID: message.id })
        .then(res => {
          // console.log('appendDetail res:', message.id);
          let body = res.Data.dynamic[0];
          self.list[index].detailAppended = true;
          self.list[index].avatar = body.PhotoName || Config.avatarDefault;
          self.list[index].replies =
            res.Data.msg.map(val => {
              return {
                id: val.ID || '',
                uid: val.UserID ? val.UserID : '',
                author: val.Commentator || '',
                content: val.CommentContent || '',
                avatar: val.PhotoName || Config.avatarDefault,
                date: val.CommentDate || '',
                comment:
                  val.comment.map(val => {
                    return {
                      id: val.ID || '',
                      uid: val.UserID ? val.UserID : '',
                      author: val.Commentator || '',
                      content: val.CommentContent || '',
                      avatar: val.PhotoName || Config.avatarDefault,
                      date: val.CommentDate || ''
                    };
                  }) || []
              };
            }) || [];
          self.list[index].imgs =
            res.Data.file.map(img => {
              return {
                src: img.FilePath ? img.FilePath.replace(/^~/g, '') : ''
              };
            }) || [];
          Vue.set(self.list, index, self.list[index]);
          // console.log(self.list[index]);
          self.appendDetail();
        })
        .catch(a => {
          // console.log('appendDetail catch:', message.id, a);
          self.list[index].detailAppended = true;
          Vue.set(self.list, index, self.list[index]);
          self.appendDetail();
        });
    },
    // 设为已读
    setViewed() {
      let self = this;
      // console.log('in appendDetail:', self.list);
      let allViewed = true;
      let message = null;
      let index = null;
      for (index = 0; index < self.list.length; index++) {
        let m = self.list[index];
        if (!m.viewed) {
          message = m;
          allViewed = false;
          break;
        }
      }
      if (allViewed) {
        return false;
      }
      api.activity.ZhengNengLiang.setViewed({ ID: message.id })
        .then(res => {
          self.list[index].viewed = true;
          self.setViewed();
        })
        .catch(a => {
          self.list[index].viewed = true;
          self.setViewed();
        });
    },
    // 显示缩略图的大图
    show(index) {
      this.$refs.previewer.show(index);
    },
    // 回复
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
          CommentContent: self.form.content, // 留言内容
          EnergyID: self.form.message.id || null, // 回复给哪条留言
          BeMsgID: self.form.reply.id || null, // 回复给留言下边的哪条评论
          BeUserID: self.form.reply.uid || null, // 被评论人的UID
          UserID: self.form.message.uid || null // 登录人的UserID，不传
        }
      };
      api.activity.ZhengNengLiang.reply(params).then(res => {
        if (res.StatusCode === 1200) {
          self.$vux.toast.show({
            text: '评论成功',
            time: 1000
          });
          // 将评论添加到评论列表中
          const session = self.session('userSystem');
          for (let j = 0; j < self.list.length; j++) {
            const message = self.list[j];
            if (message.id === self.form.message.id) {
              const replies = message.replies;
              let rid = self.form.reply.id || 0;
              // 回复二级评论
              if (rid) {
                for (let i = 0; i < replies.length; i++) {
                  const reply = replies[i];
                  if (reply.id === rid) {
                    self.list[j].replies[i].comment.unshift({
                      author: session.UserName || '',
                      avatar: session.PhotoName || Config.avatarDefault,
                      content: self.form.content,
                      date: self.date('Y-m-d H:i:s'),
                      id: res.Data || -1,
                      uid: session.ID || 0
                    });
                    break;
                  }
                }
                // 回复一级评论
              } else {
                self.list[j].replies.unshift({
                  author: session.UserName || '',
                  avatar: session.PhotoName || Config.avatarDefault,
                  comment: [],
                  content: self.form.content,
                  date: self.date('Y-m-d H:i:s'),
                  id: res.Data || -1,
                  uid: session.ID || 0
                });
              }
              Vue.set(self.list, j, self.list[j]);
              break;
            }
          }
          // 重置数据
          self.form.visible = false;
          self.form.content = '';
          self.form.message = {};
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
    setReplyInfo(message = {}, reply = {}) {
      // console.log('setReplyInfo:', message, reply);
      let self = this;
      let id = message.id || {};
      if (id) {
        self.form.visible = true;
      } else {
        self.form.visible = false;
      }
      self.form.message = message;
      self.form.reply = reply;
      // console.log('self.form:', self.form);
    },
    hideReplyForm() {
      let self = this;
      self.form.visible = false;
      self.form.message = {};
      self.form.reply = {};
      // console.log('hideReplyForm:', this.form);
    },
    like(listIndex, id, liked) {
      let self = this;
      // self.$vux.toast.show({
      //   text: '点赞功能暂未开通',
      //   width: '10em',
      //   type: 'warn'
      // });
      // return false;
      if (!liked) {
        self.list[listIndex].like++;
        api.activity.ZhengNengLiang.like({
          model: {
            Type: '2', // 1.党建动态2.正能量
            ActivityID: id
          }
        }).then(res => {
          if (res.StatusCode === 1200) {
            self.$vux.toast.show({
              text: '已赞'
            });
            self.list[listIndex].liked = !liked;
            Vue.set(self.list, listIndex, self.list[listIndex]);
          } else {
            self.$vux.alert.show({
              title: '点赞失败',
              content: res.Message
            });
          }
        });
        console.log(`给 ${id} 点赞`);
      } else {
        // self.$vux.toast.show({
        //   text: '点赞不可撤消',
        //   type: 'warn'
        // });
        return false;
        // 不能撤消点赞
        // self.list[listIndex].like--;
        // console.log(`撤回对 ${id} 点赞`);
      }
    }
  },
  mounted() {
    // console.log(self.$route);
    let self = this;
    let r = self.$route;
    if (r.query && r.query.id) {
      self.id = r.query.id;
    }
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.page-hudongzhuanqu-zhengnengliang {
  height 100%
  padding-top 1px
  box-sizing border-box
}
.btnAdd {
  position fixed
  right 20px
  bottom 20px
  width 50px
  height 50px
  line-height 50px
  border-radius 5px
  background-color #f17474ba
  text-align center
  z-index 1
  &:hover {
    background-color #f17474
  }
  i {
    color #FFF
    font-size 36px
  }
}
</style>
