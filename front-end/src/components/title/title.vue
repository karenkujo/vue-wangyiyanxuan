<template>
  <div class="title">
    <div class="icon" @click="goBack"></div>
    <div class="title-text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    },
  }
</script>

<style lang="less" scoped>
@import './index.less';
</style>