angular.module( 'ngBoilerplate.user', [
  'ui.router',
  'placeholders',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'register', {
      url: '/register',
      views: {
        "main": {
          controller: 'RegisterCtrl',
          templateUrl: 'user/security/register.tpl.html'
        }
      },
      data:{ pageTitle: 'Register' }
    })
    .state( 'login', {
      url: '/login',
      views: {
        "main": {
          controller: 'LoginCtrl',
          templateUrl: 'user/security/login.tpl.html'
        }
      },
      data:{ pageTitle: 'Login' }
    })
    .state( 'forgotPassword', {
      url: '/forgotPassword',
      views: {
        "main": {
          controller: 'ForgotPaswordCtrl',
          templateUrl: 'user/security/forgot_password.tpl.html'
        }
      },
      data:{ pageTitle: 'ForgotPassword' }
    })
    .state( 'passwordReset', {
      url: '/passwordReset',
      views: {
        "main": {
          controller: 'PasswordResetCtrl',
          templateUrl: 'user/security/password_reset.tpl.html'
        }
      },
      data:{ pageTitle: 'PasswordReset' }
    });
})

.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {
          scope.pwdValidLength = (viewValue && viewValue.length >= 8 ? 'valid' : undefined);
          scope.pwdHasLetter = (viewValue && /[A-z]/.test(viewValue)) ? 'valid' : undefined;
          scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;

          if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
              ctrl.$setValidity('pwd', true);
              return viewValue;
            } 
            else {
              ctrl.$setValidity('pwd', false);
              return undefined;
            }
          });

        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
})

.controller( 'RegisterCtrl', function RegisterCtrl( $scope ) {
})

.controller( 'LoginCtrl', ['$scope', '$location', '$window', 'Login', 
  function LoginCtrl ( $scope, $location, $window, Login ) {
  $scope.master = {};
  $scope.login = function($event) {
    $event.preventDefault();
    $scope.master = angular.copy($scope.user);
    var user = new Login($scope.master);
    user.$save(
        function requestToken (value, resposeHeader) {
            console.log(value);
            $window.sessionStorage.token = value.token;
        },
        function(httpResponse) {
          alert(httpResponse.status + ' ' + httpResponse.statusText);
          // Show error here that username or password is Incorrect!
          delete $window.sessionStorage.value;
        }
      );
  };
}])

.controller( 'ForgotPaswordCtrl', function ForgotPaswordCtrl( $scope ) {
})

.controller( 'PasswordResetCtrl', function PasswordResetCtrl( $scope ) {
})

;
