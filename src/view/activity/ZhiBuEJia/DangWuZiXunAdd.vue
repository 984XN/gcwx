<template>
  <add-from :typeId="typeId" :useTitle="useTitle" :MaxNumberOfWords="MaxNumberOfWords"></add-from>
</template>

<script>
import AddFrom from './add.component';

export default {
  components: {
    AddFrom
  },
  data() {
    return {
      typeId: 4, // 1.心得体会2.留言评论3.思想汇报4.党务咨询
      useTitle: false,
      MaxNumberOfWords: 200
    };
  }
};
</script>
