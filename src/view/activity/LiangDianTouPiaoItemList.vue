<template>
  <div class="page-activity-liangdiantoupiao-vote">
    <container :lazyload="lazyload" @loadData="loadData" bottom="41" top="0">
      <div class="banner" :style="bannerStyle" :class="{hasBg: article.cover}">
        <div class="title">{{article.title}}</div>
        <div class="subTitle">{{article.cover}}</div>
        <form class="search">
          <input type="text" placeholder="请输入编号或关键字" v-model="keyword">
          <button @click.native="query">
            <i class="iconfont icon-search"></i>
          </button>
        </form>
        <div class="tip">友情提示：每位用户只有一次投票机会</div>
      </div>
      <ol class="voteList">
        <li v-for="(v,i) in list" :key="i" class="vote">
          <div @click="jumpTo(v)" class="baseInfo">
            <img :src="v.thumb" :alt="v.title" class="thumb">
            <div class="title" v-html="v.title"></div>
          </div>
          <div class="attr">
            <div class="votes">票数：{{v.votes}}</div>
            <div class="index">编号：V{{v.id|strPad(maxIdLen,'0')}}</div>
          </div>
          <div class="control">
            <x-button @click.native="select(v)" v-if="!v.voted" mini :type="v.selected ? 'primary' : 'default'">{{v.selected ? '已选' : '选择'}}</x-button>
            <x-button v-if="v.voted" mini disabled>已投</x-button>
          </div>
        </li>
      </ol>
    </container>
    <div v-transfer-dom>
      <popup v-model="selectedVisible">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead style="background-color:#F7F7F7;">
            <tr>
              <th colspan="2" v-html="selectedText"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(v,i) in selected" :key="i">
              <td>编号：V{{v.id|strPad(maxIdLen,'0')}}</td>
              <td>{{v.title|substr(0,10)}}</td>
            </tr>
            <tr v-if="selected.length === 0">
              <td colspan="2">暂无数据</td>
            </tr>
          </tbody>
        </x-table>
      </popup>
    </div>
    <div v-if="!article.voted" class="voteControl">
      <x-button @click.native="submit" :disabled="!selected.length" type="warn" mini action-type="button">投票</x-button>
      <div class="text" v-html="selectedText" @click="showSelected"></div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
import { XTable, Popup, TransferDomDirective as TransferDom } from 'vux';
import * as api from 'src/api/activity';

