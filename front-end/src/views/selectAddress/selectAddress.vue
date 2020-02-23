<template>
  <div class="selectAddress">
    <v-title>选择收货地址</v-title>
    <div class="addressList" v-if="addressList.length">
      <div class="address-item" v-for="(item, index) in addressList" :key="index">
        <div class="name">
          <span>{{item.name}}</span>
          <div v-if="item.is_default">默认</div>
        </div>
        <div class="info" @click="selectAddress(item.id)">
          <div class="tel">{{item.mobile}}</div>
          <div class="address-desc">{{item.address+item.address_detail}}</div>
        </div>
        <div class="icon" @click="updateAddress(item.id)"></div>
        <div class="delete icon" @click="deleteAddress(item.id)"></div>
      </div>
    </div>
    <div class="empty" v-else>请添加收货地址</div>
    <div class="footer" @click="addAddress">+ 新增收货地址</div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import { get } from '@/api/index.js'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        userId: '',
        addressList: []
      }
    },
    methods: {
      // 获取所有收货地址
      async getAddressList() {
        const data = await get('/selectAddress/getAddressList', {
          userId: this.userId
        });
        this.addressList = data.addressList
      },
      // 选择地址
      selectAddress (id) {
        localStorage.setItem("addressId", JSON.stringify(id))
        this.$router.go(-1)
      },
      // 修改地址
      updateAddress (id) {
        this.$router.push({
          path: '/addAddress',
          query: {
            id: id
          }
        })
      },
      // 删除地址
      async deleteAddress (id) {
        let data = await get('address/deleteAddress', {
          addressId: id
        })
        console.log(data)
        if (data.status == 200) {
          Toast(data.msg)
          this.getAddressList()
        }
      },
      // 新增收货地址
      addAddress (id) {
        this.$router.push({
          path: '/addAddress'
        })
      }
    },
    created() {
      this.userId = JSON.parse(localStorage.getItem("user")).userId
      this.getAddressList()
    },
    components: {
      "v-title": Title
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>