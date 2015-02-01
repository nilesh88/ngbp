angular.module( 'ngBoilerplate.userSetting', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'passwordChange', {
    url: '/passwordChange',
    views: {
      "main": {
        controller: 'PasswordChangeCtrl',
        templateUrl: 'user/profile/password_reset.tpl.html'
      }
    },
    data:{ pageTitle: 'passwordChange', authenticate: true }
  })
  .state( 'updateAPIKey', {
      url: '/updateAPIKey',
      views: {
        "main": {
          controller: 'UpdateAPIKeyCtrl',
          templateUrl: 'user/profile/updateAPIKey.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    })

.controller( 'PasswordChangeCtrl', function PasswordChangetCtrl( $scope ) {
})

.controller( 'UpdateAPIKeyCtrl', function UpdateAPIKeyCtrl( $scope ) {
})

;