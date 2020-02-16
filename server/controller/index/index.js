const { mysql } = require('../../mysql.js')

const allData = async (ctx) => {
  // 轮播图
  const banner = await mysql('nideshop_ad').select()
  // 中间栏
  const channelList = await mysql('nideshop_channel').select()
  // 品牌商品
  const brandList = await mysql('nideshop_brand').where({
    is_new: 1
  }).limit(4).select()
  // 新品首发
  const newGoodsList = await mysql('nideshop_goods').where('is_new', 1).limit(5).select()
  //人气推荐
  const hotGoodsList = await mysql('nideshop_goods').where('is_hot', 1).limit(5).select()
  // 专题精选
  const specialList = await mysql('nideshop_topic').limit(5).select()
  // 分类别商品
  const categoryList = []
  const category = await mysql('nideshop_category').where({
    parent_id: 0
  }).select()
  // 循环类别
  for (let item of category) {
    let childCategoryIds = await mysql('nideshop_category').where({
      parent_id: item.id
    }).column('id').select().map((item) => {
      return item.id
    })

    const categoryGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price').whereIn('category_id', childCategoryIds).limit(7).select()
    categoryList.push({
      'id': item.id,
      'name': item.name,
      'goodsList': categoryGoods
    })
  }

  ctx.body = {
    status: 200,
    banner,
    channelList,
    brandList,
    newGoodsList,
    hotGoodsList,
    specialList,
    categoryList
  }
}

module.exports = {
  allData
}