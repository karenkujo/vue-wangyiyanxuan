const { mysql } = require('../../mysql.js')
// 获取分类
const getCategoryType = async (ctx) => {
  const categoryType = await mysql('nideshop_category').where({
    'parent_id': 0
  }).select()

  ctx.body = {
    categoryType
  }
}

// 获取分类对应用数据
const getCurrent = async (ctx) => {
  const { id } = ctx.query
  
  const current = await mysql('nideshop_category').where({
    'id': id
  }).select()
  const currentList = await mysql('nideshop_category').where({
    'parent_id': id
  }).select()
  let currentData = {}
  currentData.current = current[0]
  currentData.current.currentList = currentList

  ctx.body = {
    currentData
  }
}


module.exports = {
  getCategoryType,
  getCurrent
}