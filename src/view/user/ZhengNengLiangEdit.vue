<template>
  <div class="page-activity-liuyanpinglun-add">
    <!-- <div class="reject" v-if="reject"> {{reject}} </div> -->
    <group title="退回原因" v-if="reject">
      <cell class="reject" :title="reject"></cell>
    </group>
    <group title="基本信息">
      <x-input v-if="useTitle" v-model="title" placeholder="请填写标题"></x-input>
      <x-textarea :max="MaxNumberOfWords" placeholder="请填写内容" v-model="content" :autosize="true"></x-textarea>
    </group>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">添加图片</p>
              <div class="weui-uploader__info">{{files.length}}/{{maxNumberOfFiles}}</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <template v-for="(file, index) in files">
                  <li @click="del(file.uuid)" v-if="file.uploaded && !file.uploadError" :key="index" :style="'background-image:url('+file.src+')'" class="weui-uploader__file weui-uploader__file_status">
                    <div class="weui-uploader__file-content">
                      <i class="iconfont icon-delete"></i>
                    </div>
                  </li>
                  <li @click="del(file.uuid)" v-if="file.uploadError" :key="index" :style="'background-image:url('+file.src+')'" class="weui-uploader__file weui-uploader__file_status">
                    <div class="weui-uploader__file-content">
                      <i class="iconfont icon-error"></i>
                    </div>
                  </li>
                  <li @click="del(file.uuid)" v-if="!file.uploaded && !file.uploadError" :key="index" :style="'background-image:url('+file.src+')'" class="weui-uploader__file weui-uploader__file_status">
                    <div class="weui-uploader__file-content">{{file.pct + '%'}}</div>
                  </li>
                </template>
              </ul>
              <div class="weui-uploader__input-box" v-show="files.length < maxNumberOfFiles">
                <input @change="add2queue($event)" :disabled="uploadBtnDisabled" class="weui-uploader__input" type="file" accept="image/*,video/mp4" :multiple="multiple">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="control">
      <check-icon :value.sync="agree" type="plain"> 同意 </check-icon>
      <a href="javascript:;" class="agree">《相关协议》</a>
    </div> -->
    <div class="control">
      <x-button @click.native="update" type="warn" :disabled="addBtnDisabled">保存</x-button>
      <x-button @click.native="withdraw">删除</x-button>
    </div>
    <!-- <div v-transfer-dom>
      <previewer :list="previewerList" :options="previewerOptions" ref="previewer" @on-index-change="logIndexChange">
        <i class="iconfont icon-delete previewer-delete-icon" @click.prevent.stop="del"></i>
      </previewer>
    </div> -->
  </div>
</template>

<script>
import Vue from 'vue';
// import { Previewer, TransferDom } from 'vux';
import * as api from 'src/api/activity';

