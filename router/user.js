const express = require('express')
//controller
const userCtrl = require('../controller/user')
//validator
const userValidator = require('../validator/user')
//是否需要授权
const auth = require('../middleware/auth')

const router = express.Router()


//用户登录
router.post('/users/login', userValidator.login, userCtrl.userLogin)

//用户注册
router.post('/users/register', userValidator.register, userCtrl.userRegister)

//获取当前登录用户
router.get('/user', auth, userCtrl.getCurrentUser)

//更新用户
router.put('/user', auth, userCtrl.updateUser)

module.exports = router