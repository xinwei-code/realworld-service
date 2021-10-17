const {
    User,
} = require('../model')

//根据用户名获取用户个人信息
exports.getProfiles = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await User.findOne({
            username
        }).select(['username', 'avatar', 'bio', 'follow'])
        if (!user) {
            res.status(404).end('该用户不存在')
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        next(error)
    }
}

//关注用户
exports.followUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await User.findOne({
            username
        }).select(['username', 'avatar', 'bio', 'follow'])
        if (!user) {
            res.status(404).end('该用户不存在')
        }
        user.follow = true
        user.save()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}


// 取消关注用户
exports.cancleFollowUser = async (req, res, next) => {
    try {
        const username = req.params.username
        const user = await User.findOne({
            username
        }).select(['username', 'avatar', 'bio', 'follow'])
        if (!user) {
            res.status(404).end('该用户不存在')
        }
        user.follow = false
        user.save()
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}