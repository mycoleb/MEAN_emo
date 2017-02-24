console.log('hi from the quote factory');

app.factory('quoteFactory', function($http, $location){
    var factory = {};
    factory.quotes = [];
    
    // EVENTUALLY ENABLE GETALL
    factory.getAll = function(callback){
        $http.get('/quotes/getall').then(function(output){
            console.log('getall back from server controller')
            callback(output.data);
        })
    }

    // added the callback to dynamically refresh the data on the page
    factory.addQuote = function(quote){

        console.log('client factory addQuote: ', quote);

       $http.post('/quotes/add', quote).then(function(new_quote){

           console.log('new quote returned from controller', new_quote);
           $location.url('/showall');
            //  //factory.messages.push(new_message.data);
            //  if(new_quote.data){
            //      $location.url('/show')
            //  }
            //  console.log('returning new_message.data, being pushed to factory.messages: ')
            //  // callback to dynamically refresh page data
            //  callback(new_message.data);

        })
         
        // //  .then(function(new_quote){
        // //      //factory.messages.push(new_message.data);
        // //      console.log('returning new_message.data, being pushed to factory.messages: ', new_message.data )
        // //      // callback to dynamically refresh page data
        //      //callback(new_quote.data);

        // //})
        // // // $http.post('/messages/add', message).then(function(output){
        // // //      if(output.data){
        // // //          $location.url('/dash');
        // // //      }
        // // //  })
    }
    
     // added the callback to dynamically refresh the data on the page
    factory.addLike = function(quote){

        console.log('client factory addQuote: ', quote);

       $http.post('/quotes/addlike', quote).then(function(new_quote){

           console.log('new quote returned from controller', new_quote);
           $location.url('/showall');
        })
   
    }

    return factory;
})
