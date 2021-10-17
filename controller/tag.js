const {
    Tag
} = require('../model')

exports.getTagList = async (req, res, next) => {
    try {
        const tag = new Tag()
        res.status(200).json({
            tag
        })
    } catch (error) {
        next(error)
    }

}