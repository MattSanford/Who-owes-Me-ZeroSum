var app = angular.module('app.Wom');
var ref = new Firebase('https://who-owes-me.firebaseio.com/'); //Where data is stored
var usersRef = new Firebase('https://who-owes-me.firebaseio.com/users'); //Where user data is stored    
app.controller('LoginCtrl', ['$scope', '$firebaseAuth', 'Login', function($scope, $firebaseAuth, Login) {
    $scope.authenticate = {};
    $scope.authData = {};
    $scope.authenticate.login = function() {
        Login.login().then(function successCallback(data) {
            $scope.authData = data;
            console.dir("Authentication Data: " + $scope.authData);
        }, function errorCallback(data) {
            console.log("Error " + data);
        });
    };
    $scope.authenticate.logout = function() {
        Login.logout().then(function successCallback(data) {
            alert("Logged out");
            $scope.authData = data;
        })
    }
}]);