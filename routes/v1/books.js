let express = require('express');
let bookRouter = express.Router();
let authorization = require('../middleware//authorization')
let Verifier = require('academic-email-verifier').Verifier

// Import the Book model
let Book = require('../../models/Book')



// Seeding the data model.
    // let bookData = {
    //     isbn : '9789462987043',
    //     title : "Astrophysics for People in a Hurry",
    //     author : 'Neil deGrasse Tyson',
    //     institution_name : "Massachusetts Institute of Technology"
    // }

    // Book.create(bookData, function(err,saved){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log(saved)
    //     }
    // })

// Use an authorization middleware to check for JWT.
bookRouter.get('/books', authorization, (req,res) => {
    // Get user data from the jwt returned. 
    let userData = res.locals.userData;
    
    // Use the Verifier NPM package to find the academic school of the email.
    Verifier.getInstitutionName(userData.email_address).then((resp) => {
        
        //Get institution name and trim the whitespaces out.
        let response = resp.trim()

        // Find the books associated with the institution. 
        Book.find({ institution_name : response}, function(err, found){
            if(err){

                // Error message using JSEND template. 
                let error_message = {
                    status : "error",
                    data : {
                        message : 'Could not find user.'
                    }
                }; 

                res.status(400).send(error_message)
                
            }else{

                // Success JSEND message template. 
                let success_message = {
                    status : "success",
                    data : "",
                }; 

                // Data to send back.
                let data = {
                    email_address : userData.email_address,
                    institution_name : response,
                    books : found
                }

                // Add data to success message. 
                success_message["data"] = data;

            
                res.status(200).send(success_message)
            }
        })
    })

    
});





module.exports = bookRouter; 