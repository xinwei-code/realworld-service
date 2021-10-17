const {
    Comment,
    Article
} = require('../model')


// 添加评论
exports.addComment = async (req, res, next) => {
    try {
        const comment = new Comment(req.body.comment)
        comment.author = req.user._id
        comment.article = req.article._id

        await comment.save()
        req.article.comment.push(comment._id)
        await req.article.save()
        res.status(200).json({
            comment
        })
    } catch (error) {
        next(error)
    }
}

//获取文章评论
exports.getArticleComments = async (req, res, next) => {
    try {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId).populate('comment')

        if (!article) {
            return res.status(404).end()
        }

        res.status(200).json({
            comments: article.comment
        })

    } catch (error) {
        next(error)
    }
}

//删除评论
exports.deleteComment = async (req, res, next) => {
    try {
        const article = req.article
        const comment = req.comment
        const commentIndex = article.comment.findIndex(item => item === req.params.id)
        article.comment.splice(commentIndex, 1)
        await article.save()
        await Comment.deleteOne(comment)
        res.status(200).end()
    } catch (error) {
        next(error)
    }
}