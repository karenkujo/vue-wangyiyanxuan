<template>
  <div class="search">
    <div class="header">
      <v-input @sendQuery="getQuery"></v-input>
    </div>
    <div class="suggestion" v-if="query" >
      <div class="suggestionList">
        手办
      </div>
      <div class="nosuggestion">
        暂无此类商品
      </div>
    </div>
    <div class="history" v-if="historyList.length">
      <div class="top">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="historyList">
        <div class="history-item" v-for="(item, index) in historyList" :key="index">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <div class="history hotSearch">
      <div class="top">
        <div>热门搜索</div>
      </div>
      <div class="historyList">
        <div class="history-item" v-for="(item, index) in hotSearchList" :key="index">
          {{item.keyword}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Input from '@/components/input/input.vue'
  import {get, post} from '@/api/index.js'

  let userId = JSON.parse(localStorage.getItem("user")).userId
  export default {
    data () {
      return {
        query: '',
        historyList: [],
        hotSearchList: []
      }
    },
    methods: {
      async clearHistory () {
        const data = await post('/search/clearHistory', {
          userId: userId
        })
        console.log(data)
        this.historyAndHotSearch()
      },
      getQuery (query) {
        this.query = query
      },
      async historyAndHotSearch () {
        let data = await get('/search/historyAndHotSearch', {
          userId: userId
        })
        console.log(data)
        this.hotSearchList = data.hotSearchList
        this.historyList = data.historyList
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