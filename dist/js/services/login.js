var app = angular.module('app.Wom');
var ref = new Firebase('https://who-owes-me.firebaseio.com/'); //Where data is stored
var usersRef = new Firebase('https://who-owes-me.firebaseio.com/users'); //Where user data is stored	
app.factory('Login', function LoginFactory($firebaseAuth, $timeout) {
    var authref = $firebaseAuth(ref);
    var authData = {};
    return {
        login: function() {
            $timeout(function() {
                if (Object.keys(authData).length < 1) {
                    console.log("fired");
                    authref.$authWithOAuthPopup("google", {
                        scope: "email"
                    }).then(function(data) {
                        //check if account is made, if not create a new account and pass on.
                        checkIfUserExists(data);
                        console.log(data);
                        authData = {
                            user: {
                                name: data.google.displayName,
                                pic: data.google.profileImageURL
                            },
                            token: data.token,
                            provider: data.auth.provider,
                            uid: data.uid
                        };
                        console.log(authData);
                        return authData;
                    });
                } else {
                    console.log("Already Logged in: " + authData);
                    return authData;
                }
            }, 1000);
        },
        logout: function() {
            $timeout(function() {
                ref.unauth();
                authData = null;
                return authData;
            }, 1000);
        }
    }
    // Tests to see if /users/<userId> has any data. 
    function checkIfUserExists(data) {
        usersRef.child(data.uid).once('value', function(snapshot) {
            var exists = (snapshot.val() !== null);
            userExistsCallback(data, exists); //send the data and the boolean to userExistsCallback.
        });
    }

    function userExistsCallback(data, exists) {
        if (exists) {
            alert('user ' + data.google.id + ' exists!');
        } else {
            ref.child('users').child(data.uid).set({ //create a new user at the user/<$uid>/ path
                google_id: data.google.id,
                provider: data.provider,
                name: data.google.displayName,
                email: data.google.email,
                pic: data.google.profileImageURL
            });
        }
    }
});