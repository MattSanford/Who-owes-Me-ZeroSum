var ref = new Firebase('https://who-owes-me.firebaseio.com/'); //Where data is stored
var usersRef = new Firebase('https://who-owes-me.firebaseio.com/users'); //Where user data is stored    
angular.module('app.Wom').controller('FriendsCtrl', ['$scope', '$firebaseAuth', 'Login', 'ListFriends', function($scope, $firebaseAuth, Login, ListFriends) {
    $scope.friends = {
        findNew: {
            query: '',
            search: null,
            found: {},
            add: null
        },
        findCurrent: null
    };
    $scope.authData = {};
    Login.login().then(function (data) {
        console.log("Data: " + data);
        $scope.authData.uid = data.uid;
    }, function (data) {
        console.log(data);
    }); 
    /*
    Look for a user 
    */
    $scope.friends.findNew.search = function() {
        if ($scope.friends.findNew.query) {
            usersRef.orderByChild("childName").startAt($scope.findNew.query).endAt($scope.findNew.query).once('value', function(dataSnapshot) {
                var data = dataSnapshot.val;
                var foundUserUid = Object.keys(data);
                var foundUser = data[foundUserUid];
                $scope.friends.findNew.found = {
                    name: foundUser.name,
                    email: foundUser.email,
                    pic: foundUser.pic,
                    uid: foundUser.uid
                };
                console.log("Searched for: " + $scope.friends.findNew.query + ". Found this :");
                console.dir($scope.friends.findNew.found);
            }, function(err) {
                if (err) {
                    console.log("Error: " + error);
                }
            });
        }
    };
    $scope.friends.findNew.addFriend = function() {
        ref.child('users').child($scope.authData.uid).child('friends').child($scope.newFriend.uid).set($scope.newFriend);
        $scope.friends.findNew.found = {};
        $scope.friends.findNew.query = '';
    }
    $scope.friends.findCurrent = function() {
        ListFriends.fetch($scope.authData.uid).then(function successCallback(data) {
            /* Format for the data comes packacged like this:
        {
        <uid>: {
            email: <email>,
            google_ID: <googleID>,
            name: <name>,
            pic: <picURL>,
            uid: <uid>
            }
        } 

        Store the dynamic uids in an array that can be ennumerated through.
        We are going to store this in a $scope.friends object        
        */
            var ojectIndicies = Object.keys(data);
            for (var i = 0; i < objectIndicies.length; i++) {
                var id = data[objectIndicies[i]].uid;
                var name = data[objectIndicies[i]].name;
                var email = data[objectIndicies[i]].email;
                var pic = data[objectIndicies[i]].pic;
                $scope.friends = {
                    id: {
                        name: name,
                        email: email,
                        pic: pic
                    }
                };
                console.dir("The Friends object now looks like this:" + $scope.friends)
            }
        }, function errorCallback(data) {
            console.log(data);
        });
    }
}]);