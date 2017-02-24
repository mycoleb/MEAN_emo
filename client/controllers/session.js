// should contain only login, logout, session check
console.log('hello from session controller');

app.controller('sessionController', function($scope, sessionFactory){
    console.log('session controller is loading');

    sessionFactory.checkStatus(function(data){
        $scope.currentUser = data;
    });

    $scope.login = function(){
        // Error checking is HUGE
        // if you get 'undefined' error, you'll fail BB
        if(!$scope.user || !$scope.user.name || $scope.user.name.length < 3){
            alert('please enter valid name')
        }
        else{
            sessionFactory.login($scope.user)
        }
        console.log($scope.user.name)
    }
})