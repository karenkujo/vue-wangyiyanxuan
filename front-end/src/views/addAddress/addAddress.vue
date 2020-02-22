<template>
  <div class="addAddress">
    <v-title>编辑收货地址</v-title>
    <transition name="fade">
      <van-area :area-list="areaList" v-show="showArea" @cancel="cancel" @confirm="confirm" />
    </transition>
    <div class="content">
      <div class="input-box">
        <input type="text" placeholder="姓名" v-model="userName">
      </div>
      <div class="input-box">
        <input type="text" placeholder="手机号码" v-model="mobile">
      </div>
      <div class="input-box">
        <input type="text" placeholder="省、市、区" @click="showAreaList" v-model="address">
      </div>
      <div class="input-box">
        <input type="text" placeholder="详细地址，如小区、楼盘号等" v-model="detailAddress">
      </div>
    </div>

    <div class="default">
      <input type="checkbox" id="checkbox" v-model="checked">
      <label for="checkbox">设为默认地址</label>
    </div>
    <div class="footer" @click="saveAddress">保存</div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import { Area } from 'vant';
  import { get, post } from '@/api/index.js'
  import areaList from '../../../static/area.js'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        addressId: '',
        userId: '',
        userName: '',
        mobile: '',
        detailAddress: '',
        areaList: areaList,
        showArea: false,
        address: '',
        checked: false,
      }
    },
    methods: {
      showAreaList() {
        this.showArea = true
      },
      cancel() {
        this.showArea = false
      },
      confirm(e) {
        this.address = `${e[0].name} ${e[1].name} ${e[2].name}`
        this.showArea = false
      },
      async saveAddress() {
        if (!this.userId || !this.mobile || !this.userName || !this.address || !this.detailAddress) {
          Toast('请完善信息')
          return
        }
        const data = await post('/address/saveAddress', {
          userId: this.userId,
          userName: this.userName,
          mobile: this.mobile,
          address: this.address,
          detailAddress: this.detailAddress,
          checked: this.checked,
          addressId: this.addressId
        })
        if (data.status === 200) {
          Toast(data.msg)
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      },
      async getAddress () {
        const data = await get('/address/getAddress', {
          addressId: this.addressId
        })
        console.log(data)
        this.userName = data.addressInfo.name
        this.mobile = data.addressInfo.mobile
        this.address = data.addressInfo.address
        this.detailAddress = data.addressInfo.address_detail
        this.checked = data.addressInfo.is_default === 1 ? true : false
      }
    },
    created() {
      this.userId = JSON.parse(localStorage.getItem("user")).userId
      if (this.$route.query.id) {
        this.addressId = this.$route.query.id
        this.getAddress()
      }
    },
    components: {
      "v-title": Title,
      "van-area": Area
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>