angular.module( 'ngBoilerplate.factory', [
  'ngResource'
])

.constant('APIBASEURL',
        'http://zippy-highgarden-44-184167.use1-2.nitrousbox.com/api/v1')

.factory('Register', function ($resource, APIBASEURL) {
  var registerURL = APIBASEURL +'/users\\/';
  return $resource( registerURL ); 
})

.factory('Login', function ($resource, APIBASEURL){
    var loginURL = APIBASEURL +'/auth\\/';
  //var loginURL = 'http://zippy-highgarden-44-184167.use1-2.nitrousbox.com/api-token-auth\\/';
  return $resource(loginURL);
})

.factory('EC2Client', function ($resource, APIBASEURL){
  var EC2URL = APIBASEURL +'/ec2/\\/';
  return $resource(EC2URL);
});