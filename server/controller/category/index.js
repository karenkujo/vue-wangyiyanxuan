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

const getCategoryNav = async (ctx) => {
  const { id } = ctx.query
    // 获取当前分类
    const currentNav = await mysql('nideshop_category').where({
      'id': id
    }).select()
    // 获取同级分类
    const NavList = await mysql('nideshop_category').where({
      'parent_id': currentNav[0].parent_id
    }).select()
    ctx.body = {
      NavList
    }
}

const getActiveList = async (ctx) => {
  const { id } = ctx.query
  let activeList = []
  if (id) {
    // 如果是二级分类
    activeList = await mysql('nideshop_goods').where({
      'category_id': id
    }).select()
    // 一级分类
    if (!activeList.length) {
      let childrenIds = await mysql('nideshop_category').where({
        'parent_id': id
      }).column('id').select()
      if (childrenIds.length) {
        childrenIds = childrenIds.map(item => {
          return item.id
        })
      }
      activeList = await mysql('nideshop_goods').whereIn('category_id', childrenIds).limit(30).select()
    }
    ctx.body = {
      activeList
    }
  }
}


module.exports = {
  getCategoryType,
  getCurrent,
  getCategoryNav,
  getActiveList
}