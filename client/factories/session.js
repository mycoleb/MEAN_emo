console.log('hi from the session factory');
app.factory('sessionFactory', function($http, $location){
    var factory = {};
    factory.login = function(user){
        console.log(user);
        // injected $http above
        // now going to server route and passing user object
        // .then is the 'promise'
        $http.post('/login', user).then(function(output){
            if(output.data){
                $location.url('/dash');
            }
        })
    }
    factory.checkStatus = function(callback){
        $http.get('checkstatus').then(function(output){
            if(!output.data){
                $location.url('/');
            }
            else
            {
                callback(output.data);
            }
        })
    }
    return factory;
})