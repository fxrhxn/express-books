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
            res.status(403).send('Unauthorized Token');
        } else {
            try { // Check the jwt token and look for authentication.
                const decoded = jwt.verify(jwtToken, token_secret);

                if (decoded.super_user === undefined) { // Check if the token is valid.
                    res.status(403).send('Unauthorized Token');
                } else {
                    // Find the user and check if approved.
                    User.findOne({
                        uuid: decoded['user_id']
                    }, (err, user) => {
                        if (err) {
                            res.status(403).send(err);
                        } else if (user === null) {
                            res.status(403).send('User not found. Make sure your token is correct.');
                        } else if (user.approved) {
                            res.locals.superUser = user; // setting local var
                            next(); // !!!!!!!!!!!!!!!!!!!!!!!!!!!! SUCCESS !!!!!!!!!!!!!!!!!!!!!! 
                        } else {
                            res.status(403).send("Unapproved User. Please contact Carbon Fiber's team for next steps");
                        }
                    });
                }
            } catch (error) {
                res.status(403).send('Unauthorized Token');
            }
        }
    } catch (error) {
        res.status(403).send('Unauthorized Token');
    }
};

module.exports = authorization;