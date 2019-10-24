// test/app_spec.js
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');

var expect = chai.expect;

chai.use(chaiHttp);

describe('App', function(){

    //Testing Home Page. 
    describe('/', function () {
        it('responds with status 200', function (done) {
            chai.request(app)
                .get('/')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });


     //Logging In A User
    describe('/users/signin', function () {
        it('responds with status 200', function (done) {

            let req_data = {
                email_address : "ABC@mit.edu",
                password : "testings",
            }

            chai.request(app)
                .post('/users/signin')
                .send(req_data) 
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });



    //Creating a user.  
    describe('/users/create', function () {
        it('responds with status 200', function (done) {
            
            let req_data = {
                email_address : "testing123@mit.edu",
                password : "test",
                first_name : 'John',
                last_name : 'Doe',
                role : 'Admin', 
                username : 'jdoe'
            }

            chai.request(app)
                .post('/users/create')
                .send(req_data) 
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });



     // Getting all the books. 
    describe('/books', function () {

        it('responds with status 200 or 401', function (done) {
       
            chai.request(app)
                .get('/books')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjE5Y2ViZjIwYTkyZDk3YjNmZTA4ZSIsIm5hbWUiOiJ0ZXN0IHRlc3RpbmciLCJlbWFpbF9hZGRyZXNzIjoiQUJDQHN0YW5mb3JkLmVkdSIsInJvbGUiOiJoYSIsImlhdCI6MTU3MTkyMTEzMX0.ix8peSVoZ2BqmfsRqkD68Ka0knr94w1h0k_vawn_ulA')
                .end(function (err, res) {

                    expect(res).to.have.status(200);
                    done();
                });
        });
        
    });
    
    

})