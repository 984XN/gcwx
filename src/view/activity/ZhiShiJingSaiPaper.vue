<template>
  <container top="0" bottom="0" class="page-activity-zhishijingsai-paper">
    <div class="banner">
      <div class="clock">
        <div class="minute">{{minute}}</div>
        <div class="separator">:</div>
        <div class="second">{{second}}</div>
      </div>
      <div class="tip">答题倒记时</div>
    </div>
    <div class="questions" v-if="index > -1">
      <h1 class="paperTitle">加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！</h1>
      <ol class="questionsContainer">
        <li class="question">
          <dl>
            <dt class="title">
              <div class="index">
                <strong>第{{index+1}}题</strong>
                <span>（共{{list.length}}题）</span>
              </div>
              <div class="text">{{list[index].question}}</div>
            </dt>
            <dd class="content">
              <ol class="answers">
                <li class="answer" v-for="(answer, i) in list[index].options" :key="i">
                  <label>
                    <input @click="write(list[index].id, answer.val)" :checked="answerCard[list[index].id] === answer.val" :type="list[index].inputType" :value="answer.val" :name="'t' + list[index].id + '[]'">
                    <i></i>
                    {{answer.key}}
                  </label>
                </li>
              </ol>
            </dd>
          </dl>
        </li>
      </ol>
      <div class="control">
        <x-button type="warn" action-type="button" @click.native="getNextQuestion">{{buttonText}}</x-button>
      </div>
    </div>
    <div v-transfer-dom>
      <loading :show="loading" text="加载中"></loading>
    </div>
  </container>
</template>

<script>
import { TransferDomDirective as TransferDom } from 'vux';
import { setTimeout } from 'timers';
import * as api from 'src/api/activity';

export default {
  directives: {
    TransferDom
  },
  data() {
    return {
      minute: '-',
      second: '-',
      handle: null,
      during: 666, // 倒计时总秒数
      index: -1, // 答题进度
      checked: false,
      buttonText: '下一题', // 最后一题会变成“交卷”
      loading: false,
      list: [],
      answerCard: {},
      listTpl: [
        {
          question: '八荣八耻是由谁提案的？',
          options: ['胡锦涛', '邓小平', '江泽民', '习近平'],
          answer: 0,
          type: 'radio' // radio or multiselect
        }
      ]
    };
  },
  methods: {
    // 填写答题卡
    write(questionId, selected) {
      this.answerCard[questionId] = selected;
      // this.answerCard.push({
      //   QuestionID: questionId,
      //   SelectedAnswers: selected
      // });
      console.log('this.answerCard:', this.answerCard);
    },
    getNextQuestion(question) {
      let self = this;
      let index = self.index;
      let total = self.list.length;
      if (index < total - 1) {
        self.loading = true;
        setTimeout(function() {
          console.log('人工暂停');
          // 人工暂停(就是外边那个setTimeout)
          self.loading = false;
          self.checked = false;
          self.index++;
          if (self.index === total - 1) {
            self.buttonText = '交卷';
          }
        }, 500);
      } else {
        console.log('答完了：', self.answerCard);
        self.handOver();
      }
    },
    // 倒计时
    countdown() {
      let self = this;
      self.handle = setInterval(function() {
        let during = self.during - 1;
        let minute = parseInt(during / 60);
        let second = parseInt(during % 60);
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        if (during < 0) {
          clearInterval(self.handle);
          console.log('时间到了,自动交卷');
          self.handOver();
        } else {
          self.during = during;
          self.minute = minute;
          self.second = second;
        }
      }, 1000);
    },
    // 交卷
    handOver() {
      let self = this;
      let answerCard = [];
      for (const key in self.answerCard) {
        if (self.answerCard.hasOwnProperty(key)) {
          const val = self.answerCard[key];
          answerCard.push({
            QuestionID: key, // int 题目id,
            SelectedAnswers: val // string 所选答案
          });
        }
      }
      console.log('交卷，答题卡：', answerCard);
      // 交卷获取成绩
      self.$vux.loading.show({
        text: '获取成绩'
      });
      api.activity.examination
        .result({
          list: answerCard,
          PapersID: self.$route.params.id
        })
        .then(res => {
          self.$vux.loading.hide();
          console.log('成绩:', res);
          let lotteryNum = res.Data.lotteryNum;
          let score = res.Data.score;
          // let Message = res.Message;
          // let StatusCode = res.StatusCode;
          let message = '获得' + score + '个积分';
          if (lotteryNum > 0) {
            message += '和' + lotteryNum + '次抽奖机会';
            self.$vux.confirm.show({
              title: '恭喜',
              content: message,
              confirmText: '去抽奖',
              cancelText: '放弃',
              onCancel() {
                self.$router.go(-1);
              },
              onConfirm() {
                self.$router.replace({
                  path: '/activity/choujiangzhuanqu/turntable-question'
                });
              }
            });
          } else {
            self.$vux.alert.show({
              title: '成绩',
              content: message,
              buttonText: '返回上一页',
              onHide() {
                self.$router.go(-1);
              }
            });
          }
        })
        .catch(e => {
          self.$vux.loading.hide();
          self.$vux.confirm.show({
            title: '获取不到成绩',
            content: e.message || '接口数据错误',
            confirmText: '返回上一页',
            cancelText: '关闭提示',
            onConfirm() {
              self.$router.go(-1);
            }
          });
        });
      // return;
    }
  },
  mounted() {
    let self = this;
    self.$vux.loading.show({
      text: '获取试卷'
    });
    self.$nextTick(function() {
      api.activity.examination
        .detail({
          ID: self.$route.params.id || 0,
          api: 'unfinished_20' // 10表示答题促学/20表示知识竞赛
        })
        .then(res => {
          self.$vux.loading.hide();
          console.log('detail:', res);
          let code = res.Data.code || 0;
          if (code === 200) {
            self.index = 0;
            self.during = res.Data.papers.AnswerWhenLong * 60; // 分钟转为秒
            self.list = res.Data.list;
            if (res.Data.list.length === 0) {
              self.$vux.alert.show({
                title: '不能考试',
                content: '试卷中没有题目'
              });
              return false;
            }
            self.countdown();
          } else {
            self.$vux.alert.show({
              title: '出错了',
              content: res.Data.Message || res.Message || '未知错误',
              buttonText: '返回上一页',
              onHide() {
                self.$router.go(-1);
              }
            });
          }
        })
        .catch(e => {
          self.$vux.loading.hide();
          self.$vux.confirm.show({
            title: '获取不到试卷',
            content: e.message || '接口数据错误',
            confirmText: '返回上一页',
            cancelText: '关闭提示',
            onConfirm() {
              self.$router.go(-1);
            }
          });
        });
    });
  }
};
</script>

