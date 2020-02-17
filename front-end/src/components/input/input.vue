<template>
  <van-search 
  v-model="query" 
  show-action 
  placeholder="请输入商品关键词" 
  @search="onSearch" 
  @cancel="onCancel"
  @input="handleInput"
  @focus="onFocus" />
</template>

<script>
  import Input from 'vant/lib/search';
  import { Toast } from 'vant';
  import {get, post} from '@/api/index.js'
  export default {
    data() {
      return {
        query: ''
      }
    },
    methods: {
      async onSearch () {
        let userId = JSON.parse(localStorage.getItem("user")).userId
        console.log(userId)
        let keyWords = this.query
        const data = await post('/search/saveHistory', {
          userId: userId,
          keyWords: keyWords
        })
        console.log(data)
        this.$parent.historyAndHotSearch()
      },
      onCancel () {
      },
      handleInput () {
        this.$emit('sendQuery', this.query)
      },
      onFocus () {

      }
    },
    components: {
      'van-search': Input
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>