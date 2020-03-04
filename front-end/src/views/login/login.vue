<template>
  <div class="login">
    <v-title>登录</v-title>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <div class="toRegister">没有账号？去<span @click="toRegister">注册</span></div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import { Form, Field, Button } from 'vant';
  import { get } from '../../api/index'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async onSubmit() {
        // console.log(this.username, this.password);
        const data = await get('/user/login', {
          username: this.username,
          password: this.password
        })
        if (data.status == 200) {
          Toast(data.msg)
          localStorage.setItem("user", JSON.stringify(data.user))
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        } else {
          Toast(data.msg)
        }
      },
      toRegister () {
        this.$router.push({
          path: '/register'
        })
      }
    },
    components: {
      "v-title": Title,
      "van-form": Form,
      "van-field": Field,
      "van-button": Button
    }
  }
</script>

<style lang="less" scoped>
  @import './index.less';
</style>