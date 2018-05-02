<template>
  <div class="page-activity-liuyanpinglun-add">
    <group title="正文">
      <x-textarea :max="200" placeholder="请输入内容" v-model="content"></x-textarea>
    </group>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片上传</p>
              <div class="weui-uploader__info">{{files.length}}/{{maxNumberOfFiles}}</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <template v-for="(file, index) in files">
                  <li @click="del(file.uuid)" v-if="file.uploaded && !file.uploadError" :key="index" :style="'background-image:url('+file.corver+')'" class="weui-uploader__file"></li>
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
                <input @change="add2queue($event)" class="weui-uploader__input" type="file" accept="image/*" multiple="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="control">
      <check-icon :value.sync="agree" type="plain"> 同意 </check-icon>
      <a href="javascript:;" class="agree">《相关协议》</a>
    </div>
    <div class="control">
      <x-button @click.native="add" type="warn">提交</x-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import * as api from 'src/api/activity.js';

export default {
  data() {
    return {
      maxNumberOfFiles: 10,
      files: [],
      content: '',
      agree: true
    };
  },
  computed: {
    fids() {
      let list = [];
      for (let index = 0; index < this.files.length; index++) {
        list.push(this.files[index].fid);
      }
      return list;
    }
  },
  methods: {
    add2queue(e) {
      let self = this;
      if (self.files.length >= self.maxNumberOfFiles) {
        return false;
      }
      e.preventDefault();
      for (let i = 0; i < e.target.files.length; i++) {
        e.target.files[i].uuid = self.uuid();
        e.target.files[i].pct = 0;
        e.target.files[i].corver = self.getObjectURL(e.target.files[i]);
        e.target.files[i].uploadError = false;
        e.target.files[i].uploaded = false;
      }
      self.files = [...self.files, ...e.target.files];
      // console.log(e.target.files, self.files);
      self.upload();
    },
    upload() {
      let self = this;
      let file = null;
      let allUploaded = true;
      let index = null;

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
      if (allUploaded) return false;
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
      api.activity
        .upload(formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
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
            console.log('upload res:', self.files[index], res);
          }
          Vue.set(self.files, index, self.files[index]);
          // 上传下一张
          self.upload();
        })
        .catch(() => {
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
      api.activity
        .add({
          model: {
            ExperienceTitle: '',
            ExperienceContent: self.content,
            Type: 2 // 1.心得体会2.留言评论3.思想汇报4.党务咨询
          },
          List: self.fids
        })
        .then(function(res) {
          console.log('add res:', res);
          if (res.StatusCode === 1200) {
            self.$vux.toast.show({
              text: '添加成功',
              onHide() {
                console.log("Plugin: I'm hiding");
              }
            });
          } else {
            self.$vux.alert.show({
              title: '添加失败',
              content: res.Message,
              onShow() {
                console.log("Plugin: I'm showing");
              },
              onHide() {
                console.log("Plugin: I'm hiding now");
              }
            });
          }
        });
    }
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
</style>
