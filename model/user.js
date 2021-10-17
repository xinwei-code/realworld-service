const mongoose = require('mongoose')
const baseModel = require('./base-model')
const md5 = require('../util/md5')


const userSchema = new mongoose.Schema({
    ...baseModel,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        set: value => md5(value),
        select: false
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: ''
    },
    follow: {
        type: Boolean,
        default: false,
    }

})

module.exports = userSchema