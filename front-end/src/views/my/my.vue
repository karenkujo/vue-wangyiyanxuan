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
          <div class="iconfont" :class="item.iconClass"></div>
          <div class="item">{{item.name}}</div>
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
          {
            name: '我的订单',
            iconClass: 'icon-aiguifanfile2'
          },
          {
            name: '优惠券',
            iconClass: 'icon-youhuiquan'
          },
          {
            name: '我的足迹',
            iconClass: 'icon-wodezuji'
          },
          {
            name: '我的收藏',
            iconClass: 'icon-shoucang'
          },
          {
            name: '地址管理',
            iconClass: 'icon-dizhiguanli'
          },
          {
            name: '联系客服',
            iconClass: 'icon-lianxikefu'
          },
          {
            name: '帮助中心',
            iconClass: 'icon-bangzhuzhongxin'
          },
          {
            name: '意见反馈',
            iconClass: 'icon-yijianfankui'
          }
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
    beforeRouteEnter (to, from, next) {
      console.log(from)
      if (from.path == '/login' && JSON.parse(localStorage.getItem("user"))) {
        location.reload()
        next()
      } else {
        next()
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