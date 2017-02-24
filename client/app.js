console.log('hi from app.js');

var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl: 'partials/logReg.html'
    })
    .when('/dash',{
        templateUrl: 'partials/addquote.html'
    })
    .when('/showall',{
        templateUrl: 'partials/showall.html'
    })
    .when('/topthree',{
        templateUrl: 'partials/topthree.html'
    })
    .otherwise({
        redirectTo: '/'
    })
})