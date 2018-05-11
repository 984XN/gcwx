// ./LiuYanPingLunList.vue 与 ./DangWuZiXunList.vue 代码完全一样（除了接口调用时的 Type 参数值）
// 如果其中一个页面有调整，请记得修改另一个文件
// 为什么不是公用组件：各栏目功能不确定、时间不足

<template>
  <div class="page-hudongzhuanqu-zhibuejia-liuyanpinglun">
    <container :bottom="containerBottom" @click.native.stop="hideReplyForm" :lazyload="lazyload" @loadData="loadData">
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
import { System } from 'src/config';
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
      list: [],
      listTpl: [
        {
          id: 1,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: false,
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
          content:
            '跟随组织去保护地球跟随组织去保护地球跟随组织去保护地球跟随组织去保护地球跟随组织去保护地球跟随组织去保护地球跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            }
          ],
          replies: [
            {
              name: '张小三',
              content: '这是一条短的评论'
            },
            {
              name: '李小四',
              content:
                '这是一条非常非常非常非常长的评论，一行有可能都显示不下，不过不知道有没有能显示成一行的大屏'
            },
            {
              name: '张小三',
              content: '这是一条短的评论'
            }
          ]
        }
      ]
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
        api.activity.ZhiBuEJia
          .list({
            Type: 2, // 1.心得体会2.留言评论3.思想汇报4.党务咨询
            OrganizationCode: '',
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          .then(res => {
            if (res.Data.PageData && res.Data.PageData.length > 0) {
              res.Data.PageData = res.Data.PageData.map(val => {
                return {
                  avatar: System.avatarDefault,
                  detailAppended: false,
                  viewed: false,
                  ...val
                };
              });
              this.list = [...this.list, ...res.Data.PageData];
              self.lazyload.page += 1;
              self.appendDetail();
              self.setViewed();
            } else {
              self.lazyload.nodata = true;
            }
            self.lazyload.loading = false;
            // console.log('loadData:', res);
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
      api.activity.ZhiBuEJia
        .detail({ ID: message.id })
        .then(res => {
          // console.log('appendDetail res:', message.id);
          let body = res.Data.activitie[0];
          self.list[index].detailAppended = true;
          self.list[index].avatar = body.PhotoName || System.avatarDefault;
          self.list[index].replies =
            res.Data.Data.map(val => {
              return {
                id: val.ID || '',
                uid: val.UserID ? val.UserID : '',
                author: val.Commentator || '',
                content: val.CommentContent || '',
                avatar: val.PhotoName || System.avatarDefault,
                date: val.CommentDate || '',
                comment:
                  val.comment.map(val => {
                    return {
                      id: val.ID || '',
                      uid: val.UserID ? val.UserID : '',
                      author: val.Commentator || '',
                      content: val.CommentContent || '',
                      avatar: val.PhotoName || System.avatarDefault,
                      date: val.CommentDate || ''
                    };
                  }) || []
              };
            }) || [];
          self.list[index].imgs =
            res.Data.img.map(img => {
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
      api.activity.ZhiBuEJia
        .setViewed({ ForeignID: message.id })
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
          ActivitiesID: self.form.message.id || null, // 回复给哪条留言
          BeUserID: self.form.reply.uid || null, // 被评论人的UID
          BeMsgID: self.form.reply.id || null, // 回复给留言下边的哪条评论
          UserID: self.form.message.uid || null // 登录人的UserID，不传
        }
      };
      api.activity.ZhiBuEJia.reply(params).then(res => {
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
                      avatar: session.PhotoName || System.avatarDefault,
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
                  avatar: session.PhotoName || System.avatarDefault,
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
      self.$vux.toast.show({
        text: '点赞功能暂未开通',
        width: '10em',
        type: 'warn'
      });
      return false;
      // if (!liked) {
      //   self.list[listIndex].like++;
      //   console.log(`给 ${id} 点赞`);
      // } else {
      //   self.list[listIndex].like--;
      //   console.log(`撤回对 ${id} 点赞`);
      // }
      // self.list[listIndex].liked = !liked;
      // Vue.set(self.list, listIndex, self.list[listIndex]);
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
  &:hover {
    background-color #f17474
  }
  i {
    color #FFF
    font-size 36px
  }
}
</style>
