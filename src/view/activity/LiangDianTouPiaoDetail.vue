<template>
  <div class="page-activity-liangdiantoupiao-item-detail">
    <container :lazyload="lazyload" @loadData="loadData" bottom="53" top="0">
      <Article :article="article"></Article>
      <group title="投票列表">
        <cell v-for="(v,i) in list" :key="i" :title="v.date" :value="v.title"></cell>
        <cell v-if="!list.length" title="暂时没有人为该项投票"></cell>
      </group>
    </container>
    <div class="voteControl" v-if="!expire">
      <x-button v-if="article.voted === false" @click.native="submit" type="warn" action-type="button">投票</x-button>
      <x-button v-if="article.voted > 0" type="default" action-type="button">投过票了</x-button>
    </div>
  </div>
</template>

<script>
import Article from 'src/components/article';
import * as api from 'src/api/activity';

export default {
  components: {
    Article
  },
  data() {
    return {
      id: 0,
      tid: 0,
      expire: true,
      article: {
        baseInfo: {}
      },
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      list: []
    };
  },
  methods: {
    submit() {
      let self = this;
      let ItemID = [self.id];
      self.$vux.loading.show({
        text: '正在投票'
      });
      api.activity.LiangDianTouPiao.vote({
        // model: [
        //   {ItemID: 6},
        //   {ItemID: 7},
        // ],
        model: [
          {
            ItemID: parseInt(ItemID) // 字符串后台提成成功，实际没成功，需要转 Number
          }
        ]
      })
        .then(res => {
          console.log('vote res:', res);
          self.$vux.loading.hide();
          if (res.StatusCode === 1200) {
            // todo: 这里应该有第二个 StatusCode 用来显示投票是否成功
            self.$vux.alert.show({
              title: '投票成功',
              content: '为“' + self.article.baseInfo.title + '”投票成功'
            });
            // 将“已选”改为“已投”
            self.article.voted = true;
          } else {
            self.$vux.alert.show({
              title: '投票出错',
              content: res.Message || '返回的数据有误',
              cancelText: '过会再试'
            });
          }
        })
        .catch(e => {
          self.$vux.loading.hide();
          self.$vux.alert.show({
            title: '投票出错',
            content: e.message || '接口数据错误',
            cancelText: '知道了'
          });
        });
    },
    loadData() {
      // console.log('XiLieJianHua.loadData...');
      let self = this;
      if (self.lazyload.loading) {
        // console.log('已经在加载中，return');
        return false;
      }
      self.lazyload.loading = true;
      if (self.lazyload.nodata) {
        // console.log('XiLieJianHua.loadData...没有数据了');
        self.lazyload.loading = false;
      } else {
        // console.log('XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据');
        api.activity.LiangDianTouPiao.item
          .records({
            queryModel: {
              ItemID: self.id
            },
            pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          .then(res => {
            if (res.Data.list && res.Data.list.length > 0) {
              self.list = [...self.list, ...res.Data.list];
              self.lazyload.page += 1;
              if (!res.Data.PageIndex) {
                // 没有分页功能
                self.lazyload.nodata = true;
              }
            } else {
              // console.log('木有数据了');
              self.lazyload.nodata = true;
            }
            console.log('loadData list res:', res);
            // console.log('list:', self.list);
            self.lazyload.loading = false;
          });
      }
    }
  },
  mounted() {
    let self = this;
    self.$vux.loading.show({ text: '加载中' });
    self.id = self.$route.params.id || 0;
    self.tid = self.$route.query.tid || 0;
    self.$nextTick(() => {
      // 投票项正文
      api.activity.LiangDianTouPiao.item
        .detail({
          ID: self.id
        })
        .then(res => {
          self.$vux.loading.hide();
          self.article = res.Data.article;
          console.log('投票项:', res);
        });
      // 投票正文（用于判断投票是否结束）
      api.activity.LiangDianTouPiao.items
        .list({
          queryModel: {
            TaskID: self.tid // int
            // Name: self.keyword || null // string 搜索用
          }
        })
        .then(res => {
          if (res.Data.article) {
            let article = res.Data.article || {};
            console.log('投票:', res);
            if (article.end) {
              let dateEndTime = self.time(article.end);
              let nowTime = self.time();
              self.expire = dateEndTime < nowTime;
            }
          }
        });
    });
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>

<style lang="stylus" scoped>
.voteControl {
  position absolute
  left 0
  right 0
  bottom 0
  background-color #fff
  padding 5px 10px
  line-height 30px
  overflow hidden
  border-top 1px solid #e2e2e2
  align-items center
  justify-content center
  button {
  }
}
</style>
