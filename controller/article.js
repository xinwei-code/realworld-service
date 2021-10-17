const {
    Article,
    User
} = require('../model')

//获取文章列表
exports.getArticles = async (req, res, next) => {
    try {
        const {
            tag,
            author,
            offset = 0,
            limit = 10
        } = req.query
        const queryObj = {}
        if (tag) {
            queryObj.tagList = tag
        }
        if (author) {
            const user = await User.findOne({
                username: author
            })
            queryObj.author = user ? user._id : null
        }
        const articleCount = await Article.countDocuments()
        const articleList = await Article
            .find(queryObj)
            .skip(Number.parseInt(offset)) //跳过多少条
            .limit(Number.parseInt(limit)) //取多少条
        if (!articleList) {
            return res.status(404).json({
                error: '文章列表为空'
            })
        }
        res.status(200).json({
            articleList,
            articleCount
        })
    } catch (error) {
        next(error)
    }

}

//获取文章
exports.getArticle = async (req, res, next) => {
    const articleId = req.params.articleId
    const article = await Article.findById(articleId)
    if (!article) {
        return res.status(404).end('文章不存在')
    }
    res.status(200).json({
        article
    })
}

//创建文章
exports.createArticle = async (req, res, next) => {
    try {
        const article = new Article(req.body.article)
        article.author = req.user._id
        article.populate('author')
        await article.save()
        res.status(201).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

//更新文章
exports.updateArticle = async (req, res, next) => {
    try {
        const newArticle = req.body.article
        const oldArticle = req.article
        Object.assign(oldArticle, newArticle)
        await oldArticle.save()
        res.status(200).json({
            oldArticle
        })
    } catch (error) {
        next(error)
    }
}

//删除文章
exports.deleteArticle = async (req, res, next) => {
    try {
        const article = req.article
        await article.deleteOne()
        res.status(200).end()
    } catch (error) {
        next(error)
    }
}

//对文章进行点赞
exports.likeArticle = async (req, res, next) => {
    try {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        article.favorited = true
        article.favoritesCount++
        article.save()
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}

//对文章取消点赞
exports.unlikeArticle = async (req, res, next) => {
    try {
        const articleId = req.params.articleId
        const article = await Article.findById(articleId)
        article.favorited = false
        article.favoritesCount--
        article.save()
        res.status(200).json({
            article
        })
    } catch (error) {
        next(error)
    }
}