import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index/index')
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/views/index/index')
    },
    {
      path: '/category',
      name: 'Category',
      component: () => import('@/views/category/category')
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/cart/cart')
    },
    {
      path: '/my',
      name: 'My',
      component: () => import('@/views/my/my')
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('@/views/search/search')
    }
  ]
})