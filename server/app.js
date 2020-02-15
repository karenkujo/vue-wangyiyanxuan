const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const config = require('./config.js')
// 处理跨域
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

const router = require('./router/index.js')
app.use(router.routes())
app.use(router.allowedMethods());



app.listen(config.port, () => {
  console.log(`server is running http://localhost:${config.port}`)
})