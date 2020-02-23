const { mysql } = require('../../mysql.js')

const getCollection = async (ctx) => {
  const { userId } = ctx.query
  console.log(userId)
  const goodsIds = await mysql('nideshop_collect').column('value_id').where({
    'user_id': userId
  }).select()
  // console.log(goodsIds)
  let collectList = []
  if (goodsIds.length) {
    for (let item of goodsIds) {
      const goods = await mysql('nideshop_goods').where({
        id: item.value_id
      }).select()
      collectList.push(goods[0])
    }
  }
  ctx.body = {
    collectList
  }
}

module.exports = {
  getCollection
}