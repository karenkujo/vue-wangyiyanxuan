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


module.exports = router