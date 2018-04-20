<template>
  <container top="0" bottom="0" class="page-activity-datucuxue-paper">
    <div class="banner">
      <div class="sign">
        <div class="main">
          <div class="t1">党章党规</div>
          <div class="t2">系列考试</div>
        </div>
      </div>
      <div class="attr">
        <div class="item">考试类型：常规考试</div>
        <div class="item">题目数量：17</div>
        <div class="item">总分：170分（每题10分）</div>
        <div class="item">考生：特朗普</div>
      </div>
    </div>
    <div class="questions">
      <h1 class="paperTitle">加满油 把稳舷 鼓足劲！ 习主席的这些话特别提气！</h1>
      <ol class="questionsContainer">
        <li class="question">
          <dl>
            <dt class="title">
              <div class="index">
                <strong>第1题</strong>
                <span>（共17题）</span>
              </div>
              <div class="text">八荣八耻是由谁提案的？</div>
            </dt>
            <dd class="content">
              <ol class="answers">
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    胡锦涛
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    邓小平
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    江泽民
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    习近平
                  </label>
                </li>
              </ol>
            </dd>
          </dl>
        </li>
        <li class="question">
          <dl>
            <dt class="title">
              <div class="index">
                <strong>第2题</strong>
                <span>（共17题）</span>
              </div>
              <div class="text">八荣八耻是由谁提案的？</div>
            </dt>
            <dd class="content">
              <ol class="answers">
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    胡锦涛
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    邓小平
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    江泽民
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    习近平
                  </label>
                </li>
              </ol>
            </dd>
          </dl>
        </li>
        <li class="question">
          <dl>
            <dt class="title">
              <div class="index">
                <strong>第1题</strong>
                <span>（共17题）</span>
              </div>
              <div class="text">八荣八耻是由谁提案的？</div>
            </dt>
            <dd class="content">
              <ol class="answers">
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    胡锦涛
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    邓小平
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    江泽民
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="checkbox" name="t1">
                    <i></i>
                    习近平
                  </label>
                </li>
              </ol>
            </dd>
          </dl>
        </li>
        <li class="question">
          <dl>
            <dt class="title">
              <div class="index">
                <strong>第2题</strong>
                <span>（共17题）</span>
              </div>
              <div class="text">八荣八耻是由谁提案的？</div>
            </dt>
            <dd class="content">
              <ol class="answers">
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    胡锦涛
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    邓小平
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    江泽民
                  </label>
                </li>
                <li class="answer">
                  <label>
                    <input type="radio" name="t1">
                    <i></i>
                    习近平
                  </label>
                </li>
              </ol>
            </dd>
          </dl>
        </li>
      </ol>
      <div class="control">
        <x-button type="warn" action-type="button">交卷</x-button>
      </div>
    </div>
  </container>
</template>

<style lang="stylus" scoped>
.label.checkbox label,
.label.radio label {
  margin-right 20px
  display inline-block
  margin-bottom 10px
}
label i {
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
.banner {
  background-color rgb(234, 61, 61)
  color #FFF
  display flex
  font-size 14px
  .sign {
    width 40%
    display flex
    justify-content center
    align-items center
    .main {
      border 2px solid #FFF
      width 70px
      height 80px
      border-radius 5px
      position relative
      div {
        width 1em
        padding 0px 5px
        line-height 1
        background-color rgb(234, 61, 61)
        position absolute
        &.t1 {
          font-size 20px
          left 8px
          top -13px
        }
        &.t2 {
          font-size 16px
          right 8px
          top 23px
        }
      }
    }
  }
  .attr {
    flex 1
    line-height 1.6
    padding 30px 0
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
