const express = require('express')

const router = express.Router()


// 用户相关路由
router.use(require('./user'))

//文章相关路由
router.use('/articles', require('./article'))

//用户信息相关路由
router.use('/profiles', require('./profile'))

//评论相关路由
router.use('/articles', require('./comment'))

//标签相关路由
router.use(require('./tag'))

module.exports = router
