const {
    validationResult,
    buildCheckFunction
} = require('express-validator')
const mongoose = require('mongoose')

exports = module.exports = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({
            errors: errors.array()
        });
    };
};

exports.isValidateObjectId =  (location, fields) => {
    return buildCheckFunction(location)(fields).custom(async value => {
        const result = mongoose.isValidObjectId(value)
        if (!result) {
            return Promise.reject('ObjectId不合法')
        }
    })
}