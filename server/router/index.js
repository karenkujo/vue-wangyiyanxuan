const router = require('koa-router')()
const controller = require('../controller/index.js')
// 首页
router.get('/index/data', controller.index.allData)
// 搜索
router.post('/search/saveHistory', controller.search.saveHistory)
router.get('/search/historyAndHotSearch', controller.search.historyAndHotSearch)
router.post('/search/clearHistory', controller.search.clearHistory)
router.get('/search/getSuggestion', controller.search.getSuggestion)
router.get('/search/goodsList', controller.search.getGoodsList)
// 商品详情
router.get('/goodsDetail/goodsData', controller.goodsDetail.goodsData)
router.post('/goodsDetail/collection', controller.goodsDetail.collection)
router.post('/goodsDetail/addOrder', controller.goodsDetail.addOrder)
router.post('/goodsDetail/addCart', controller.goodsDetail.addCart)
// 订单页面
router.get('/order/orderDetail', controller.order.orderDetail)
// 地址
router.get('/selectAddress/getAddressList', controller.address.getAddressList)
router.post('/address/saveAddress', controller.address.saveAddress)
router.get('/address/getAddress', controller.address.getAddress)
router.get('/address/deleteAddress', controller.address.deleteAddress)
// 购物车
router.get('/cart/getCartData', controller.cart.getCartData)
router.post('/cart/deleteGoods', controller.cart.deleteGoods)
// 我的
router.get('/my/getCollection', controller.my.getCollection)
// 用户注册登录
router.post('/user/register', controller.user.register)
router.get('/user/login', controller.user.login)
// 分类
router.get('/category/getCategoryType', controller.category.getCategoryType)
router.get('/category/getCurrent', controller.category.getCurrent)

module.exports = router