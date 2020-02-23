<template>
  <div class="my">
    <div class="top">我的账户</div>
    <div class="userInfo">
      <div class="user">
        <div class="avatar">
          <img src="" alt="">
        </div>
        <div class="userName" v-if="userId">{{userName}}</div>
        <div class="toLogin" v-else @click="toLogin">点击登录</div>
        <div class="unLogin" v-if="userId" @click="unLogin">退出登录</div>
      </div>
      <div class="userList">
        <div class="user-item" v-for="(item, index) in userList" :key="index" @click="toDetail(index)">
          <div class="icon"></div>
          <div>{{item}}</div>
        </div>
      </div>
    </div>
    <tab-bar class="tabBar"></tab-bar>
  </div>
</template>

<script>
  import tabBar from '@/components/tabBar/tabBar.vue'
  import { Dialog } from 'vant'
  export default {
    data() {
      return {
        userList: [
          '我的订单',
          '优惠券',
          '我的足迹',
          '我的收藏',
          '地址管理',
          '联系客服',
          '帮助中心',
          '意见反馈'
        ],
        userId: '',
        userName: ''
      }
    },
    methods: {
      // 登录
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      // 退出登录
      unLogin() {
        Dialog.confirm({
          title: '退出登录',
          message: '确认退出登录？'
        }).then(() => {
          // on confirm
          localStorage.removeItem("user")
          location.reload()
        }).catch(() => {
          // on cancel
        });
      },
      toDetail(index) {
        if (!this.userId) {
          this.$router.push({
            path: '/login'
          })
          return
        }
        console.log(index)
        if (index == 3) {
          this.$router.push({
            path: '/collection'
          })
        } else if (index == 4) {
          this.$router.push({
            path: '/selectAddress'
          })
        }
      }
    },
    created() {
      if (JSON.parse(localStorage.getItem("user"))) {
        this.userId = JSON.parse(localStorage.getItem("user")).userId
        this.userName = JSON.parse(localStorage.getItem("user")).username
      }
    },
    components: {
      "tab-bar": tabBar
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>