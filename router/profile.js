const express = require('express')
const ProfileCtrl = require('../controller/profile')
const auth = require('../middleware/auth')

const router = express.Router()

//根据用户名获取用户个人信息
router.get('/:username', ProfileCtrl.getProfiles)

//关注用户
router.post('/:username/follow', auth, ProfileCtrl.followUser)

//取消关注用户
router.delete('/:username/follow', auth, ProfileCtrl.cancleFollowUser)

module.exports = router