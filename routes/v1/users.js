let express = require('express');
let userRouter = express.Router();
let createJWT = require('../../jwt/user');
const displayMissingParameters = require('../middleware/displayMissingParams');
let Verifier = require('academic-email-verifier').Verifier

//Import the user model
let User = require('../../models/User')


/* ROUTE - /users/signin
POST Request that logs into an account. 
**********************************************/
userRouter.route('/signin').post((req,res) => {
    const required = ['email_address', 'password'];
    if (displayMissingParameters(req, res, required)) return;

    // Find one user. 
    User.findOne({
        email_address : req.body.email_address
    }, (err, userfound) => {
        if(userfound == null){
            
            // Error message using JSEND template. 
            let error_message = {
                status : "error",
                data : {
                    message : 'Could not find a user.'
                }
            }; 

                res.status(400).send(error_message)
        }else{
            userfound.comparePassword(req.body.password, (err_, isMatch) => {
                 if(isMatch){
                    
                    // Success JSEND message template. 
                    let success_message = {
                        status : "success",
                        data : "",
                    }; 

                    // Data that gets transformed into a JWT token.
                    let jwt_data = {
                        id : userfound._id,
                        name : userfound.name,
                        email_address : userfound.email_address,
                        role : userfound.role
                    };

                    // Create a jwt token
                    let jwtCreated = createJWT(jwt_data)

                    // Data block for returning data
                    let returning_DATA = {
                        email_address : userfound.email_address,
                        jwt : jwtCreated
                    }

                    // Add data to JSEND template 
                    success_message["data"] = returning_DATA

                    res.status(200).send(success_message)

                 }else{

                    // Error message using JSEND template. 
                    let error_message = {
                        status : "error",
                        data : {
                            message : 'error sending request.'
                        }
                    }; 

                     res.status(400).send(error_message)
                 }
            })
        }
    })


    
})

/* ROUTE - /users/create
 POST Request that creates a new account. 
**********************************************/
userRouter.route('/create').post((req,res) => {
    const required = ['first_name', 'last_name', 'email_address', 'role', 'password'];
    if (displayMissingParameters(req, res, required)) return;

    // Get email address from the body. 
    let email_address = req.body.email_address
    
    // Check if email is an academic address. 
    Verifier.isAcademic(email_address).then((isAcademic) => {
        
        // Boolean to check if it's a valid academic email address.
        if(isAcademic){
   
            // Check if user already exists in database.
            User.findOne({
                email_address: email_address,
            }, (err, userfound) => {

                if(userfound == null){

          
                    // Get all of the data to save
                    let dataToSave = {
                        name : req.body.first_name + ' ' + req.body.last_name,
                        email_address : req.body.email_address,
                        role : req.body.role,
                        password : req.body.password 
                    }

                    // Create a user with all of the data. 
                    User.create(dataToSave, (err_, saved) => {
                        if(err_){
                            console.log(err_)
                        }else{

                          // Success JSEND message template. 
                            let success_message = {
                                status : "success",
                                data : "",
                            }; 


                            // Create a new JWT token. 
                            let newToken = createJWT({
                                id : saved._id,
                                name : saved.name,
                                email_address : saved.email_address,
                                role : saved.role
                            });

                          // Data block to send back
                            let returning_DATA = {
                                email_address : saved.email_address,
                                jwt : newToken
                            }

                            // Add data to JSEND template 
                            success_message["data"] = returning_DATA


                            res.status(200).send(success_message)
                        }
                    })

                    
                }else{
                    
                    // Error message using JSEND template. 
                    let error_message = {
                        status : "error",
                        data : {
                            message : 'User Already Exists.'
                        }
                    }; 

                    res.status(400).send(error_message)
                }
            })

           
        }else{

            // Error message using JSEND template. 
            let error_message = {
                status : "error",
                data : {
                    message : 'This email is not an academic email.'
                }
            }; 

            res.status(400).send(error_message)
        }

    }).catch((errr) => {

        // Error message using JSEND template. 
        let error_message = {
            status : "error",
            data : {
                message : 'Error sending request.'
            }
        }; 

        res.status(400).send(error_message)

    })


 
})


module.exports = userRouter; 