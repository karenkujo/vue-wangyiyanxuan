<template>
  <div class="index">
    <tab-bar class="tabBar"></tab-bar>
    <div class="search" @click="toSearch">
      <div class="content">
        <div class="icon"></div>
        <input type="text" placeholder="搜索商品" disabled>
      </div>
    </div>
  </div>
</template>

<script>
  import tabBar from '@/components/tabBar/tabBar.vue'
  export default {
    methods: {
      toSearch () {
        this.$router.push({ path: '/search'})
      }
    },
    components: {
      "tab-bar": tabBar
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>