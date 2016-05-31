var app = angular.module('app.Wom');
var ref = new Firebase('https://who-owes-me.firebaseio.com/'); //Where data is stored
var usersRef = new Firebase('https://who-owes-me.firebaseio.com/users'); //Where user data is stored	
app.factory('ListFriends', function(Login) {
    return {
        fetch: function(authData) {
        	var authData = {};
        	Login.login().then(function(data){
        		authData.uid = data.uid;
        	});
            var friendsRef = usersRef.child(authData.uid).child('friends/');
           return friendsRef.once('value');
        }
    }
});