<template>
  <div class="category">
    <div class="top">分类</div>
    <div class="search" >
      <div class="con" @click="toSearch">
        <div class="icon"></div>
        <input type="text" placeholder="搜索商品" disabled>
      </div>
    </div>
    <div class="content">
      <div class="side-left">
        <div class="category-type">
          <div class="catrgory-item" 
          v-for="(item, index) in categoryType" 
          :key="index" 
          :class="activeIndex == index ? 'active' : ''"
          @click="selectItem(item.id, index)"
          >
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="side-right">
        <div class="category-content">
          <div class="banner">
            <img :src="currentData.banner_url" alt="">
          </div>
          <div class="title">
            <span>——</span>
            <span>{{currentData.name}}分类</span>
            <span>——</span>
          </div>
          <div class="goodsList">
            <div class="goods-item" v-for="(item, index) in currentData.currentList" :key="index" @click="toCategoryList(item.id)">
              <img :src="item.wap_banner_url" alt="">
              <div class="name">{{item.name}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tab-bar class="tabBar"></tab-bar>
  </div>
</template>

<script>
  import { get } from '../../api/index'
  import tabBar from '@/components/tabBar/tabBar.vue'
  export default {
    data () {
      return {
        categoryType: [],
        activeIndex: 0,
        currentData: {},
        currentId: 1005000
      }
    },
    methods: {
      toSearch () {
        this.$router.push({
          path: '/search'
        })
      },
      // 获取分类
      async getCategoryType () {
        const data = await get('/category/getCategoryType')
        console.log(data)
        this.categoryType = data.categoryType
      },
      // 点击左侧菜单
      async selectItem (id, index) {
        this.activeIndex = index
        const data = await get('/category/getCurrent', {
          id: id,
        })
        console.log(data)
        this.currentData = data.currentData.current
      },
      // 点击右侧分类
      toCategoryList (id) {
        this.$router.push({
          path: '/categoryList',
          query: {
            id: id
          }
        })
      }
    },
    created() {
      this.getCategoryType()
      this.selectItem(this.currentId)
    },
    mounted() {
      this.activeIndex = 0
    },
    components: {
      "tab-bar": tabBar
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>