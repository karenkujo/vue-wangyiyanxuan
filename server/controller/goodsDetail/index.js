const { mysql } = require('../../mysql')
// 获取相关数据
const goodsData = async (ctx) => {
  let { userId, goodsId } = ctx.request.query
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

  // 判断是否收藏过
  const iscollect = await mysql('nideshop_collect').where({
    'user_id': userId,
    'value_id': goodsId
  }).select()
  let collected
  if (iscollect.length) {
    collected = true
  } else {
    collected = false
  }

  // 获取用户购物车所有商品数量
  const numberList = await mysql('nideshop_cart').where({
    'user_id': userId
  }).column('number').select()
  let count = 0
  if (numberList.length > 0) {
    for (let item of numberList) {
      count += item.number
    }
  }

  ctx.body = {
    banner,
    info,
    brand,
    attributeList,
    problemList,
    goodsList,
    collected,
    count
  }
}
// 收藏和取消收藏
const collection = async (ctx) => {
  const { userId, goodsId } = ctx.request.body
  // console.log(userId, goodsId)
  const collected = await mysql('nideshop_collect').where({
    'user_id': userId,
    'value_id': goodsId
  }).select()
  if (collected.length) {
    await mysql('nideshop_collect').where({
      'user_id': userId,
      'value_id': goodsId
    }).del()
    ctx.body = {
      collected: false,
      msg: '已取消收藏'
    }
  } else {
    await mysql('nideshop_collect').insert({
      'user_id': userId,
      'value_id': goodsId
    })
    ctx.body = {
      collected: true,
      msg: '已收藏'
    }
  }
}
// 立即购买添加订单
const addOrder = async (ctx) => {
  const { userId, goodsId, allPrice } = ctx.request.body
  // console.log(userId, goodsId, allPrice)
  const oldOrder = await mysql('nideshop_order').where({
    'user_id': userId
  }).select()
  if (oldOrder.length) {
    let update = await mysql('nideshop_order').where({
      'user_id': userId
    }).update({
      user_id: userId,
      goods_id: goodsId,
      allprice: allPrice
    })
    if (update) {
      ctx.body = {
        msg: 'success'
      }
    } else {
      ctx.body = {
        msg: 'fail'
      }
    }
  } else {
    let update = await mysql('nideshop_order').insert({
      user_id: userId,
      goods_id: goodsId,
      allprice: allPrice
    })
    if (update) {
      ctx.body = {
        msg: 'success'
      }
    } else {
      ctx.body = {
        msg: 'fail'
      }
    }
  }
}
// 添加到购物车
const addCart = async (ctx) => {
  const { userId, goodsId, number } = ctx.request.body
  // console.log(userId, goodsId, number)
  const hasGoods = await mysql('nideshop_cart').where({
    'user_id': userId,
    'goods_id': goodsId
  }).select()
  if (!hasGoods.length) {
    const goodsInfo = await mysql('nideshop_goods').where({
      'id': goodsId
    }).select()
    const { name, retail_price, list_pic_url } = goodsInfo[0]
    const data = await mysql('nideshop_cart').insert({
      'user_id': userId,
      'goods_id': goodsId,
      'goods_name': name,
      'number': number,
      'retail_price': retail_price,
      'list_pic_url': list_pic_url
    })
    if (data.length) {
      let count = await getCartNumber()
      ctx.body = {
        msg: '加入购物车成功',
        count: count,
        status: 200
      }
    } else {
      ctx.body = {
        msg: '加入购物车失败'
      }
    }
  } else {
    const oldGoods = await mysql('nideshop_cart').where({
      'user_id': userId,
      'goods_id': goodsId
    }).select()
    const oldNumber = oldGoods[0].number
    const data = await mysql('nideshop_cart').where({
      'user_id': userId,
      'goods_id': goodsId
    }).update({
      'number': oldNumber + number
    })
    if (data) {
      let count = await getCartNumber()
      ctx.body = {
        msg: '加入购物车成功',
        count: count,
        status: 200
      }
    } else {
      ctx.body = {
        msg: '加入购物车失败'
      }
    }
  }
  // 重新获取用户购物车所有商品数量
  async function getCartNumber () {
    const numberList = await mysql('nideshop_cart').where({
      'user_id': userId
    }).column('number').select()
    let count = 0
    if (numberList.length > 0) {
      for (let item of numberList) {
        count += item.number
      }
    }
    return count
  }
}
module.exports = {
  goodsData,
  collection,
  addOrder,
  addCart
}