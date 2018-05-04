<template>
  <div class="page-activity-jianyanxiance" @keyup.enter="add">
    <group>
      <x-input title="标题" placeholder="请输入内容" v-model="form.title"></x-input>
      <x-textarea title="正文" placeholder="请输入内容" v-model="form.content" :max="1000" :show-counter="true" autosize :height="100" :rows="4"></x-textarea>
      <selector title="建言对象" placeholder="请选择建言对象" v-model="form.target" :options="options"></selector>
    </group>
    <!-- <group title="身份确认">
      <x-input title="姓名" placeholder="无法验证身份" :disabled="true"></x-input>
      <x-input title="手机" placeholder="无法验证身份" :disabled="true"></x-input>
    </group>
    <div class="control">
      <check-icon :value.sync="agree" type="plain"> 同意 </check-icon>
      <a href="javascript:;" class="agree">《相关协议》</a>
    </div> -->
    <div class="control">
      <x-button @click.native="add" type="warn">提交</x-button>
    </div>
  </div>
</template>

<script>
import * as api from 'src/api/activity';

export default {
  data() {
    return {
      form: {
        submitting: false,
        title: '',
        content: '',
        target: '',
        error: '' // formValid 会往这里填充错误信息
      },
      options: [],
      // options: [{ key: 'gd', value: '张小三' }],
      agree: true
    };
  },
  computed: {
    formValid() {
      let self = this;
      let error = [];
      if (self.form.title === '') {
        error.push('请填写标题');
      }
      if (self.form.content === '') {
        error.push('请填写正文');
      } else if (self.form.content.length < 30) {
        error.push('正文至少30个字');
      }
      if (self.form.target === '') {
        error.push('请选择建言对象');
      }
      if (error.length > 0) {
        self.form.error = error.join('、');
      } else {
        self.form.error = '';
      }
      return error.length === 0;
    }
  },
  methods: {
    add() {
      let self = this;
      if (self.form.submitting) {
        return false;
      }
      if (!self.formValid) {
        self.$vux.alert.show({
          title: '数据错误',
          content: self.form.error
        });
        return false;
      }
      self.$vux.loading.show({
        text: '正在提交'
      });
      self.form.submitting = true;
      let params = {
        OrganizationID: self.form.target,
        SuggestionsTitle: self.form.title,
        SuggestionsContent: self.form.content
      };
      api.activity.JianYanXianCe.add(params)
        .then(res => {
          console.log('add res:', res);
          self.form.submitting = false;
          self.$vux.loading.hide();
          if (res.StatusCode === 1200) {
            self.$vux.toast.show({
              text: '提交成功',
              onHide() {
                self.$router.replace({ path: 'records' });
              }
            });
          } else {
            self.$vux.alert.show({
              title: '提交失败',
              content: res.Message
            });
          }
        })
        .catch(e => {
          self.form.submitting = false;
          self.$vux.loading.hide();
          console.error('add res:', e);
        });
    }
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      api.activity.JianYanXianCe.getTargets().then(res => {
        self.options = res.Data;
        console.log('api.activity.JianYanXianCe.getTargets:', res);
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
</style>
