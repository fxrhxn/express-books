# Express Coding Challenge
The premise of this challenge is to see the approach you take to:
Use an ORM to interact with a simple database model

- The ORM of choice is Mongoose/MongoDB. 

Create a basic routing mechanism for HTTP requests

- Express and Node.js on the Backend were used for 

Authenticate a user’s access to a route

- JWT token via the JsonWebToken package were used. 


Test your work with both unit tests and integration tests.

- Mocha and Chai were used to test all the routes.



## Running this application
You can run the application by typing:
`npm install` followed by `npm start` 

You can test the application by typing:
`npm test` 


## Routes
All the routes and endpoints

### GET /
Main homepage route showing simple text.

### POST /users/signin
Sign In and get a JWT token returned.
Parameters: email_address(string), password(string)

### POST /users/create 
Create a new user. 
Parameters: username(String), password(String), first_name(String),last_name(String), role(String),email_address(String)


### GET /books
Gets all the books a user can access via institution.
Send JWT from the header. 
Example: "Bearer {JWT TOKEN}"
