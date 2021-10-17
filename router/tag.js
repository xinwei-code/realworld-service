const express = require('express')
const tagCtrl = require('../controller/tag')

const router = express.Router()

//获取所有标签
router.get('/tags', tagCtrl.getTagList)

module.exports = router