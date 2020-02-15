<template>
  <div class="tabBar">
      <router-link class="index" to="/index">
        <div class="icon"></div>
        <span>首页</span>
      </router-link>
      <router-link class="category" to="/category">
        <div class="icon"></div>
        <span>分类</span>
      </router-link>
      <router-link class="cart" to="/cart">
        <div class="icon"></div>
        <span>购物车</span>
      </router-link>
      <router-link class="my" to="/my">
        <div class="icon"></div>
        <span>我的</span>
      </router-link>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>