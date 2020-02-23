<template>
  <div class="collection">
    <v-title>我的收藏</v-title>
    <div class="collectList" v-if="collectList.length">
      <div class="content">
        <div class="collect-item" v-for="(item, index) of collectList" :key="index" @click="toGoodsDetail(item.id)">
          <img :src="item.list_pic_url" alt="">
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.retail_price}}</div>
        </div>
      </div>
    </div>
    <div class="empty" v-else>您还没有收藏哦</div>
  </div>
</template>

<script>
  import Title from '@/components/title/title.vue'
  import { get } from '@/api/index.js'
  export default {
    data () {
      return {
        userId: '',
        collectList: []
      }
    },
    methods: {
      async getCollection () {
        const data = await get('/my/getCollection', {
          userId: this.userId
        })
        this.collectList = data.collectList
      },
      toGoodsDetail (id) {
        this.$router.push({
          path: '/goodsDetail',
          query: {
            id: id
          }
        })
      }
    },
    created() {
      this.userId = JSON.parse(localStorage.getItem("user")).userId
      this.getCollection()
    },
    components: {
      "v-title": Title
    }
  }
</script>

<style lang="less" scoped>
@import './index.less';
</style>