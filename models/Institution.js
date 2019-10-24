let mongoose = require('mongoose')
const Schema = mongoose.Schema; 

const institutionModel = new Schema({
    name : { type: String },
    url : { type: String },
    email_domain : { type: String },
    books : [],
});

module.exports = mongoose.model('Institutions', institutionModel)