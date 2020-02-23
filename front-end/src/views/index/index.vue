<template>
  <div class="index">
    <tab-bar class="tabBar"></tab-bar>
    <div class="search" >
      <div class="logo"></div>
      <div class="content" @click="toSearch">
        <div class="icon"></div>
        <input type="text" placeholder="搜索商品" disabled>
      </div>
    </div>
    <div class="swiper-wrapper">
      <swiper :banner="banner"></swiper>
    </div>
    <div class="channel">
      <div class="channel-item" v-for="(item, index) in channelList" :key="index" @click="toCategory">
        <img :src="item.icon_url" alt="">
        <div>{{item.name}}</div>
      </div>
    </div>
    <div class="brand">
      <div class="title">品牌制造商直供</div>
      <div class="brandList">
        <div class="brandItem" v-for="(item, index) in brandList" :key="index" >
          <div class="desc">
            <div class="name">{{item.name}}</div>
            <div class="price">{{item.floor_price}}元起</div>
          </div>
          <img :src="item.new_pic_url" alt="">
        </div>
      </div>
    </div>
    <div class="newGoods">
      <div class="head">
        <div>新品首发</div>
        <div>查看全部</div>
      </div>
      <div class="goodsList">
        <div class="content">
          <div class="goods-item" v-for="(item, index) in newGoodsList" :key="index" @click="toGoodsDetail(item.id)" >
            <img :src="item.list_pic_url" alt="">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.goods_brief}}</div>
            <div class="price">￥{{item.retail_price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="newGoods hotGoods">
      <div class="head">
        <div>人气推荐 <span></span> 好物精选</div>
        <div>查看全部</div>
      </div>
      <div class="goodsList">
        <div class="content">
          <div class="goods-item" v-for="(item, index) in hotGoodsList" :key="index" @click="toGoodsDetail(item.id)" >
            <img :src="item.list_pic_url" alt="">
            <div class="name">{{item.name}}</div>
            <div class="desc">{{item.goods_brief}}</div>
            <div class="price">￥{{item.retail_price}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="special">
      <div class="head">
        <span>专题精选</span>
        <span class="icon"></span>
      </div>
      <div class="specialList">
        <div class="content">
          <div class="special-item" v-for="(item, index) in specialList" :key="index">
            <img :src="item.item_pic_url" alt="">
            <div class="desc">
              <div>{{item.title}}</div>
              <div>{{item.subtitle}}</div>
              <div>{{item.price_info}}元起</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="category">
      <div class="categoryList" v-for="(item ,index) in categoryList" :key="index">
        <div class="head">{{item.name}}好物</div>
        <div class="goods">
          <div class="goods-item" v-for="(goodsitem, goodsindex) in item.goodsList" :key="goodsindex" @click="toGoodsDetail(goodsitem.id)">
            <img :src="goodsitem.list_pic_url" alt="">
            <div>{{goodsitem.name}}</div>
            <div>￥{{goodsitem.retail_price}}</div>
          </div>
          <div class="more">
            <div>{{item.name}}好物</div>
            <span class="icon"></span>
          </div>
        </div>
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
        channelList: [],
        brandList: [],
        newGoodsList: [],
        hotGoodsList: [],
        specialList: [],
        categoryList: []
      }
    },
    methods: {
      toSearch() {
        this.$router.push({ path: '/search' })
      },
      toCategory () {},
      toGoodsDetail (id) {
        this.$router.push({
          path: '/goodsDetail',
          query: {
            id: id
          }
        })
      },
      async getData () {
        let data = await get('/index/data')
        console.log(data)
        this.banner = data.banner
        this.channelList = data.channelList
        this.brandList = data.brandList
        this.newGoodsList = data.newGoodsList
        this.hotGoodsList = data.hotGoodsList
        this.specialList = data.specialList
        this.categoryList = data.categoryList
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