angular.module( 'ngBoilerplate.dashboard', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/',
    views: {
      "main": {
        controller: 'DashboardCtrl',
        templateUrl: 'dashboard/dashboard.tpl.html'
      }
    },
    data:{ pageTitle: 'Dashboard', authenticate: true }
  })

  .state( 'monolithic', {
    url: '/monolithic',
    views: {
      "main": {
        controller: 'MonoCtrl',
        templateUrl: 'dashboard/monolithic.tpl.html'
      }
    },
    data:{ pageTitle: 'Monolithic', authenticate: false }
  });
})

.controller( 'DashboardCtrl', ['$scope', '$window', '$location', 'EC2Client', 
  function DashboardCtrl( $scope, $window, $location, EC2Client) {
  //$scope.authenticated = false;
  if ($window.sessionStorage.token) {
    $scope.authenticated = true;
    $location.path('/');
    $scope.apply();
    var instance = EC2.get( function () {
        console.log(instance);
    });
  }
   else {
          $location.path('/monolithic');
      } 
}])

.controller( 'MonoCtrl', function MonoCtrl( $scope, $window, $location) {
})
;