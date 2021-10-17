const {
    User,
} = require('../model')
const {
    sign
} = require('../util/jwt')
const {
    jwtSecret
} = require('../config/base-config')

//用户登录
exports.userLogin = async (req, res, next) => {
    try {
        // JSON.parse('asdjashdjka')  测试错误处理中间件是否工作

        //1.数据验证
        // 2.生成token
        const user = req.user.toJSON()
        delete user.password
        const token = await sign({
            userId: user._id
        }, jwtSecret, {
            expiresIn: '15 days'
        })
        res.status(200).json({
            ...user,
            token
        })
    } catch (error) {
        next(error)
    }

}

//用户注册
exports.userRegister = async (req, res, next) => {
    try {
        let user = new User(req.body.user)
        await user.save()
        user = user.toJSON()
        delete user.password
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

//获取当前登录用户 
exports.getCurrentUser = async (req, res, next) => {
    try {
        let user = req.user
        user = user.toJSON()
        delete user.password
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

//更新用户
exports.updateUser = async (req, res, next) => {
    const newUser = req.body.user
    const oldUser = req.user
    Object.assign(oldUser, newUser)
    try {
        await oldUser.save()
        res.status(200).json(
            oldUser
        )
    } catch (error) {
        next(error)
    }
}