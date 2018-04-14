<template>
  <div class="page-hudongzhuanqu-zhengnengliang">
    <template v-if="$route.name === 'zhengnengliang'">
    <Container top="0" :bottom="containerBottom" @click.native.stop="hideReplyForm">
      <ol class="messageList">
        <li v-for="(message, messageIndex) in list" :key="messageIndex" class="message">
          <div class="message-head">
            <div class="message-head-avatar">
              <img :src="message.avatar" alt="AVATAR">
            </div>
            <div class="message-head-info">
              <div class="name">{{message.name}}</div>
              <div class="date">{{message.date}}</div>
            </div>
            <div class="message-head-other">
              <x-button mini class="like">
                <i class="iconfont icon-share"></i>
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
            <div class="view">浏览人数：524</div>
            <x-button mini class="reply" @click.native.stop="setId4ReplyTo(message.id)">
              <i class="iconfont icon-community"></i>
            </x-button>
            <x-button mini class="like" :class="{ liked : message.liked }" @click.native.stop="like(messageIndex, message.id, message.liked)">
              <i class="iconfont icon-like"></i> 524
            </x-button>
          </div>
          <div class="replies" v-if="message.replies.length">
            <ol class="list">
              <li class="reply" v-for="(reply, replyIndex) in message.replies" :key="replyIndex">
                <span class="name">{{reply.name}}</span>
                <span class="content">{{reply.content}}</span>
              </li>
            </ol>
          </div>
        </li>
      </ol>
    </Container>
    <form class="formReply" method="post" @submit.prevent="submit" v-show="form.visible">
      <label>
        <input type="text" v-model="form.content" name="message" placeholder="请输入评论内容">
      </label>
    </form>
    <router-link to="zhengnengliang/add" class="btnMessageAdd" :style="StyleAddMessageBtn">
      <i class="iconfont icon-roundadd"></i>
    </router-link>
    </template>
    <template v-if="$route.name !== 'zhengnengliang'">
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import Container from 'src/components/container';
import Matrix from 'src/components/matrix';
import { Previewer, TransferDom, XButton } from 'vux';

export default {
  directives: {
    TransferDom
  },
  components: {
    Container,
    Previewer,
    Matrix,
    XButton
  },
  methods: {
    // 显示缩略图的大图
    show(index) {
      this.$refs.previewer.show(index);
    },
    // 回复
    submit() {
      console.log('form.submited', this.form);
      return false;
    },
    // 设置被回复消息的ID，用于replyForm
    setId4ReplyTo(id) {
      if (id) {
        this.form.visible = true;
      } else {
        // 0 值用于隐藏 replyForm
        this.form.visible = false;
      }
      this.form.replyId = id;
      // console.log('this.form:', this.form);
    },
    hideReplyForm() {
      this.setId4ReplyTo(0);
    },
    like(listIndex, id, liked) {
      if (!liked) {
        console.log(`给 ${id} 点赞`);
      } else {
        console.log(`撤回对 ${id} 点赞`);
      }
      this.list[listIndex].liked = !liked;
    }
  },
  computed: {
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
  data() {
    return {
      form: {
        visible: false,
        replyId: 0, // 回复给谁
        content: '' // 回复的内容
      },
      list: [
        {
          id: 1,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: false,
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
        },
        {
          id: 2,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          content: '跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            }
          ],
          replies: []
        },
        {
          id: 3,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          content: '跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            }
          ],
          replies: []
        },
        {
          id: 4,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          content: '跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            }
          ],
          replies: []
        },
        {
          id: 5,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          content: '跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            }
          ],
          replies: []
        },
        {
          id: 6,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          content: '跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            }
          ],
          replies: []
        },
        {
          id: 7,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          content: '跟随组织去保护地球',
          imgs: [
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
              w: 800,
              h: 400
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
              w: 1200,
              h: 900
            },
            {
              msrc:
                'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
              src:
                'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
            }
          ],
          replies: []
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.page-hudongzhuanqu-zhengnengliang {
  height 100%
  padding-top 1px
  box-sizing border-box
}
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
        }
      }
    }
    .message-body {
      .text {
        padding-top 10px
        line-height 1.4
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
        .name {
          color #333
          &:after {
            content '：'
          }
        }
        .content {
          color #999
        }
      }
    }
  }
}
.formReply {
  position fixed
  left 0
  right 0
  bottom 0
  height 44px
  background #f0f0f0
  border-top 1px solid #d4d4d4
  label {
    display block
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    padding 5px 10px
    input {
      display block
      width 100%
      height 34px
      padding 0 5px
      border-radius 3px
      box-sizing border-box
      border solid 1px #d4d4d4
      outline none
      background #FFF
    }
  }
}
.btnMessageAdd {
  position fixed
  right 20px
  bottom 50px
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
