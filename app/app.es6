// Declare app level module which depends on views, and components

var angularApp = angular.module('app', [
    'ngRoute',
    'app.controllers',
    'angular-velocity',
    'ngAnimate'
]);

angularApp.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //$locationProvider.hashPrefix('!');

    //Setup URL routes.
    $routeProvider.
        when('/', {
            templateUrl: 'angular-app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
            label: 'Home'
        }).
        otherwise({redirectTo: '/'});
}]);

/**
 * Here we declare some empty modules for our application where we will put the app's controllers, directives, and services
 */
angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);