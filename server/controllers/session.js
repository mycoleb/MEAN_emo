var mongoose = require('mongoose');
var User = mongoose.model('User');
// var bcrypt = require('bcrypt');
module.exports = (function(){
    return{
        login:function(req,res){
            console.log(req.body)
            User.findOne({name:req.body.name}, function(err, data){
            
            // Test to verify that session data is being saved (undefined vs user object)
            console.log(req.session.user);
            
            // bcrypt.gensalt(req.body.pass, 10, function(result){
            //  ....  
            //})
                // if NOT logged in ....
                if(!data){
                    var user = new User(req.body);
                    user.save(function(err, data){
                        // saving user to session to track login status
                        req.session.user = data;
                        req.session.save();
                        // passing data back to view
                        res.json(data);
                    })
                }
                else{
                    // saving user to session to track login status
                    req.session.user = data;
                    req.session.save();
                    res.json(data);
                }
            })
        },
        checkStatus: function(req, res){
            console.log('checking status ...');
            if(req.session.user){
                res.json(req.session.user);
            }
            else{
                res.json(null);
            }
        },
        logout: function(req, res){
            req.session.destroy();
            res.redirect('/');
        }
    }
})()