<template>
  <div class="search">
    <div class="header">
      <v-input @sendQuery="getQuery" ref="input"></v-input>
    </div>
    <div class="suggestion" v-if="query" >
      <div class="suggestionList" v-if="suggestionList.length">
        <div class="suggestion-item" v-for="(item, index) in suggestionList" :key="index" @click="searchGoods" :data-keywords="item.name">
          {{item.name}}
        </div>
      </div>
      <div class="nosuggestion" v-else>
        暂无此类商品
      </div>
    </div>
    <div class="history" v-if="historyList.length">
      <div class="top">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="historyList">
        <div class="history-item" v-for="(item, index) in historyList" :key="index" @click="searchGoods" :data-keywords="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="history hotSearch">
      <div class="top">
        <div>热门搜索</div>
      </div>
      <div class="historyList">
        <div class="history-item" v-for="(item, index) in hotSearchList" :key="index" @click="searchGoods" :data-keywords="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="goodsList" v-if="goodsList.length">
      <div class="nav">
        <div :class="0 === navIndex ? 'active' : ''" @click="swicthNav(0)" >综合</div>
        <div :class="[1 === navIndex ? 'active' : '', priceSort]" @click="swicthNav(1)" >价格</div>
      </div>
      <div class="goods-List">
        <div class="content">
          <div class="good-item" v-for="(item, index) in goodsList" :key="index" @click="goodsDetail(item.id)">
            <img :src="item.list_pic_url" alt="">
            <div class="name">{{item.name}}</div>
            <div class="price">¥{{item.retail_price}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Input from '@/components/input/input.vue'
  import {get, post} from '@/api/index.js'
  import { Toast } from 'vant';
  let userId = JSON.parse(localStorage.getItem("user")).userId
  export default {
    data () {
      return {
        query: '',
        historyList: [],
        hotSearchList: [],
        suggestionList: [],
        goodsList: [],
        navIndex: 0,
        priceSort: 'desc'
      }
    },
    methods: {
      // 搜索建议
      async getSuggestion () {
        let data = await get('/search/getSuggestion', {
          keyWords: this.query
        })
        this.suggestionList = data.suggestionList
      },
      // 获取搜索商品
      async getGoodsList (keyWords) {
        console.log(keyWords)
        let data = await get('/search/goodsList', {
          keyWords: keyWords
        })
        console.log(data.goodsList)
        this.goodsList = data.goodsList
        if (this.goodsList.length === 0) {
          Toast('无此类商品')
        }
      },
      // 切换商品查看方式
      swicthNav (index) {
        if (index === 1) {
          this.priceSort = this.priceSort === 'asc' ? 'desc' : 'asc'
          if (this.priceSort == 'asc') {
            this.goodsList.sort((a, b) => a.retail_price - b.retail_price)
          } else {
            this.goodsList.sort((a, b) => b.retail_price - a.retail_price)
          }
        }
        if (index === 0) {
          this.goodsList.sort((a, b) => b.sort_order - a.sort_order)
        }
        this.navIndex = index
      },
      // 点击商品时调用子组件方法
      searchGoods (e) {
        this.$refs.input.onSearch(e.target.dataset.keywords)
      },
      // 清空搜索历史
      async clearHistory () {
        const data = await post('/search/clearHistory', {
          userId: userId
        })
        this.historyAndHotSearch()
      },
      // 子组件input框值发生变化时同步query
      getQuery (query) {
        this.query = query
      },
      // 获取历史搜索和热门搜索
      async historyAndHotSearch () {
        let data = await get('/search/historyAndHotSearch', {
          userId: userId
        })
        this.hotSearchList = data.hotSearchList
        this.historyList = data.historyList
      },
      // 聚焦时展示搜索建议
      inputFocus (query) {
        this.goodsList = []
        this.query = query
        this.getSuggestion()
      },
      // 查看商品详情
      goodsDetail (id) {
        this.$router.push({
          path: '/goodsDetail',
          query: {
            id: id
          }
        })
      }
    },
    watch: {
      // input值变化时获取搜索建议
      query (val) {
        this.getSuggestion()
      }
    },
    created() {
      this.historyAndHotSearch()
    },
    components: {
      'v-input': Input
    }
  }
</script>

<style lang="less" scoped>
@import './index';
</style>