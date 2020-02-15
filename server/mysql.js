const config = require('./config')

const knex = require('knex') ({
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.db,
  }
})

module.exports = { mysql: knex }