<style lang="stylus" scoped>
.label.checkbox label,
.label.radio label {
  margin-right 20px
  display inline-block
  margin-bottom 10px
}
label {
  i {
    font-size 12px
    font-style normal
    display inline-block
    width 12px
    height 12px
    text-align center
    line-height 12px
    color #fff
    vertical-align middle
    margin -2px 5px 1px 2px
    box-shadow 0 0 0 1px #CCC
    border 3px solid #FFF
  }
  input[type='checkbox'],
  input[type='radio'] {
    display none
    &:checked + i,
    &:checked + i {
      background #C00
    }
    &:disabled + i,
    &:disabled + i {
      border-color #ccc
    }
    &:checked:disabled + i,
    &:checked:disabled + i {
      background #ccc
    }
  }
  input[type='checkbox'] + i {
    border-radius 3px
  }
  input[type='checkbox']:checked + i {
    border-width 0
    width 18px
    height 18px
    background #fff url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMCAYAAAHzImYpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhGOTFBNzMyOTY5QjExRTc4MUQzQzg4N0Y1NEI0NDBBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhGOTFBNzMzOTY5QjExRTc4MUQzQzg4N0Y1NEI0NDBBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEY5MUE3MzA5NjlCMTFFNzgxRDNDODg3RjU0QjQ0MEEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEY5MUE3MzE5NjlCMTFFNzgxRDNDODg3RjU0QjQ0MEEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4obH11AAABiElEQVR42mI8pyHBwMjAwPCfiXEvCwOYwfCf8dt3RoAAYjwPlAEBJiBWYfjxgwEggBhhaiHKGMHKAAIIrgwGmFB4374xMP1nZPgEZLKCOAxMTAwAAYRiDjoAm/v1GyPImCVALIQuCTIFZDEDIyPYrpj/DAzvgFbchEh+h0gyIZwBEEBwF/4HcdCtY2SYwMSAG0xh+PPnD3YFjAwr/v/585jx958SkBdfoxrLuIvh9+/djH/+dEIC5T+DHlDRT6jkWcafP6cz/Pk7F6YBFPTPgYpEGUD+//7DkeH//wPIJgIEGNZAw+YjLKDzPzNjGcPvP+uZGEgFjAxzQeH6/++fX4yfvzEy/vwVBHIqFxD/A+IfBDRvAvrVl+HnrzzG378hkcLECE8l+sAA+QrEH4BsKXStQI1HwDH66/cKxi9fGRn//p2MHKswQ44DA4EZiJWBBl0AYlCQuAI1ngHif8BQbmH88o2R4e/fZeiakUMeBt4CtYsBaU4gXsX440clw99/u0EJDeZsXAAADlaXC5rnsH0AAAAASUVORK5CYII=') center center no-repeat
  }
  input[type='radio'] + i {
    border-radius 50%
  }
}
.banner {
  background-color #fc5f5a
  color #FFF
  font-size 14px
  padding 30px 40px 20px
  text-align center
  .clock {
    display flex
    line-height 70px
    height 80px
    font-size 48px
    font-family 'digital'
    width 160px
    margin 0 auto
    div.separator {
      width 20px
      text-align center
      line-height 80px
    }
    .minute,
    .second {
      flex 1
      background-color #fff
      color #fc5f5a
      border-radius 5px
      text-align center
      padding 0px 10px
      position relative
      &:after {
        position absolute
        width 1em
        height 1em
        line-height 1em
        text-align center
        left 50%
        bottom 5px
        margin-left -0.5em
        margin-top -0.5em
        font-size 14px
      }
    }
    .minute:after {
      content '分'
    }
    .second:after {
      content '秒'
    }
  }
  .tip {
    padding-top 10px
    text-align center
    color #FFF
  }
}
.paperTitle {
  margin 15px 10px
  padding-left 10px
  font-size 20px
  line-height 1.2
  font-weight normal
  color #ea3d3d
  border-left 5px solid #ea3d3d
}
.questions {
  padding-bottom 65px
}
.question {
  margin 0 10px 10px
  padding 15px
  border-radius 5px
  background-color #fff
  line-height 1
  ol {
    list-style none
  }
  .title {
    .index {
      font-size 12px
      strong {
        font-weight normal
        color rgb(234, 61, 61)
      }
      span {
        color #999
      }
    }
    .text {
      // text-align center
      padding 15px 0 10px
    }
  }
  .answers {
    .answer {
      border-bottom 1px dotted #ececec
      &:last-child {
        border-bottom none
      }
      label {
        display block
        padding 10px
      }
    }
  }
}
.control {
  padding 10px
  position fixed
  left 0
  right 0
  bottom 0
  background-color #fff
  border-top 1px solid #EEE
}
</style>
