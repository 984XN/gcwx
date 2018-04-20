<template>
  <div class="page-hudongzhuanqu-zhibuejia-liuyanpinglun">
    <container :bottom="containerBottom" @click.native.stop="hideReplyForm">
      <MessageList :list="list" @setId4ReplyTo="setId4ReplyTo" @like="like"></MessageList>
    </container>
    <form class="formReply" method="post" @submit.prevent="submit" v-show="form.visible">
      <label>
        <input type="text" v-model="form.content" name="message" placeholder="请输入评论内容">
      </label>
    </form>
    <router-link to="zhibuejia/add" class="btnMessageAdd" :style="StyleAddMessageBtn">
      <i class="iconfont icon-roundadd"></i>
    </router-link>
  </div>
</template>

<script>
import MessageList from 'src/components/messageList';

export default {
  components: {
    MessageList
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
        this.list[listIndex].like++;
        console.log(`给 ${id} 点赞`);
      } else {
        this.list[listIndex].like--;
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
        },
        {
          id: 2,
          name: '刘傅傅',
          avatar:
            'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
          date: '02-26 17:53:11',
          liked: true,
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
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
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
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
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
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
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
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
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
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
          like: Math.floor(Math.random() * 1000),
          view: Math.floor(Math.random() * 1000),
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
