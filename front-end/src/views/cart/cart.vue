<template>
  <div class="cart">
    <div class="top">购物车</div>
    <tab-bar class="tabBar"></tab-bar>
    <div class="body" v-if="userId">
      <div class="header">
        <div>30天无忧退货</div>
        <div>48小时快速退款</div>
        <div>满88元免邮费</div>
      </div>
      <div class="cartList" v-if="cartList.length">
        <div class="content">
          <div class="cart-item" v-for="(item, index) in cartList" :key="item.id">
            <div class="itemInfo">
              <div class="icon" :class="{'active': selectList[index]}" @click="select(item.id, index)" ></div>
              <div class="image">
                <img :src="item.list_pic_url" alt="">
              </div>
              <div class="info">
                <div class="name">{{item.goods_name}}</div>
                <div class="price">￥{{item.retail_price}}</div>
              </div>
            </div>
            <div class="number">x{{item.number}}</div>
          </div>
        </div>
      </div>
      <div class="Empty" v-else>购物车空空如也~</div>
    </div>
    <div class="toLogin" v-else>请先<span @click="toLogin">登录</span></div>
    <div class="footer">
      <div class="selectAll" @click="selectAll" :class="allGoodsSelect ? 'active' : ''">全选({{allNumber}})</div>
      <div class="deleteGoods" @click="deleteGoods">删除</div>
      <div class="addOrder">
        <div class="allPrice">￥{{allPrice}}</div>
        <div class="toOrder" @click="toOrder">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
  import tabBar from '@/components/tabBar/tabBar.vue'
  import { get, post } from '@/api/index.js'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        cartList: [],
        userId: '',
        allGoodsSelect: false,
        selectList: []
      }
    },
    methods: {
      // 登录
      toLogin () {
        this.$router.push({
          path: '/login'
        })
      },
      // 获取购物车列表
      async getCartData () {
        let data = await get('/cart/getCartData', {
          userId: this.userId
        })
        console.log(data)
        this.cartList = data.cartList
      },
      // 选择某一项
      select (id, index) {
        if (!this.selectList[index]) {
          this.$set(this.selectList, index, id)
        } else {
          this.$set(this.selectList, index, false)
        }
      },
      // 选择全部
      selectAll () {
        this.selectList = []
        if (!this.allGoodsSelect) {
          for (let item of this.cartList) {
            this.selectList.push(item.id)
          }
          this.allGoodsSelect = true
        } else {
          this.allGoodsSelect = false
        }
      },
      // 删除商品
      async deleteGoods () {
        if (!this.userId) {
          this.$router.push({
            path: '/login'
          })
          return
        }
        if (this.allNumber == 0) {
          Toast('请选择商品')
          return
        }
        let deleteList = []
        for (let item of this.selectList) {
          if (item) {
            deleteList.push(item)
          }
        }
        const data = await post('/cart/deleteGoods', {
          userId: this.userId,
          deleteList
        })
        if (data.status == 200) {
          Toast(data.msg)
          this.selectList = []
          this.getCartData()
        }
      },
      // 下单
      async toOrder () {
        if (!this.userId) {
          this.$router.push({
            path: '/login'
          })
          return
        }
        if (this.allNumber == 0) {
          Toast('请选择商品')
          return
        }
        let orderList = []
        for (let item of this.selectList) {
          if (item) {
            orderList.push(item)
          }
        }
        let goodsIds = orderList.join(',')
        // 更新订单
        const data = await post('/goodsDetail/addOrder', {
          userId: this.userId,
          goodsId: goodsIds,
          allPrice: this.allPrice
        })
        if (data.status == 200) {
          this.$router.push({
            path: '/order'
          })
        }
      }
    },
    computed: {
      allNumber () {
        let number = 0
        for (let item of this.selectList) {
          if (item) {
            number ++
          }
        }
        if (number !== 0 && number === this.cartList.length) {
          this.allGoodsSelect = true
        } else {
          this.allGoodsSelect = false
        }
        return number
      },
      allPrice () {
        let count = 0
        for (let i = 0; i < this.selectList.length; i++) {
          if (this.selectList[i]) {
            count += this.cartList[i].retail_price * this.cartList[i].number
          }
        }
        return count
      }
    },
    created() {
      if (JSON.parse(localStorage.getItem("user"))) {
        this.userId = JSON.parse(localStorage.getItem("user")).userId
      }
      this.getCartData()
    },
    components: {
      "tab-bar": tabBar
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>