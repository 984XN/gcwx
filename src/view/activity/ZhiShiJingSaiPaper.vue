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
      <h1 class="paperTitle" v-html="paper.title"></h1>
      <ol class="questionsContainer">
        <li class="question">
          <dl>
            <dt class="title">
              <div class="index">
                <strong>第{{index+1}}题</strong>
                <span>（共{{paper.count || list.length}}题）</span>
                <span class="questionType">({{list[index].typeCn}})</span>
              </div>
              <div class="text">{{list[index].question}}</div>
            </dt>
            <dd class="content">
              <ol class="answers">
                <li class="answer" v-for="(answer, i) in list[index].options" :key="i">
                  <label>
                    <input :checked="checked(list[index].id, answer.val)" :type="list[index].inputType" :value="answer.val" v-model="answerCard[list[index].id]" :name="'t_' + list[index].id + '_' + i">
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
        <div>
          <x-button type="default" action-type="button" @click.native="cancel">放弃答题</x-button>
        </div>
        <div>
          <x-button type="warn" action-type="button" @click.native="getNextQuestion">{{buttonText}}</x-button>
        </div>
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
      duration: 0, // 倒计时总秒数
      timer: 0, // 答题所用秒数
      index: -1, // 答题进度
      buttonText: '下一题', // 最后一题会变成“交卷”
      loading: false,
      answerCard: {},
      paper: {},
      list: [],
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
    // getQuestionType(enType) {
    //   let type = '未知试题类型' + enType;
    //   switch (enType) {
    //     case 'radio':
    //       type = '单选题';
    //       break;
    //     case 'multiselect':
    //       type = '多选题';
    //       break;
    //   }
    //   return type;
    // },
    checked(id, val) {
      let self = this;
      let type = '';
      let checked = false;
      for (const v of self.list) {
        if (v.id === id) {
          type = v.type;
          break;
        }
      }
      if (type === 'radio') {
        if (self.answerCard[id] === val) {
          checked = true;
        }
      } else if (type === 'multiselect') {
        for (const v of self.answerCard[id]) {
          if (v === val) {
            checked = true;
            break;
          }
        }
      } else {
        console.error('未知的答案类型：', type);
      }
      return checked;
    },
    getNextQuestion() {
      let self = this;
      let index = self.index;
      let total = self.list.length;
      if (index < total - 1) {
        self.loading = true;
        setTimeout(function() {
          console.log('人工暂停');
          // 人工暂停(就是外边那个setTimeout)
          self.loading = false;
          // self.checked = false;
          self.index++;
          if (self.index === total - 1) {
            self.buttonText = '提交试卷';
          }
        }, 100);
      } else {
        console.log('答完了：', self.answerCard);
        self.submit();
      }
    },
    // 倒计时
    countdown() {
      let self = this;
      self.handle = setInterval(function() {
        let duration = self.duration - 1;
        let minute = parseInt(duration / 60);
        let second = parseInt(duration % 60);
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        if (duration < 0) {
          clearInterval(self.handle);
          console.log('时间到了,自动交卷');
          self.submit();
        } else {
          self.duration = duration;
          self.minute = minute;
          self.second = second;
          self.timer++;
        }
      }, 1000);
    },
    // 交卷
    submit() {
      let self = this;
      let answerCard = [];
      clearInterval(self.handle);
      for (const key in self.answerCard) {
        if (self.answerCard.hasOwnProperty(key)) {
          const val = self.answerCard[key];
          let isArray =
            typeof val === 'object' &&
            Object.prototype.toString.call(val) === '[object Array]';
          let isString = typeof val === 'string';
          if (isArray) {
            answerCard.push({
              QuestionID: key, // int 题目id,
              SelectedAnswers: val.join(',') // string 所选答案
            });
          } else if (isString) {
            answerCard.push({
              QuestionID: key, // int 题目id,
              SelectedAnswers: val // string 所选答案
            });
          } else {
            console.error('未知的答案类型', val);
          }
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
          if (res.StatusCode) {
            if (res.StatusCode !== 1200) {
              let message = res.Message || '错误码' + res.StatusCode;
              self.$vux.alert.show({
                title: '提示',
                content: '出错了：' + message
              });
            }
            if (res.StatusCode === 1200) {
              let accuracy = res.Data.accuracy; // 正确率
              let lotteryNum = res.Data.lotteryNum; // 获得N次抽奖机会
              let integral = res.Data.integral; // 获得N个积分
              let score = res.Data.score; // 成绩是这个分数
              let rid = res.Data.rid || 0;
              let pass = res.Data.pass || false;
              let threshold = res.Data.threshold || false;
              let message = '';
              let motto = '';
              let title = '';
              let clock = {
                minute: Math.floor(self.timer / 60),
                second: self.timer % 60
              };
              clock = clock.minute
                ? `${clock.minute}分${clock.second}秒`
                : `${clock.second}秒`;
              if (pass) {
                title = '恭喜你<br />答题成功';
                message = `恭喜你得到了${score}分的高分，正确率达到了${accuracy}`;
                motto = '不要骄傲继续加油哦！！';
              } else {
                title = '好可惜<br />答题失败';
                message = `很遗憾你的正确率低于${threshold}%，未通过，你的正确率为${accuracy}，分数为${score}分`;
                message = `未通过，你的分数为${score}分，用时${clock}`;
                motto = '不要泄气，努力就有好成绩！！';
              }
              // let Message = res.Message;
              // let StatusCode = res.StatusCode;
              if (integral > 0) {
                message += `，获得了${integral}积分`;
              }
              if (lotteryNum > 0) {
                message += '和' + lotteryNum + '次抽奖机会';
                self.faceAlert.show({
                  title,
                  content: `<div style="color:#E64340">${message}</div><div style="font-size:0.8em;color:#666;">${motto}</div>`,
                  type: pass ? 'success' : 'fail', // success fail
                  cancelText: '放弃',
                  confirmText: '去抽奖',
                  onCancel() {
                    self.$router.go(-1);
                  },
                  onConfirm() {
                    self.$router.replace({
                      path: '/activity/choujiangzhuanqu/turntable-question',
                      query: { rid }
                    });
                  }
                });
              } else {
                self.faceAlert.show({
                  title,
                  content: `<div style="color:#E64340">${message}</div><div style="font-size:0.8em;color:#666;">${motto}</div>`,
                  type: pass ? 'success' : 'fail', // success fail
                  cancelText: false,
                  confirmText: '返回上一页',
                  onConfirm() {
                    self.$router.go(-1);
                  }
                });
              }
            }
          } else {
            self.$vux.confirm.show({
              title: '获取不到成绩数据',
              content: JSON.stringify(res) || '接口数据错误',
              confirmText: '返回上一页',
              cancelText: '关闭提示',
              onConfirm() {
                self.$router.go(-1);
              }
            });
          }
        });
      // .catch(e => {
      //   self.$vux.loading.hide();
      //   self.$vux.confirm.show({
      //     title: '获取不到成绩',
      //     content: e.message || e.Message || '接口数据错误',
      //     confirmText: '返回上一页',
      //     cancelText: '关闭提示',
      //     onConfirm() {
      //       self.$router.go(-1);
      //     }
      //   });
      // });
      // return;
    },
    cancel() {
      let self = this;
      api.activity.examination
        .unlock({ ID: self.$route.params.id })
        .then(res => {
          self.$router.go(-1);
          console.log('api.activity.examination.unlock res:', res);
        });
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
            self.paper = res.Data.paper || {};
            self.list = res.Data.list;
            self.duration = self.paper.duration * 60; // 分钟转为秒
            if (self.list.length === 0) {
              self.$vux.alert.show({
                title: '不能考试',
                content: '试卷中没有题目'
              });
              return false;
            } else if (self.list.length === 1) {
              self.buttonText = '提交试卷';
            }

            // 答题卡初始化（后台接口要求每道题都必需传值，未答的填写空的字符串，不能是null）
            self.list.forEach(v => {
              if (v.type === 'radio') {
                self.answerCard[v.id] = '';
              } else if (v.type === 'multiselect') {
                self.answerCard[v.id] = [];
              } else {
                self.answerCard[v.id] = '';
              }
            });
            console.log(self.answerCard);
            self.countdown();
          } else {
            self.$vux.alert.show({
              title: '提示',
              content: res.Data.Message || res.Message || '未知错误',
              buttonText: '返回上一页',
              onHide() {
                self.$router.go(-1);
              }
            });
          }
        });
      // .catch(e => {
      //   self.$vux.loading.hide();
      //   self.$vux.confirm.show({
      //     title: '获取不到试卷',
      //     content: e.message || e.Message || '接口数据错误',
      //     confirmText: '返回上一页',
      //     cancelText: '关闭提示',
      //     onConfirm() {
      //       self.$router.go(-1);
      //     }
      //   });
      // });
    });
  },
  beforeDestroy() {
    let self = this;
    clearInterval(self.handle);
    console.log('beforeDestroy 销毁定时器');
  },
  activated() {
    this.scrollTo(this);
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
  word-wrap break-word
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
      word-wrap break-word
      word-break break-all
      line-height 1.4
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
        word-wrap break-word
        word-break break-all
      }
    }
  }
}
.control {
  padding 5px
  position fixed
  left 0
  right 0
  bottom 0
  background-color #fff
  border-top 1px solid #EEE
  display flex
  div {
    flex 1
    padding 5px
  }
}
</style>
