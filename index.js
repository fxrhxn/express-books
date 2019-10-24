let express = require('express')
let cors = require('cors');
let fileUpload = require('express-fileupload');

/*********************************************************************
 * PREREQUISITES BEFORE STARTING SERVER: BODY PARSER AND File UPLOAD*
 *******************************************************************/
const app = express();
app.use(fileUpload())
let mongoose = require('mongoose')
let bodyParser = require('body-parser')
require('dotenv').config();


// PASSPORT TESTING
const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

/****************
 * V1 ROUTES *
 ****************/
let home = require('./routes');
let books_v1 = require('./routes/v1/books');
let user_v1 = require('./routes/v1/users');
let notFound = require('./routes/notfound');

// Port to listen to. 
const port = process.env.PORT || 3000;



/*********************************
 * // CONNECTING TO THE DATABASE *
 *********************************/

// On a real app we should use an ENV file to save the mongodb URI. example: process.env.DB_ADDRESS_MLAB
const db_uri = 'mongodb+srv://farhan:qoAdWEm577ukmKYj@cluster0-jf0jv.mongodb.net/test?retryWrites=true&w=majority'
const db = mongoose.connect(db_uri, {
    useNewUrlParser: true,
    autoIndex: false
});

/**********************************
 * SETTING UP BODY PARSER MIDDLEWARE *
 **********************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Initializing with Passport. 
app.use(passport.initialize());
app.use(passport.session());



/*****************
 * V1 API ROUTES BEING USED *
 *****************/
app.use('/', home);
app.use('/', books_v1);
app.use('/users', user_v1);


/*************
 * WHEN ROUTE IS NOT FOUND *
 *************/
app.use("*", notFound);


// Running the server and listening to a port.
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

