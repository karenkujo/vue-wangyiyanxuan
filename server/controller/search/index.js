const { mysql } = require('../../mysql')
// 添加搜索历史
const saveHistory = async (ctx) => {
  const { userId, keyWords } = ctx.request.body

  const oldData = await mysql('nideshop_search_history').where({
    'user_id': userId,
    'keyword': keyWords
  })
  if (oldData.length == 0) {
    const data = await mysql('nideshop_search_history').insert({
      'user_id': userId,
      'keyword': keyWords,
      'add_time': parseInt(new Date().getTime() / 1000)
    })
    if (data) {
      ctx.body = {
        data: '添加成功'
      }
    } else {
      ctx.body = {
        data: '添加失败'
      }
    }
  } else {
    ctx.body = {
      data: '已经有记录了'
    }
  }
} 
// 获取历史搜索记录和热门搜索
const historyAndHotSearch = async (ctx) => {
  const userId = ctx.query.userId
  // console.log(userId)
  const hotSearchList = await mysql('nideshop_keywords').limit(10).select()
  const historyList = await mysql('nideshop_search_history').where({
    'user_id': userId
  }).limit(10).select()

  ctx.body = {
    hotSearchList,
    historyList
  }
}
// 清空搜索记录
const clearHistory = async (ctx) => {
  const { userId } = ctx.request.body
  console.log(userId)
  const data = await mysql('nideshop_search_history').where({
    'user_id': userId
  }).del()
  if (data) {
    console.log(data)
    ctx.body = {
      'data': '清除成功'
    }
  } else {
    ctx.body = {
      'data': '没有搜索历史'
    }
  }
}

module.exports = {
  saveHistory,
  historyAndHotSearch,
  clearHistory
}