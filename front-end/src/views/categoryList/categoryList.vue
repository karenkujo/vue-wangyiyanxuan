<template>
  <div class="categoryList">
    <v-title>分类</v-title>
    <div class="nav" ref="nav">
      <div class="navList">
        <div class="nav-item" v-for="(item, index) in NavList" :key="index" @click="switchNav(item.id, index)" :class="activeIndex == index ? 'active' : ''">
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="header" v-if="NavList[activeIndex]">
      <div class="title">{{NavList[activeIndex].name}}</div>
      <div class="brief">{{NavList[activeIndex].front_desc}}</div>
    </div>
    <div class="goodsList">
      <div class="content" v-if="activeList.length">
        <div class="goods-item" v-for="(item, index) in activeList" :key="index" @click="toGoodsDeatil(item.id)">
          <img :src="item.list_pic_url" alt="">
          <div class="name">{{item.name}}</div>
          <div class="price">￥{{item.retail_price}}</div>
        </div>
      </div>
      <div class="noGoods" v-else>数据库暂无此商品</div>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import { get } from '../../api/index'
  export default {
    data () {
      return {
        activeId: '',
        NavList: [],
        activeIndex: 0,
        activeList: []
      }
    },
    methods: {
      // 获取导航栏数据
      async getCategoryNav () {
        const data = await get('/category/getCategoryNav', {
          id: this.activeId
        })
        console.log(data)
        this.NavList = data.NavList
        this.activeIndex = this.NavList.findIndex(item => item.id == this.activeId)
        this.switchNav(this.activeId, this.activeIndex)
      },
      // 获取商品数据
      async switchNav (id, index) {
        this.activeIndex = index
        this.activeId = this.NavList[this.activeIndex].id
        const data = await get('/category/getActiveList', {
          id: this.activeId
        })
        console.log(data)
        this.activeList = data.activeList
        this.controllerScroll()
      },
      // 查看商品详情
      toGoodsDeatil (id) {
        this.$router.push({
          path: '/goodsDetail',
          query: {
            id: id
          }
        })
      },
      // 滚动条
      controllerScroll () {
        let x = 40 * this.activeIndex
        this.$refs.nav.scrollTo(x, 0)
      }
    },
    created() {
      this.activeId = this.$route.query.id
      this.getCategoryNav()
    },
    components: {
      "v-title": Title
    }
  }
</script>

<style lang="less" scoped>
@import './index.less';
</style>