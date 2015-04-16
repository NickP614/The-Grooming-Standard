

'use strict';

// Declare app level module which depends on views, and components
var tgs = angular.module('tgs', ['ngRoute']);

tgs.config(['$routeProvider', function($routeProvider) {
  $routeProvider
        // route for the home page
        .when('/home', {
            templateUrl : 'partials/home.html',
            controller  : 'mainController'
        })

        // route for the What is TGS? page
        .when('/tgs', {
            templateUrl : 'partials/tgs.html',
            controller  : 'tgsController'
        })

        // route for the Become a vendor page
        .when('/vendors', {
            templateUrl : 'partials/vendors.html',
            controller  : 'vendorsController'
        })

        // route for the Barbers blog page
        .when('/blog', {
            templateUrl : 'partials/blog.html',
            controller  : 'blogController'
        })

        // route for the Contact us page
        .when('/contact', {
            templateUrl : 'partials/contact.html',
            controller  : 'contactController'
        })

        // route for the home page
        .when('/survey', {
            templateUrl : 'partials/survey.html',
            controller  : 'surveyController'
        })

        .otherwise({redirectTo: '/home'});
}]);

tgs.run(function($rootScope) {
$rootScope.showCarousel = true
});


// create the main controller and inject Angular's $scope
tgs.controller('mainController', function($scope, $rootScope, $location) {
$rootScope.showCarousel = true

    // redirect to survey
    $scope.start_survey=function(){
    console.log('survey function called')
    $location.path('/survey')
    }
// needed for UI Bootstrap carousel
//$scope.slides = [
//{image:'../TGS-stock_photos/stock-photo-52621018-barber.jpg', text: 'Break Free From the Chains'},
//{image:'../TGS-stock_photos/stock-photo-48664290-shaving-brushes-at-barbershop.jpg', text: 'Join the Custom Revolution'},
//{image:'../TGS-stock_photos/stock-photo-50019520-barber-s-chair-ghost-town.jpg', text:'Elevating Standards With a Custom Touch'}
//]
});


tgs.controller('surveyController', function($scope, $rootScope, $location) {
$rootScope.showCarousel = false
$scope.survey_page = 1;
$scope.haircuts = [
    ['1729642','-urban-grunge-portrait.jpg'],
    ['9377769','-hair-styled-man.jpg'],
    ['15414914','-african-man-portrait.jpg'],
    ['18623773','-bespectacled-young-male-on-off-white-background.jpg'],
    ['29765448','-portrait-of-a-young-man.jpg'],
    ['42365852','-man-wearing-sunglasses-and-suit-dreadlocks.jpg'],
    ['49328610','-cheerful-young-man-portrait.jpg'],
    ['55326536','-sculptural-face-and-mohican-hairstyle.jpg'],
    ['58450262','-turkish-thoughtful-young-man.jpg'],
    ['58954580','-i-ve-got-a-reason-to-smile.jpg']
    ]

    $scope.shuffle = function (array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$scope.haircuts = $scope.shuffle($scope.haircuts);
    $scope.haircuts_list = [$scope.haircuts.slice(0,3), $scope.haircuts.slice(3,6), $scope.haircuts.slice(6,9), [$scope.haircuts[9]]];

    console.log($scope.haircuts_list);

});