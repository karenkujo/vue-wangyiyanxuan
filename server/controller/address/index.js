const { mysql } = require('../../mysql')

const getAddressList = async (ctx) => {
  const { userId } = ctx.query
  const addressList = await mysql('nideshop_address').where({
    'user_id': userId
  }).select()
  ctx.body = {
    addressList
  }
}

const saveAddress = async (ctx) => {
  const { userId, addressId, userName, mobile, address, detailAddress, checked } = ctx.request.body
  // console.log(userId, addressId, userName, mobile, address, detailAddress, checked)
  // 如果默认选中，查询默认地址设为非默认
  if (checked) {
    const isDefault = await mysql('nideshop_address').where({
      'user_id': userId,
      'is_default': 1
    }).select()
    if (isDefault.length) {
      await mysql('nideshop_address').where({
        'user_id': userId,
        'is_default': 1
      }).update({
        'is_default': 0
      })
    }
  }
  // 如果没有addressId，则表示为添加地址
  if (!addressId) {
    const data = await mysql('nideshop_address').insert({
      'user_id': userId,
      'name': userName,
      'mobile': mobile,
      'address': address,
      'address_detail': detailAddress,
      'is_default': checked ? 1 : 0
    })
    if (data) {
      ctx.body = {
        msg: '保存成功',
        status: 200
      }
    } else {
      ctx.body = {
        msg: '保存失败'
      }
    }
  } else {  // 否则为修改地址
    const data = await mysql('nideshop_address').where({
      'id': addressId
    }).update({
      'user_id': userId,
      'name': userName,
      'mobile': mobile,
      'address': address,
      'address_detail': detailAddress,
      'is_default': checked ? 1 : 0
    })
    if (data) {
      ctx.body = {
        msg: '保存成功',
        status: 200
      }
    } else {
      ctx.body = {
        msg: '保存失败'
      }
    }
  }
}

const getAddress = async (ctx) => {
  const addressId = ctx.query.addressId
  let addressInfo = await mysql('nideshop_address').where({
    id: addressId
  }).select()
  ctx.body = {
    addressInfo: addressInfo[0]
  }
}

const deleteAddress = async (ctx) => {
  const addressId = ctx.query.addressId
  const data = await mysql('nideshop_address').where({
    id: addressId
  }).del()
  if (data) {
    ctx.body = {
      status: 200,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      msg: '删除失败'
    }
  }
}

module.exports = {
  getAddressList,
  saveAddress,
  getAddress,
  deleteAddress
}