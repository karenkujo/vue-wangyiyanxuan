const { mysql } = require('../../mysql')

const orderDetail = async (ctx) => {
  const { userId } = ctx.query
  // console.log(userId)
  const order = await mysql('nideshop_order').where({
    'user_id': userId
  }).select()
  const allprice = order[0].allprice
  const goodsIds = order[0].goods_id.split(',')
  const goodsList = await mysql('nideshop_cart').where({
    'user_id': userId
  }).select()
  let newGoodsList = []
  for (let item of goodsList) {
    if (goodsIds.findIndex( i => i == item.id) !== -1) {
      newGoodsList.push(item)
    }
  }

  ctx.body = {
    goodsList: newGoodsList,
    allprice
  }
}

module.exports = {
  orderDetail
}