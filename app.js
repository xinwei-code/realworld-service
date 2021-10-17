const express = require('express')
const router = require('./router')
const morgan = require('morgan')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const app = express()

//加载数据库
require('./model')

//配置日志输出中间件
app.use(morgan('dev'))

//配置允许跨域
app.use(cors())
const Port = process.env.production || 3000

//配置解析请求体
app.use(express.json())


//挂载路由
app.use('/api/v1',router)

//配置错误处理中间件
app.use(errorHandler())  //灵活，可以通过参数传参

//监听端口
app.listen(Port, () => {
    console.log('app is running at http://localhost:' + Port);
})