'use strict';

angular.module('tgs', ['survey', 'ngRoute']);
angular.module('tgs').config(['$routeProvider', function($routeProvider) {
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
            templateUrl : 'survey/survey.html',
            controller  : 'surveyController'
        })

        .otherwise({redirectTo: '/home'});
}]);
angular.module('tgs').controller('mainController', function($scope, $rootScope, $location) {
$rootScope.showCarousel = true

    // redirect to survey
    $scope.start_survey=function(){
    console.log('survey function called')
    $location.path('/survey')
    }

});