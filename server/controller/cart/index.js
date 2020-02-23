const { mysql } = require('../../mysql.js')

const getCartData = async (ctx) => {
  const { userId } = ctx.query
  let cartList = await mysql('nideshop_cart').where({
    'user_id': userId
  }).select()

  ctx.body = {
    cartList
  }
}

const deleteGoods = async (ctx) => {
  const { userId, deleteList } = ctx.request.body
  // console.log(userId, deleteList)
  const data = await mysql('nideshop_cart').whereIn('id', deleteList).andWhere({
    'user_id': userId
  }).del()
  if (data) {
    ctx.body = {
      msg: '删除成功',
      status: 200
    }
  } else {
    ctx.body = {
      msg: '删除失败'
    }
  }
}

module.exports = {
  getCartData,
  deleteGoods
}