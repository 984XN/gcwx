<template>
  <container :lazyload="lazyload" @loadData="loadData" bottom="0" top="0" class="page-user-score">
    <no-data v-if="!list.length && !lazyload.loading"></no-data>
    <panel v-if="list.length" :header="title" :list="list" type="4"></panel>
  </container>
</template>

<script>
import { Panel } from 'vux';
import * as api from 'src/api/user';

export default {
  components: {
    Panel
  },
  data() {
    return {
      lazyload: {
        enable: true,
        nodata: false,
        loading: false,
        page: 1
      },
      categories: {
        tongzhigonggao: {
          key: 'TongZhiGongGao',
          value: '通知公告'
        },
        dangwugongkai: {
          key: 'DangWuGongKai',
          value: '党务公开'
        },
        dangjiandongtai: {
          key: 'DangJianDongTai',
          value: '党建动态'
        }
      },
      type: '',
      list: []
    };
  },
  computed: {
    title() {
      let self = this;
      let title = self.categories[self.type]
        ? self.categories[self.type].value
        : '列表';
      document.title = title;
      return title;
    }
  },
  methods: {
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
        // console.log( 'XiLieJianHua.loadData...加载第 ' + self.lazyload.page + ' 页数据' );
        let url =
          self.categories && self.categories[self.type]
            ? self.categories[self.type].key
            : '';
        if (!url) {
          self.$vux.alert.show({
            title: '接口错误',
            content: ' 找不到接口：' + self.type,
            buttonText: '返回上一页',
            onHide() {
              self.$router.go(-1);
            }
          });
        }
        if (url) {
          api.user.article
            .list({
              pageModel: { Page: self.lazyload.page, Start: 0, Limit: 20 },
              api: url
            })
            .then(res => {
              console.log('loadData res:', res);
              self.score =
                res.Data.sumScore && res.Data.sumScore[0]
                  ? res.Data.sumScore[0].AddScore
                  : 0;
              if (res.Data.list && res.Data.list.length > 0) {
                let list = res.Data.list.map(v => {
                  return {
                    title: v.title,
                    desc: v.content.replace(/<[^>]+>/g, '').substr(0, 60),
                    url: {
                      path: '../detail/' + v.id + '?type=' + self.type
                    },
                    meta: {
                      date: v.date
                    }
                  };
                });
                self.list = [...self.list, ...list];
                self.total = res.Data.RowCount;
                self.lazyload.page += 1;
                if (!res.Data.PageIndex) {
                  // 没有分页功能
                  self.lazyload.nodata = true;
                }
              } else {
                // console.log('木有数据了');
                self.lazyload.nodata = true;
              }
              self.lazyload.loading = false;
            })
            .catch(e => {
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
        }
      }
    }
  },
  mounted() {
    let self = this;
    self.type = self.$route.params.type || 'tongzhigonggao';
    console.log('mounted:', self.type);
  },
  activated() {
    this.scrollTo(this);
  }
};
</script>
