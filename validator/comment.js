const validate = require('../middleware/validate')
const {
    body
} = require('express-validator')
const {
    Article,
    Comment
} = require('../model')

//添加评论
exports.addComment = [
    validate([
        body('comment.body').notEmpty().withMessage('评论内容不能为空')
    ]),
    validate([
        validate.isValidateObjectId(['param'], 'articleId')
    ]),
    //查看是否能找到这篇文章
    async (req, res, next) => {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        if (!article) {
            return res.status(404).send('This article is not found.')
        }
        req.article = article
        next()
    }
]

//删除评论
exports.deleteComment = [
    validate([
        validate.isValidateObjectId(['param'], 'articleId'),
        // validate.isValidateObjectId(['param'], 'id')
    ]),
    validate([
        validate.isValidateObjectId(['params'], 'id')
    ]),
    //查看是否能找到这篇文章
    async (req, res, next) => {
            const articleId = req.params.articleId
            const article = await Article.findById(articleId)
            if (!article) {
                return res.status(404).send('This article is not found.')
            }
            req.article = article
            next()
        },
        //评论id是否有效
        async (req, res, next) => {
            // const commentId = await Comment.findById(req.params.id)
            // console.log(commentId)
            // console.log(req.params.id)
            const comment = await Comment.findById(req.params.id)
            console.log(comment)
            if (!comment) {
              return  res.status(404).send('评论不存在')
            }
            req.comment = comment
            next()
        }
]