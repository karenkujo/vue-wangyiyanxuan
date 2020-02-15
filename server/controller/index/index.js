const { mysql } = require('../../mysql.js')

const banner = async (ctx) => {
  // 轮播图
  const banner = await mysql('nideshop_ad').select()
  // 中间栏
  const channelList = await mysql('nideshop_channel').select()

  ctx.body = {
    status: 200,
    banner,
    channelList
  }
}

module.exports = {
  banner
}