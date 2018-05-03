<template>
  <div class="page-hudongzhuanqu-zhibuejia-liuyanpinglun">
    <container :bottom="containerBottom" @click.native.stop="hideReplyForm" :lazyload="lazyload" @loadData="loadData">
      <MessageList :list="list" @setId4ReplyTo="setId4ReplyTo" @like="like"></MessageList>
    </container>
    <form class="formReply" method="post" @submit.prevent="submit" v-show="form.visible">
      <label>
        <input type="text" v-model="form.content" name="message" placeholder="请输入评论内容">
      </label>
    </form>
    <router-link to="add" class="btnMessageAdd" :style="StyleAddMessageBtn">
      <i class="iconfont icon-roundadd"></i>
    </router-link>
  </div>
</template>

<script>
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
        replyId: 0, // 回复给谁
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
        api.activity
          .getList({
            Type: 2, // 1.心得体会2.留言评论3.思想汇报4.党务咨询
            OrganizationCode: '',
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          .then(res => {
            if (res.Data.PageData && res.Data.PageData.length > 0) {
              this.list = [...this.list, ...res.Data.PageData];
              self.lazyload.page += 1;
            } else {
              self.lazyload.nodata = true;
            }
            self.lazyload.loading = false;
          });
      }
    },
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
