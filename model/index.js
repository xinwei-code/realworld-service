const mongoose = require('mongoose');
const {
    dbUrl
} = require('../config/base-config')

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl + '/newRealWorld');
}


module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article')),
    Tag: mongoose.model('Tag', require('./tag')),
    Comment: mongoose.model('Comment', require('./comment'))
}