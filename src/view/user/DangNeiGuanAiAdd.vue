<template>
  <div class="page-user-dangneiguanai-add">
    <group title="基本信息">
      <x-input v-if="useTitle" v-model="title" placeholder="请填写标题"></x-input>
      <x-input v-if="useTitle" v-model="address" placeholder="请填写住址"></x-input>
      <x-textarea :max="MaxNumberOfWords" placeholder="请填写内容" v-model="content" :autosize="true"></x-textarea>
    </group>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">上传凭证图片</p>
              <div class="weui-uploader__info">{{files.length}}/{{maxNumberOfFiles}}</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <template v-for="(file, index) in files">
                  <li @click="del(file.uuid)" v-if="file.uploaded && !file.uploadError" :key="index" :style="'background-image:url('+file.corver+')'" class="weui-uploader__file weui-uploader__file_status">
                    <div class="weui-uploader__file-content">
                      <i class="iconfont icon-delete"></i>
                    </div>
                  </li>
                  <li @click="del(file.uuid)" v-if="file.uploadError" :key="index" :style="'background-image:url('+file.corver+')'" class="weui-uploader__file weui-uploader__file_status">
                    <div class="weui-uploader__file-content">
                      <i class="iconfont icon-error"></i>
                    </div>
                  </li>
                  <li @click="del(file.uuid)" v-if="!file.uploaded && !file.uploadError" :key="index" :style="'background-image:url('+file.corver+')'" class="weui-uploader__file weui-uploader__file_status">
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
      <x-button @click.native="add" type="warn" :disabled="addBtnDisabled">提交审核</x-button>
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
import * as api from 'src/api/user';

export default {
  // directives: {
  //   TransferDom
  // },
  // components: {
  //   Previewer
  // },
  data() {
    return {
      useTitle: true,
      MaxNumberOfWords: 200,
      maxNumberOfFiles: 10, // 每条记录最大允许上传的文件数量
      files: [],
      title: '',
      address: '',
      content: '',
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
      return (this.useTitle && this.title === '') || this.content === '' || this.files.length === 0;
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
        e.target.files[i].corver = self.getObjectURL(e.target.files[i]);
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
      api.user.DangNeiGuanAi.upload(formData, {
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
            self.files[index].fid = res.Data.Item1 || 0;
            self.files[index].path = res.Data.Item2 || '';
            // console.log('upload res:', self.files[index], res);
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
    add() {
      let self = this;
      if (self.title === '' && self.useTitle) {
        self.$vux.toast.show({
          type: 'warn',
          width: '10em',
          text: '请填写标题'
        });
        return false;
      }
      if (self.address === '') {
        self.$vux.toast.show({
          type: 'warn',
          width: '10em',
          text: '请填写住址'
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
      if (self.files.length > 0) {
        self.$vux.toast.show({
          type: 'warn',
          width: '10em',
          text: '请上传凭证图片'
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
        text: '正在提交'
      });
      api.user.DangNeiGuanAi.add({
        model: {
          ApplyForTitle: self.title,
          ProposerAddress: self.address,
          ProposerCondition: self.content
        },
        imageID: self.fids
      })
        .then(function(res) {
          self.$vux.loading.hide();
          console.log('add res:', res);
          if (res.StatusCode === 1200) {
            let alertContent = '信息已提交，请等待审核，如果审核拒绝你可以整理资料后重新提交申请';
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
              title: '提交失败',
              content: res.Message
            });
          }
        })
        .catch(function() {
          self.$vux.loading.hide();
        });
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.page-activity-dangneiguanai-add {
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
</style>
