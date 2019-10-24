const jwt = require('jsonwebtoken');
const User = require('../../models/User');


// CAUTION - ON a Real app we will be using a .ENV file. 
let token_secret = 'testing'


// Middleware that will check for authentication.
const authorization = (req, res, next) => {
    try {
        // Get the token from the header.
        if (!req.headers || !req.headers.authorization || req.headers.authorization.split(' ')[0] !== "Bearer" || req.headers.authorization.split(' ')[1] === undefined) {
            res.status(403).send('Unauthorized Token');
        } 

        const jwtToken = req.headers.authorization.split(' ')[1]; // Get the jwt token from the authorization header.


        if (jwtToken === undefined) { // Check if the token is undefined.
            res.status(403).send('No token given.');
        } else {
            try { 

                // Decode JWT token.
                const decoded = jwt.verify(jwtToken, token_secret);

                // Pass on the JWT token with res.locals.
                res.locals.userData = decoded
                next()

            } catch (error) {

                res.status(403).send('Unauthorized Token.');
            }
        }
    } catch (error) {
        res.status(403).send('Unauthorized Token');
    }
};

module.exports = authorization;