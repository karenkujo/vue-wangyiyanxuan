const { mysql } = require('../../mysql.js')

const register = async (ctx) => {
  const { username, password, mobile } = ctx.request.body
  // console.log( username, password, mobile )
  const isUser = await mysql('nideshop_user').where({
    'username': username
  }).select()
  if (isUser.length) {
    ctx.body = {
      msg: '用户名已存在'
    }
  } else {
    const data = await mysql('nideshop_user').insert({
      'username': username,
      'password': password,
      'mobile': mobile
    })
    if (data.length) {
      ctx.body = {
        msg: '注册成功，请登录',
        status: 200
      }
    } else {
      ctx.body = {
        msg: '注册失败'
      }
    }
  }
}

const login = async (ctx) => {
  const { username, password } = ctx.query
  // console.log(username, password)
  const hasUser = await mysql('nideshop_user').where({
    'username': username,
    'password': password
  }).select()
  let user = {}
  if (hasUser.length) {
    user["userId"] = hasUser[0].id
    user["username"] = hasUser[0].username
    ctx.body = {
      user,
      status: 200,
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      msg: '用户名或密码不正确'
    }
  }
}

module.exports = {
  register,
  login
}