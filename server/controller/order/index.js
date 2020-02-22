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
  }).whereIn('goods_id', goodsIds).select()
  // let addressList;
  // if (addressId) {
  //   addressList = await mysql('nideshop_address').where({
  //     'user_id': userId,
  //     'id': addressId
  //   }).select()
  // } else {
  //   addressList = await mysql('nideshop_address').where({
  //     'user_id': userId
  //   }).select()
  // }

  ctx.body = {
    goodsList,
    allprice
  }
}

module.exports = {
  orderDetail
}