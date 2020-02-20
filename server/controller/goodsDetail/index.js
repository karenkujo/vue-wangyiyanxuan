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

  // 获取商品属性信息
  const attribute = await mysql('nideshop_goods_attribute').where({
    'goods_id': goodsId
  }).select()
  let attributeList = []
  for (let item of attribute) {
    const attributeName = await mysql('nideshop_attribute').where({
      'id': item.attribute_id
    }).select()
    attributeList.push({
      name: attributeName[0].name,
      attribute: item.value
    })
  }
  // 问题列表
  const problemList = await mysql('nideshop_goods_issue').select()
  // 大家都在看
  const goodsList = await mysql('nideshop_goods').where({
    'category_id': info[0].category_id
  }).limit(10).select()

  ctx.body = {
    banner,
    info,
    brand,
    attributeList,
    problemList,
    goodsList
  }
}

module.exports = {
  goodsData
}