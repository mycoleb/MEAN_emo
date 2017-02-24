console.log('hi from server routes.js');
var mongoose = require('mongoose');
var user = require('./../controllers/session.js');
var quote = require('./../controllers/quote.js');

module.exports = function(app){

    app.post('/quotes/add', function(req, res){
        console.log('hi from the add quote server route');
        quote.add(req, res);
    })

    app.get('/quotes/getall', function(req, res){
        console.log('hi from the getall quote server route');
        quote.getall(req, res);
    })

     app.post('/quotes/addlike', function(req, res){
        console.log('hi from the addLike quote server route');
        quote.addlike(req, res);
    })

    app.post('/login', function(req, res){
        console.log('hi from login function in server routes');
        user.login(req, res);
    })
    
    app.get('/logout', function(req, res){
        user.logout(req, res);
    })
    
    app.get('/checkstatus', function(req, res){
        user.checkStatus(req, res);
    })
}