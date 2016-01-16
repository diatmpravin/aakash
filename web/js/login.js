angular.module('loginApp', [])
.controller('LoginController', ['$scope', '$window', '$http', function($scope, $window, $http) {
          
    $scope.notlogged = true;
    $scope.gotodash = false;
    if(angular.isDefined($window.sessionStorage.token))
    {
        $scope.notlogged = false;
        $scope.gotodash = true;
    }

    this.postForm = function() {
        var encodedString = '{"email":"'+this.inputData.username+'","password":"'+this.inputData.password+'"}';
        var uname = this.inputData.username;

        $http({
            method: 'POST',
            url: '/session/new',
            data: encodedString,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        .success(function(data, status, headers, config) {
            console.log(data);              
            var tok = angular.fromJson(data).sessionid;
            if (tok != null) {
                $window.sessionStorage.sessionid = tok;
                $window.sessionStorage.uname = uname ;
                window.location.href = '/session/dashboard';
            } else {
                $scope.errorMsg = "Login not correct";
            }
        })
        .error(function(data, status, headers, config) {
            $scope.errorMsg = data;
        })
    }
}]);

