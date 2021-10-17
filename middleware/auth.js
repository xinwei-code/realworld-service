const {
    verify
} = require('../util/jwt')
const {
    jwtSecret
} = require('../config/base-config')
const {
    User
} = require('../model')

module.exports = async (req, res, next) => {
    let token = req.headers.token
    token = token ? token.split('Bearer ')[1] : null
    if (!token) {
        res.status(401).json({
            token: 'token不能为空'
        })
    }
    try {
        //验证token是否有效(过期等)
        const decodedToken = await verify(token, jwtSecret)
        //token有效,将user信息查出来挂载到req上
        req.user = await User.findById(decodedToken.userId)
        next()
    } catch (error) {
        res.status(401).end()
    }
}