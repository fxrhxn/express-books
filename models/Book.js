let mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const bookModel = new Schema({
    isbn : { type: String },
    title : { type: String },
    author : { type: String },
    institution : [],
});

module.exports = mongoose.model('Books', bookModel)