let express = require('express');
let bookRouter = express.Router();
let authorization = require('../middleware//authorization')

// Use an authorization middleware to check for JWT.
//bookRouter.use(authorization);

bookRouter.route('/books').get((req,res) => {
    
    res.send('SIGNED IN')
})



module.exports = bookRouter; 