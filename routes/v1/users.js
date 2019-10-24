let express = require('express');
let userRouter = express.Router();
let createJWT = require('../../jwt/user');
const displayMissingParameters = require('../middleware/displayMissingParams');
let Verifier = require('academic-email-verifier').Verifier

//Import the user model
let User = require('../../models/User')


// POST Request to Sign In 
userRouter.route('/signin').post((req,res) => {
    const required = ['email_address', 'password'];
    if (displayMissingParameters(req, res, required)) return;

    User.findOne({
        email_address : req.body.email_address
    }, (err, userfound) => {
        if(userfound == null){
            console.log('NOT FOUND')
        }else{
            userfound.comparePassword(req.body.password, (err_, isMatch) => {
                 if(isMatch){
                    res.send('JWT')
                 }else{
                     res.send('error')
                 }
            })
        }
    })


    
})

// POST Request that creates a new account.
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

                            // Create a new JWT token. 
                            let newToken = createJWT({
                                email_address : req.body.email_address,
                                first_name : req.body.first_name,
                                id : saved._id
                            })

                            console.log(newToken)
                            console.log('SAVED', saved)
                        }
                    })

                    
                }else{
                    console.log('USER EXISTS')
                }
            })

           
        }else{

            console.log('NOT VALID ACADEMIC')
        }

    }).catch((errr) => {
        console.log(errr)
    })


    res.send('CREATED USER')
})


module.exports = userRouter; 