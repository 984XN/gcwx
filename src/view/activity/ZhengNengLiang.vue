<template>
  <div class="page-hudongzhuanqu-zhengnengliang">
    <ol class="messageList">
      <li v-for="(item, index) in list" :key="index">
        <div class="message-head">
          <div class="message-head-avatar">
            <img :src="item.avatar" alt="AVATAR">
          </div>
          <div class="message-head-info">
            <div class="name">{{item.name}}</div>
            <div class="date">{{item.date}}</div>
          </div>
          <div class="message-head-other">
            <x-button mini class="like">
              <i class="iconfont icon-share"></i>
            </x-button>
          </div>
        </div>
        <div class="message-body">
          <div v-if="item.content" class="text">
            {{item.content}}
          </div>
          <Matrix v-if="item.imgs" class="imgs" :list="item.imgs"></Matrix>
        </div>
        <div class="message-sns">
          <div class="view">浏览人数：524</div>
          <x-button mini class="reply">
            <i class="iconfont icon-community"></i>
          </x-button>
          <x-button mini class="like">
            <i class="iconfont icon-like"></i> 524
          </x-button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import Matrix from 'src/components/matrix';
import { Previewer, TransferDom, XButton } from 'vux';

export default {
  directives: {
    TransferDom
  },
  components: {
    Previewer,
    Matrix,
    XButton
  },
  methods: {
    show(index) {
      this.$refs.previewer.show(index);
    }
  },
  data() {
    return {
      list: [
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
        },
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
        },
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
        },
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
        },
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
        },
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
        },
        {
          name: '刘傅傅',
          date: '02-26 17:53:11',
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
          ]
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
  li {
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
      margin 0
      padding 0 0.5em
      line-height 1
      background none
      color #999
      margin-left 10px
      i {
        color #666
      }
      &:after {
        display none
      }
    }
    .message-sns {
      margin-top 10px
      text-align right
      font-size 14px
      .view {
        float left
        font-size 12px
        color #999
      }
    }
  }
}
</style>
