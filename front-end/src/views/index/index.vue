<template>
  <div class="index">
    <tab-bar class="tabBar"></tab-bar>
    <div class="search" @click="toSearch">
      <div class="content">
        <div class="icon"></div>
        <input type="text" placeholder="搜索商品" disabled>
      </div>
    </div>
    <div class="swiper-wrapper">
      <swiper :banner="banner"></swiper>
    </div>
    <div class="channel">
      <div class="channel-item" v-for="(item, index) in channelList" :key="index">
        <img :src="item.icon_url" alt="">
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import tabBar from '@/components/tabBar/tabBar.vue'
  import swiper from '@/components/swiper/swiper.vue'
  import {get, post} from '@/api/index.js'
  export default {
    data() {
      return {
        banner: [],
        channelList: []
      }
    },
    methods: {
      toSearch() {
        this.$router.push({ path: '/search' })
      },
      async getData () {
        let data = await get('/index/data')
        console.log(data)
        this.banner = data.banner
        this.channelList = data.channelList
      }
    },
    components: {
      "tab-bar": tabBar,
      "swiper": swiper
    },
    created() {
      this.getData()
    },
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>