<template>
  <div class="order">
    <v-title>订单</v-title>
    <div class="address" v-if="address.name" @click="toSelectAddress">
      <div class="address-box">
        <div class="name">
          <span>{{address.name}}</span>
          <div v-if="address.is_default">默认</div>
        </div>
        <div class="info">
          <div class="tel">{{address.mobile}}</div>
          <div class="address-desc">{{address.address+address.address_detail}}</div>
        </div>
        <div class="icon"></div>
      </div>
    </div>
    <div @click="toAddAddress" class="selectDefault" v-else>请选择默认地址</div>
    <div class="content">
      <div class="price-item">
        <div>商品合计</div>
        <div>¥{{allprice}}</div>
      </div>
      <div class="price-item">
        <div>运费</div>
        <div>免运费</div>
      </div>
      <div class="price-item">
        <div>优惠券</div>
        <div>暂无</div>
      </div>
    </div>
    <div class="goodsList">
      <div class="goods-item" v-for="(item, index) in goodsList" :key="index">
        <div class="left">
          <div class="img">
            <img :src="item.list_pic_url" alt="">
          </div>
          <div class="info">
            <div>{{item.goods_name}}</div>
            <div>¥{{item.retail_price}}</div>
          </div>
        </div>
        <div class="right">
          <div class="number">x{{item.number}}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>实付：¥ {{allprice}}</div>
      <div class="pay" @click="pay">支付</div>
    </div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import { Toast } from 'vant'
  import { get } from '@/api/index.js'
  export default {
    data() {
      return {
        allprice: 0,
        address: {},
        userId: '',
        addressId: '',
        goodsList: []
      }
    },
    methods: {
      async getOrder() {
        const data = await get('/order/orderDetail', {
          userId: this.userId
        })
        console.log(data)
        this.goodsList = data.goodsList
        this.allprice = data.allprice
      },
      async getAddress () {
        const data = await get('/address/getAddress', {
          addressId: this.addressId
        })
        this.address = data.addressInfo
      },
      toSelectAddress() {
        this.$router.push({
          path: '/selectAddress'
        })
      },
      toAddAddress() {
        this.$router.push({
          path: '/selectAddress'
        })
      },
      pay() {
        Toast('该功能尚未开发')
      }
    },
    created() {
      this.userId = JSON.parse(localStorage.getItem("user")).userId
      if (JSON.parse(localStorage.getItem("addressId"))) {
        this.addressId = JSON.parse(localStorage.getItem("addressId"))
      }
      this.getAddress()
    },
    // 判断从哪个路由跳转来的
    beforeRouteEnter(to, from, next) {
      console.log('from', from)
      next(vm => {
        // 点击立即购买跳来的
        if (from.path == '/goodsDetail') {
          let data = vm.$route.params
          console.log(data)
          vm.goodsList = data.goodsList
          vm.allprice = data.allprice
          // 购物车页面跳转来的
        } else if (from.path == '/cart') {
          vm.getOrder()
        } else if (from.path == "/selectAddress") {
          // 选择收货地址后返回页面更新收货地址
          vm.addressId = JSON.parse(localStorage.getItem("addressId"))
          vm.getAddress()
        }
      })
    },
    components: {
      'v-title': Title
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>