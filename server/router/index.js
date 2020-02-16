const router = require('koa-router')()
const controller = require('../controller/index.js')

router.get('/index/data', controller.index.allData)

module.exports = router