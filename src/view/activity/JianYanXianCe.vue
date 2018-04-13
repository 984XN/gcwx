<template>
  <div class="page-hudongzhuanqu-jianyanxiance">
    <group>
      <x-input title="标题" placeholder="请输入内容" v-model="title"></x-input>
      <x-textarea title="正文" placeholder="请输入内容" v-model="content" :max="200" :show-counter="true" autosize :height="100" :rows="4"></x-textarea>
      <selector title="建言对象" placeholder="请选择建言对象" v-model="target" :options="options"></selector>
    </group>
    <group title="身份确认">
      <x-input title="姓名" placeholder="无法验证身份" :disabled="true"></x-input>
      <x-input title="手机" placeholder="无法验证身份" :disabled="true"></x-input>
    </group>
    <div class="control">
      <check-icon :value.sync="agree" type="plain"> 同意 </check-icon><a href="javascript:;" class="agree">《相关协议》</a>
    </div>
    <div class="control">
      <x-button type="warn">提交</x-button>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton, XTextarea, Selector, CheckIcon } from 'vux';

export default {
  components: {
    XInput,
    XButton,
    Group,
    XTextarea,
    Selector,
    CheckIcon
  },
  data() {
    return {
      title: '',
      content: '',
      target: '',
      options: [{ key: 'gd', value: '张小三' }, { key: 'gx', value: '李小四' }],
      agree: true
    };
  }
};
</script>

<style lang="stylus" scoped>
.page-hudongzhuanqu-jianyanxiance {
  padding-top 1px // 子元素有 mt，也可以用 bd
}
.agree {
  color #666;
}
.control {
  margin 15px
}
</style>
