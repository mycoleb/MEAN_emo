// should contain only login, logout, session check
console.log('hello from quote controller');

app.controller('quoteController', function($scope, quoteFactory, $route){

 // this will run when the controller is loaded, auto-populating $scope.topics
    quoteFactory.getAll(function(data){
        $scope.quotes = data;
        console.log('getAll data coming back', data);
    })

    // console.log('messageFactory raw: ', messageFactory);
    // $scope.messages = messageFactory.messages;


     $scope.addQuote = function(current_user_id, newQuote){
        console.log('quote controller client - newQuote: ', newQuote);
        console.log(current_user_id);

        $scope.errors = [];
        
        if(!$scope.newQuote ||!$scope.newQuote.content){
            $scope.errors.push('please enter text in the fields.');
        }
        else if($scope.newQuote.content.length <4){
            $scope.errors.push('title must be at least 4 chars.');
        }
        else if($scope.newQuote.content.length >144){
            $scope.errors.push('title is too long');
        }else{
            
            $scope.newQuote.user_id = current_user_id;
            $scope.newQuote.likes = 0;
            //callback here to update topics - data coming from factory 
            quoteFactory.addQuote($scope.newQuote, function(data){
                $scope.quotes.push(data);
            });

            // clearing/resetting client UI values
            $scope.newQuote = {};
        }

    }

    $scope.like = function(quote_to_like){

        quoteFactory.addLike(quote_to_like), function(data){
            $scope.quotes.push(data);
        }     
        console.log('Quote to Like: ', quote_to_like);
        $route.reload()
    }
    
    $scope.topthree= function(){
        $location.url('/topthree');
    }
})