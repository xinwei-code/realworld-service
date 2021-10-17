const validate = require('../middleware/validate')
const {
    body
} = require('express-validator')
const {
    User
} = require('../model')
const md5 = require('../util/md5')

//验证用户注册
exports.register = validate([
    body('user.username')
    .notEmpty()
    .withMessage('用户名不能为空')
    .custom(async username => {
        const user = await User.findOne({
            username
        })
        if (user) {
            return Promise.reject('用户名已存在')
        }
    }),
    body('user.password')
    .notEmpty()
    .withMessage('密码不能为空'),
    body('user.email')
    .notEmpty()
    .withMessage('邮箱不能为空')
    .isEmail()
    .withMessage('请输入合法的邮箱')
    .custom(async email => {
        const user = await User.findOne({
            email
        })
        if (user) {
            return Promise.reject('邮箱已存在')
        }
    }),
])


//验证用户登录
exports.login = [
    validate([
        body('user.password').notEmpty().withMessage('密码不能为空'),
        body('user.email').notEmpty().withMessage('邮箱不能为空'),
    ]),
    validate([
        body('user.email').custom(async (email, {
            req
        }) => {
            const user = await User.findOne({
                email
            })
            if (!user) {
                return Promise.reject('邮箱不存在')
            }
            //将user挂载到req对象上，方便后续使用
            req.user = user
        })
    ]),
    validate([
        body('user.password').custom(async (password, {
            req
        }) => {
            if (req.user.password !== md5(password)) {
                return Promise.reject('密码错误')
            }
        })
    ])
]