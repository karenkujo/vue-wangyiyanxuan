<template>
  <van-search 
  v-model="query"
  placeholder="请输入商品关键词" 
  @search="onSearch" 
  @cancel="onCancel"
  @input="handleInput"
  @focus="onFocus" />
</template>

<script>
  import Input from 'vant/lib/search';
  import {get, post} from '@/api/index.js'
  let userId = JSON.parse(localStorage.getItem("user")).userId
  export default {
    data() {
      return {
        query: ''
      }
    },
    methods: {
      async onSearch (parentWords) {
        let keyWords = parentWords || this.query
        this.query = keyWords
        if (keyWords == '') return
        const data = await post('/search/saveHistory', {
          userId: userId,
          keyWords: keyWords
        })
        this.$parent.historyAndHotSearch()
        this.$parent.getGoodsList(this.query)
      },
      onCancel () {
        this.$router.go(-1)
      },
      handleInput () {
        this.$emit('sendQuery', this.query)
      },
      onFocus () {
        this.$parent.inputFocus(this.query)
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