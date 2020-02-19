const { mysql } = require('../../mysql')

const goodsData = async (ctx) => {
  let {userId, goodsId} = ctx.request.query
  // 商品轮播图
  const banner = await mysql('nideshop_goods_gallery').where({
    'goods_id': goodsId
  }).select()
  // 商品相关信息
  const info = await mysql('nideshop_goods').where({
    'id': goodsId
  }).select()
  // 获取商品品牌信息
  const brand = await mysql('nideshop_brand').where({
    'id': info[0].brand_id
  }).select()
  ctx.body = {
    banner,
    info,
    brand
  }
}

module.exports = {
  goodsData
}