let mongoose = require('mongoose')
const Schema = mongoose.Schema; 
var passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userModel = new Schema({
    name : { type: String },
    email_address : { type: String },
    role : { type: String },
    password : { type: String } 
});

/*****************************************************
 * BEFORE SAVING THE USER SCHEMA SAVES THE PASSWORD. *
 *****************************************************/
userModel.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/******************************************
 * ADD A METHOD TO COMPARE THE PASSWORDS. *
 ******************************************/
userModel.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('Users', userModel)