export default {
  // directives: {
  //   TransferDom
  // },
  // components: {
  //   Previewer
  // },
  data() {
    return {
      id: 0,
      useTitle: true,
      MaxNumberOfWords: 200,
      maxNumberOfFiles: 10, // 每条记录最大允许上传的文件数量
      files: [],
      title: '',
      content: '',
      reject: false,
      agree: true,
      uploadBtnDisabled: false
      // previewerOptions: {
      //   isClickableElement: function(el) {
      //     return /previewer-delete-icon/.test(el.className);
      //   }
      // }
    };
  },
  computed: {
    // previewerList() {
    //   return this.files.map((val, index, arr) => {
    //     return {
    //       src: val.path
    //       // msrc: val.path, // 缩略图
    //       // w: 800, // 实际尺寸
    //       // h: 400
    //     };
    //   });
    // },
    multiple() {
      return this.mutiUploadable();
    },
    fids() {
      let list = [];
      for (let index = 0; index < this.files.length; index++) {
        list.push(this.files[index].fid);
      }
      return list;
    },
    addBtnDisabled() {
      return (this.useTitle && this.title === '') || this.content === '';
    }
  },
  methods: {
    add2queue(e) {
      let self = this;
      if (self.files.length >= self.maxNumberOfFiles) {
        return false;
      }
      e.preventDefault();
      // 增加上传状态标记
      for (let i = 0; i < e.target.files.length; i++) {
        e.target.files[i].uuid = self.uuid();
        e.target.files[i].pct = 0;
        e.target.files[i].src = self.getObjectURL(e.target.files[i]);
        e.target.files[i].uploadError = false;
        e.target.files[i].uploaded = false;
      }
      // 余位3选了5时多出的2个也要扔掉
      let newFiles = [];
      let surplus = self.maxNumberOfFiles - self.files.length;
      if (surplus >= e.target.files.length) {
        newFiles = e.target.files;
      } else {
        newFiles = Array.from(e.target.files).slice(0, surplus);
        // console.log('newFiles', newFiles);
      }
      // 合并已选文件清单
      self.files = [...self.files, ...newFiles];
      // 上传
      self.upload();
    },
    upload() {
      let self = this;
      let file = null;
      let allUploaded = true;
      let index = null;
      self.uploadBtnDisabled = true;

      for (index in self.files) {
        if (self.files.hasOwnProperty(index)) {
          const f = self.files[index];
          if (!f.uploaded) {
            file = f;
            allUploaded = false;
            break;
          }
        }
      }
      if (allUploaded) {
        self.uploadBtnDisabled = false;
        return false;
      }
      let formData = new FormData();
      formData.append('file', file);
      formData.append('flowChunkNumber', 1);
      formData.append('flowChunkSize', 104857600);
      formData.append('flowCurrentChunkSize', file.size);
      formData.append('flowTotalSize', file.size);
      formData.append('flowIdentifier', '17905-QQ20180427085500png');
      formData.append('flowFilename', 'QQ截图20180427085500.png');
      formData.append('flowRelativePath', 'QQ截图20180427085500.png');
      formData.append('flowTotalChunks', 1);
      api.activity.ZhengNengLiang.upload(formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 0, // 不限制超时时间
        onUploadProgress: function(progressEvent) {
          if (progressEvent.lengthComputable) {
            let pct = Math.ceil(
              progressEvent.loaded / progressEvent.total * 100
            );
            self.files[index].pct = pct;
            Vue.set(self.files, index, self.files[index]);
            // console.log('上传进度：', index, self.files[index].pct);
          }
        }
      })
        .then(function(res) {
          self.files[index].uploadError = false;
          self.files[index].uploaded = true;
          if (res.StatusCode === 1200) {
            try {
              self.files[index].fid = res.Data.Item1 || 0;
              self.files[index].path = res.Data.Item2 || '';
              // console.log('upload res:', self.files[index], res);
            } catch (e) {}
          }
          Vue.set(self.files, index, self.files[index]);
          // 上传下一张
          self.upload();
        })
        .catch(e => {
          console.log('上传出错：', e.message, file.name);
          self.files[index].uploadError = true;
          self.files[index].uploaded = true;
          Vue.set(self.files, index, self.files[index]);
          self.upload();
        });
    },
    del(uuid = '') {
      // 删除图片
      let self = this;
      for (const key in self.files) {
        if (self.files.hasOwnProperty(key)) {
          const item = self.files[key];
          if (item.uuid === uuid) {
            self.files.splice(key, 1);
          }
        }
      }
      // console.log('del:', uuid, self.files);
    },
    withdraw() {
      // 删除，delete 是 JS 关键字不让用
      let self = this;
      self.$vux.confirm.show({
        title: '确定要删除吗？',
        content: '删除后不可恢复，如果要“恢复”你需要重新录入这条信息',
        confirmText: '删除',
        cancelText: '取消',
        onConfirm() {
          self.$vux.loading.show({
            text: '正在删除'
          });
          api.activity.ZhengNengLiang.delete({
            ID: self.id
          }).then(function(res) {
            console.log('api.activity.ZhengNengLiang.delete:', res);
            self.$vux.loading.hide();
            self.$vux.toast.show({
              text: '已删除',
              time: 1000,
              onHide() {
                self.$router.go(-1);
              }
            });
          });
          // .catch(e => {
          //   this.$vux.confirm.show({
          //     title: '提示',
          //     content: e.message || e.Message || '接口数据错误',
          //     confirmText: '再试一次',
          //     cancelText: '关闭提示',
          //     onConfirm() {
          //       self.withdraw();
          //     }
          //   });
          // });
        },
        onCancel() {}
      });
    },
    update() {
      let self = this;
      if (self.title === '' && self.useTitle) {
        self.$vux.toast.show({
          type: 'warn',
          width: '10em',
          text: '请填写标题'
        });
        return false;
      }
      if (self.content === '') {
        self.$vux.toast.show({
          type: 'warn',
          width: '10em',
          text: '请填写内容'
        });
        return false;
      }
      // if (self.content.length < 30) {
      //   self.$vux.toast.show({
      //     type: 'warn',
      //     width: '12em',
      //     text: '内容至少需要30个字'
      //   });
      //   return false;
      // }
      self.$vux.loading.show({
        text: '正在保存'
      });
      api.activity.ZhengNengLiang.update({
        model: {
          ID: self.id,
          PositiveEnergyTitle: self.title,
          PositiveEnergyContent: self.content
        },
        imageID: self.fids
      })
        .then(function(res) {
          self.$vux.loading.hide();
          console.log('update res:', res);
          if (res.StatusCode === 1200) {
            let alertContent = '';
            if (
              self.$route.query &&
              self.$route.query.from &&
              self.$route.query.from === 'user'
            ) {
              alertContent =
                '更新成功，审核通过后即可显示，审核通过前你可以重新编辑';
            } else {
              alertContent =
                '更新成功，审核通过后即可显示，审核状态可在“个人中心-我的正能量”查看';
            }
            self.$vux.alert.show({
              title: '等待审核',
              content: alertContent,
              buttonText: '知道了',
              onHide() {
                self.$router.go(-1);
              }
            });
          } else {
            self.$vux.alert.show({
              title: '更新失败',
              content:
                res.Message || '收到了更新被确认以外的状态码：' + res.StatusCode
            });
          }
        })
        .catch(function() {
          self.$vux.loading.hide();
        });
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.id = self.$route.params.id || 0;
      api.activity.ZhengNengLiang.detail({ ID: self.id }).then(res => {
        console.log('ZhengNengLiang detail res:', res);
        let info = {};
        if (res.Data.article && res.Data.article.baseInfo) {
          info = res.Data.article.baseInfo;
        }
        self.title = info.title || '';
        self.content = info.content || '';
        self.reject = info.reject || false;
        if (res.Data.article && res.Data.article.imgs) {
          self.files = res.Data.article.imgs.map((v, i, a) => {
            return {
              id: v.id,
              src: v.src,
              uuid: v.id ? 'EDIT_SIGN_' + v.id : 'EDIT_SIGN_' + i,
              uploaded: true
            };
          });
        }
      });
    });
  }
};
</script>

<style lang="stylus" scoped>
.page-activity-jianyanxiance {
  padding-top 1px // 子元素有 mt，也可以用 bd
}
.agree {
  color #666
}
.control {
  margin 15px
}
.icon-error {
  font-size 36px
  color #C00
}
// .reject {
//   margin 10px
//   padding 15px
//   background #FFEB3B
//   border-left solid 3px #FF5722
//   color #C00
//   font-size 16px
//   // &:before {
//   //   content '退回原因：'
//   //   display block
//   //   font-size 12px
//   // }
// }
.reject {
  color #c00
}
</style>
