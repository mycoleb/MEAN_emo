var mongoose = require('mongoose');
var User = mongoose.model('User');  
var Quote = mongoose.model('Quote'); 

module.exports = (function(){
    return{
        
    add:function(req, res) {

        console.log('hi from the server controller');
        console.log("Data (in controller) from POST", req.body);
        
        var new_quote = new Quote({quote_date: req.body.quote_date, author: req.body.author, content: req.body.content, _user: req.body.user_id, likes:req.body.likes});
        
        console.log('New quote: ', new_quote);
        // //Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        
        new_quote.save(function(err, new_quote_result) {

            console.log(err);
            if(!err)
            {
                console.log('Not error saving');
                console.log(new_quote_result);
                res.json(new_quote_result);
            }
            else{
                console.log(err);
            }
       
        })
    },
    addlike:function(req, res) {

        console.log('hi from the server controller');
        console.log("Data (in controller) from POST", req.body);
        
        req.body.likes+=1;
        console.log('req.body.likes: ', req.body.likes);


        Quote.findById({ _id: req.body._id }, function (err, quote){
            quote.likes+=1;
            console.log('quote: ', quote);
            quote.save();
        
        if(!err)
            {
                console.log('No LIKE error saving');
                res.json(quote);
            }
            else{
                console.log(err);
            }


        });
        
        // // //Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
        

        //     console.log(err);
        //     if(!err)
        //     {
        //         console.log('Not error saving');
        //         console.log(new_quote_result);
        //         res.json(new_quote_result);
        //     }
        //     else{
        //         console.log(err);
        //     }
       
        // })
    },


    getall:function(req, res) {
        Quote.find({})
        .populate('_user')
        .exec(function(err, quotes){
            res.json(quotes);
        })
    },
        
    
        login:function(req,res){
            console.log(req.body)
            User.findOne({name:req.body.name}, function(err, data){
            
            // Test to verify that session data is being saved (undefined vs user object)
            console.log(req.session.user);
            
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