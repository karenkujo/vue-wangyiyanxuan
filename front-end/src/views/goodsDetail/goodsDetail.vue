<template>
  <div class="goodsDetail">
    <v-title>商品详情</v-title>
    <v-swiper :banner="banner" :height="10" ></v-swiper>
    <div class="guarantee">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="goodsInfo">
      <div class="name">{{info.name}}</div>
      <div class="desc">{{info.goods_brief}}</div>
      <div class="price">￥{{info.retail_price}}</div>
    </div>
    <div class="section" @click="selectType">
      <div class="text">请选择规格数量</div>
      <div class="icon"></div>
    </div>
    <!-- 选择规格数量弹出框 -->
    <van-action-sheet v-model="showType"  className="selectType" :round="false">
      <div class="content">内容</div>
    </van-action-sheet>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import Swiper from '@/components/swiper/swiper'
  import {get, post} from '@/api/index.js'
  import { ActionSheet } from 'vant';
  export default {
    data () {
      return {
        userId: '',
        goodsId: '',
        banner: [],
        info: {},
        brand: {},
        showType: false
      }
    },
    methods: {
      // 获取当前页面数据
      async getGoodsData () {
        let data = await get('/goodsDetail/goodsData', {
          userId: this.userId,
          goodsId: this.goodsId
        })
        console.log(data)
        this.banner = data.banner
        this.info = data.info[0]
      },
      // 选择规格数量
      selectType () {
        this.showType = true
      }
    },
    created() {
      this.userId = JSON.parse(localStorage.getItem("user")).userId
      this.goodsId = this.$route.query.id
      this.getGoodsData()
    },
    components: {
      'v-title': Title,
      'v-swiper': Swiper,
      'van-action-sheet': ActionSheet
    }
  }
</script>

<style lang="less" scoped>
@import './index.less';
.van-popup--bottom {
  bottom: 100px;
}
.van-overlay {
  bottom: 100px;
  height: '';
}
</style>