export default {
  directives: {
    TransferDom
  },
  components: {
    XTable,
    Popup
  },
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      id: 0,
      keyword: '',
      article: {},
      list: [],
      selected: [],
      selectedVisible: false
    };
  },
  computed: {
    maxIdLen() {
      let self = this;
      let listLength = self.list.length + '';
      let maxIdLen = listLength.length;
      return maxIdLen;
    },
    selectedText() {
      let self = this;
      let len = self.selected.length;
      let text = '<span style="color:#CCC">提示：请选择待投项后点击投票</span>';
      if (len) {
        text = '选择了' + len + '项';
      }
      return text;
    },
    bannerStyle() {
      let self = this;
      let style = {};
      if (self.article.cover) {
        style.backgroundImage = 'url(' + self.article.cover + ')';
        style.backgroundColor = '#C00';
        style.textShadow = '0 1px 1px rgba(0,0,0,.7)';
        style.backgroundSize = 'cover';
      }
      return style;
    }
  },
  methods: {
    select(obj) {
      let self = this;
      // console.log('obj:', JSON.parse(JSON.stringify(obj)));
      // console.log('selected:', JSON.parse(JSON.stringify(self.selected)));
      // console.log('list:', JSON.parse(JSON.stringify(self.list)));
      let found = false;
      let selectedIndex = -1;
      let listIndex = -1;
      for (
        selectedIndex = 0;
        selectedIndex < self.selected.length;
        selectedIndex++
      ) {
        const selectedItem = self.selected[selectedIndex];
        if (selectedItem.id === obj.id) {
          found = true;
          break;
        }
      }
      // 选中：存入 this.selected[] 并将 this.list[] 中相应的项添加 selected=true 属性
      if (found) {
        console.log('found:', JSON.parse(JSON.stringify(self.selected)));
        self.selected.splice(selectedIndex, 1);
      } else {
        self.selected.push(obj);
      }
      for (listIndex = 0; listIndex < self.list.length; listIndex++) {
        const listItem = self.list[listIndex];
        if (listItem.id === obj.id) {
          if (found) {
            self.list[listIndex].selected = false;
          } else {
            self.list[listIndex].selected = true;
          }
        }
      }
      // 升序重排
      self.selected.sort(function(x, y) {
        return x.id - y.id;
      });
      // 更新模板
      // Vue.set(self.selected, selectedIndex, self.selected[selectedIndex]);
      // Vue.set(self.list, listIndex, self.list[listIndex]);
    },
    jumpTo(item) {
      let path = '../detail/' + item.id;
      let self = this;
      self.$router.push({
        path
      });
    },
    showSelected() {
      let self = this;
      if (!self.selected.length) {
        self.selectedVisible = false;
      } else {
        self.selectedVisible = !self.selectedVisible;
      }
    },
    query() {
      let self = this;
      self.list = [];
      self.selected = [];
      if (!self.keyword) {
        self.$vux.toast.show({
          time: 500,
          text: '请填写搜索词'
        });
      } else {
        self.submit();
      }
    },
    submit() {
      let self = this;
      let ItemID = self.selected.map(v => {
        return {
          ItemID: v.id
        };
      });
      self.$vux.loading.show({
        text: '正在投票'
      });
      api.activity.LiangDianTouPiao.vote({
        // model: {
        //   ItemID: [6, 7]
        // },
        model: ItemID
      })
        .then(res => {
          console.log('vote res:', res);
          self.$vux.loading.hide();
          if (res.StatusCode === 1200) {
            // todo: 这里应该有第二个 StatusCode 用来显示投票是否成功
            let voteCount = self.selected.length;
            self.$vux.alert.show({
              title: '投票成功',
              content: '已成功为' + voteCount + '项投了票'
            });
            // 将“已选”改为“已投”
            for (let i = 0; i < self.list.length; i++) {
              const item = self.list[i];
              if (item.selected) {
                self.list[i].voted = true;
                delete self.list[i].selected;
              }
            }
            // 清空已选
            self.selected = [];
            // 标记整个投票活动为已投
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
        api.activity.LiangDianTouPiao.items
          .list({
            queryModel: {
              TaskID: self.id, // int
              Name: self.keyword || null // string 搜索用
            }
            // pageModel: { Page: self.lazyload.page, Start: 0, Limit: 10 }
          })
          .then(res => {
            if (res.Data.list && res.Data.list.length > 0) {
              self.article = res.Data.article || {};
              self.list = [...self.list, ...res.Data.list];
              self.lazyload.page += 1;
              self.lazyload.nodata = true; // 没有分页功能
            } else {
              // console.log('木有数据了');
              self.lazyload.nodata = true;
            }
            console.log('loadData list res:', res);
            console.log('list:', self.list);
            self.lazyload.loading = false;
          });
      }
    }
  },
  mounted() {
    console.log('$route:', this.$route);
    this.id = this.$route.params.id || 0;
    this.keyword = this.$route.params.keyword || '';
  }
};
</script>

<style lang="stylus" scoped>
.banner {
  background-color #e64340
  color #FFF
  padding 30px 0 100px
  text-align center
  line-height 1.2
  position relative
  &:after {
    background linear-gradient(transparent, #f6f6f6 100%)
    position absolute
    left 0
    right 0
    bottom 0
    height 100px
    content ''
    display block
  }
  .title {
    font-size 48px
    height 1.2em
    line-height 1.2
    overflow hidden
  }
  .subTitle {
    margin 10px
    font-size 12px
    line-height 1.2
    height 1.2em
    overflow hidden
  }
  .search {
    width 60%
    margin 20px auto
    background-color #fff
    padding-right 50px
    position relative
    border-radius 25px
    overflow hidden
    input {
      display block
      width 100%
      height 40px
      line-height 40px
      box-sizing border-box
      border none
      background none
      outline none
      padding-left 18px
      font-size 14px
    }
    button {
      position absolute
      right 0
      top 0
      box-sizing border-box
      width 50px
      height 40px
      background none
      border none
    }
  }
  .tip {
    font-size 12px
    padding-bottom 10px
    color #ffffffbd
  }
  &.hasBg {
    .title,
    .subTitle {
      visibility hidden
    }
  }
}
.voteList {
  position relative
  margin -100px 10px 10px
  border-radius 5px
  padding 5px
  background-color #fff
  list-style none
  position relative
  &:after {
    content ''
    display block
    clear both
  }
  .vote {
    padding 5px
    border-radius 5px
    box-sizing border-box
    width 50%
    float left
    .baseInfo {
      position relative
      &:after {
        content ''
        display block
        clear both
      }
      .thumb {
        display block
        width 100%
        min-height 120px
        float left
        background-color #C00
      }
      .title {
        position absolute
        left 0
        right 0
        bottom 0
        padding 5px
        background-color rgba(0, 0, 0, 0.3)
        color #FFF
        font-size 12px
        overflow hidden
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        -webkit-line-clamp 1
      }
    }
    .attr {
      font-size 12px
      color #999
      padding 5px
      .votes {
        float right
      }
    }
    .control {
      line-height 2.3
      font-size 12px
      text-align center
      .order { // 排名名次
        color #E64340
        font-size 14px
      }
      button {
        // float right
      }
    }
  }
}
.voteControl {
  position absolute
  left 0
  right 0
  bottom 0
  background-color #fff
  padding 5px 10px
  height 30px
  line-height 30px
  overflow hidden
  border-top 1px solid #e2e2e2
  align-items center
  justify-content center
  .text {
    font-size 14px
    text-align center
  }
  button {
    float right
  }
}
</style>
