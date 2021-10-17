const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
//validator
const commentValidator = require('../validator/comment')
//controller
const commentCtrl = require('../controller/comment')



//给文章添加评论
router.post('/:articleId/comments', auth, commentValidator.addComment, commentCtrl.addComment)

//获取文章的评论
router.get('/:articleId/comments', commentCtrl.getArticleComments)

//删除文章评论
router.delete('/:articleId/comments/:id', auth, commentValidator.deleteComment, commentCtrl.deleteComment)

module.exports = router