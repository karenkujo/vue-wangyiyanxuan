<template>
  <div class="register">
    <v-title>注册</v-title>
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field v-model="mobile" name="手机号" label="手机号" placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]" />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
    <div class="toLogin">已有账号？去<span @click="toLogin">登录</span></div>
  </div>
</template>

<script>
  import Title from '@/components/title/title'
  import { Form, Field, Button } from 'vant';
  import { post } from '../../api/index'
  import { Toast } from 'vant'
  export default {
    data() {
      return {
        username: '',
        password: '',
        mobile: ''
      };
    },
    methods: {
      async onSubmit() {
        console.log(this.username, this.password, this.mobile)
        const data = await post('/user/register', {
          username: this.username,
          password: this.password,
          mobile: this.mobile
        })
        Toast(data.msg)
        if (data.status == 200) {
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        }
      },
      toLogin () {
        this.$router.go(-1)
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