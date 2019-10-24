/* Create a json web token. */

let jwt = require('jsonwebtoken');


// CAUTION - ON a Real app we will be using a .ENV file. 
let token_secret = 'testing'

//Function that takes in data and returns JWT token.
let createUserToken = function (data) {
    let token_data = data
    let token = jwt.sign(token_data, token_secret);
    return token
}

//Export the user token.
module.exports = createUserToken