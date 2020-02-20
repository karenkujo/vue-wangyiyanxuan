<template>
  <div class="goodsDetail">
    <v-title>商品详情</v-title>
    <!-- 商品轮播图 -->
    <v-swiper :banner="banner" :height="10"></v-swiper>
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
    <van-action-sheet v-model="showType" className="selectType" :round="false">
      <div class="header">
        <div class="view">
          <img :src="info.primary_pic_url" alt="">
        </div>
        <div class="desc">
          <div class="text">
            <div>价格 ¥ {{info.retail_price}}</div>
            <div>请选择数量</div>
          </div>
        </div>
      </div>
      <div class="select-num">
        <div class="text">数量</div>
        <div class="count">
          <div class="reduce" @click="reduce">-</div>
          <input type="text" class="number" v-model="number" disabled="false">
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </van-action-sheet>
    <!-- 商品参数 -->
    <div class="attribute">
      <div class="header">
        商品参数
      </div>
      <div class="attribute-item" v-for="(item, index) in attributeList" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.attribute}}</div>
      </div>
    </div>

    <!-- 常见问题 -->
    <div class="problem">
      <div class="header">
        <div class="title">常见问题</div>
      </div>
      <div class="content">
        <div class="problem-item" v-for="(item, index) in problemList" :key="index">
          <div class="question">
            <div class="spot"></div>
            <div class="question-text">{{item.question}}</div>
          </div>
          <div class="answer">{{item.answer}}</div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="common-views">
      <div class="header">
        <div class="title">大家都在看</div>
      </div>
      <div class="goodsList">
        <div v-for="(item, index) in goodsList" :key="index" @click="toGoodsDetail(item.id)">
          <img :src="item.list_pic_url" alt="">
          <div>{{item.name}}</div>
          <div>¥{{item.retail_price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import Swiper from '@/components/swiper/swiper'
  import { get, post } from '@/api/index.js'
  import { ActionSheet } from 'vant';
  export default {
    inject: ['reload'],
    data() {
      return {
        userId: '',
        goodsId: '',
        banner: [],
        info: {},
        showType: false,
        number: 1,
        attributeList: [],
        problemList: [],
        goodsList: []
      }
    },
    methods: {
      // 获取当前页面数据
      async getGoodsData() {
        let data = await get('/goodsDetail/goodsData', {
          userId: this.userId,
          goodsId: this.goodsId
        })
        console.log(data)
        this.banner = data.banner
        this.info = data.info[0]
        this.attributeList = data.attributeList
        this.problemList = data.problemList
        this.goodsList = data.goodsList
      },
      // 选择规格数量
      selectType() {
        this.showType = true
      },
      reduce() {
        if (this.number > 1) {
          this.number--
        }
      },
      add() {
        this.number++
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