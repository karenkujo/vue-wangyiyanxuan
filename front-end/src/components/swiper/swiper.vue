<template>
  <swiper :options="swiperOption" ref="mySwiper" :style="{ height: height + 'rem'}">
    <!-- slides -->
    <swiper-slide v-for="(item, index) in banner" :key="index">
      <img :src="item.image_url || item.img_url" alt="">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    props: ['banner', 'height'],
    data() {
      return {
        swiperOption: {
          loop: true,
          autoplay: {
            delay: 2000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
          initialSlide: 0,
          pagination: {
             el: '.swiper-pagination',
             clickable: false
          }
        }
      }
    },
    // mounted() {
    //   let swiper = document.querySelector('.swiper-container')
    //   swiper.style.height = this.height + 'px'
    // },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less" scoped>
@import './index.less';
</style>