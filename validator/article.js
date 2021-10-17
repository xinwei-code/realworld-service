const validate = require('../middleware/validate')
const {
    body
} = require('express-validator')
const {
    Article,
    User
} = require('../model')

//创建文章
exports.createArticle = [
    validate([
        body('article.title').notEmpty().withMessage('文章标题不能为空'),
        body('article.description').notEmpty().withMessage('文章描述不能为空'),
        body('article.body').notEmpty().withMessage('文章内容不能为空'),
    ])
]

//更新文章
exports.updateArticle = [
    //验证id是否是一个有效的ObjectId
    validate([validate.isValidateObjectId(['params'], 'articleId')]),
    async (req, res, next) => {
            //是否能查找到这篇文章
            const article = await Article.findById(req.params.articleId)
            if (!article) {
                return res.status(404).end('此文章不存在')
            }
            req.article = article
            next()
        },
        //判断文章作者和登录用户是否同一人
        async (req, res, next) => {
            if (req.article.author.toString() !== req.user._id.toString()) {
                return res.status(403).end('身份不合法')
            }
            next()
        }
]

exports.deleteArticle = exports.updateArticle