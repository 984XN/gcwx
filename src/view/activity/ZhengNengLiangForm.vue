<template>
  <div class="page-activity-zhengnengliang-add">
    <group title="正文">
      <x-textarea :max="200" placeholder="请输入内容" v-model="content"></x-textarea>
    </group>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">图片上传</p>
              <div class="weui-uploader__info">0/2</div>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderFiles">
                <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                <li class="weui-uploader__file" style="background-image:url(./images/pic_160.png)"></li>
                <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                  <div class="weui-uploader__file-content">
                    <i class="iconfont icon-error"></i>
                  </div>
                </li>
                <li class="weui-uploader__file weui-uploader__file_status" style="background-image:url(./images/pic_160.png)">
                  <div class="weui-uploader__file-content">50%</div>
                </li>
              </ul>
              <div class="weui-uploader__input-box">
                <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="">
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
      <x-button type="warn">提交</x-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      agree: true
    };
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
