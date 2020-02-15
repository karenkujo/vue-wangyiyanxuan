<template>
  <div class="cart">
    <tab-bar class="tabBar"></tab-bar>
  </div>
</template>

<script>
  import tabBar from '@/components/tabBar/tabBar.vue'
  export default {
    components: {
      "tab-bar": tabBar
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>