const mongoose = require('mongoose')
const baseModel = require('./base-model')

const tagSchema = new mongoose.Schema({
    ...baseModel,
    tagList: {
        type: [String],
        default: [
            'vue',
            'react',
            'angular',
            'HTML',
            'CSS',
            'JavaScript',
            'node.js',
            'express',
            'mongoDB',
            'MySQL'
        ]
    }
})


module.exports = tagSchema