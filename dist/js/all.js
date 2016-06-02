'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', ['ngRoute', 'myApp.view1', 'myApp.view2', 'myApp.version']).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({ redirectTo: '/view1' });
}]);
'use strict';

angular.module('myApp.view1', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]).controller('View1Ctrl', [function () {}]);
'use strict';

angular.module('myApp.view2', ['ngRoute']).config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}]).controller('View2Ctrl', [function () {}]);