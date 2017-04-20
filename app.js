var queueKle = angular.module('queueKle', ['firebase', 'ngRoute','ngResource', 'ngCookies']);

queueKle.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      console.log(error);
      $location.path("/home");
    }
  });
    
}]);

queueKle.config(['$routeProvider',
function($routeProvider) {
    $routeProvider.
  when('/home', {
      controller: 'RegController',
      templateUrl: 'partials/home.html',
      resolve: {
      // controller will not be loaded until $waitForSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $waitForSignIn returns a promise so the resolve waits for it to complete
        return Auth.$waitForSignIn();
      }]
    }
    }).
  when('/registerPage', {
      controller: 'RegController',
      templateUrl: 'partials/registerPage.html',
    }).
  when('/search', {
      controller: 'searchCtrl',
      templateUrl: 'partials/search.html',
      resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    }).
  when('/artistPage/:id', {
        templateUrl: 'partials/artistPage.html',
        controller: 'artistCtrl',
        resolve: {
          // controller will not be loaded until $requireSignIn resolves
          // Auth refers to our $firebaseAuth wrapper in the factory below
          "currentAuth": ["Auth", function(Auth) {
            // $requireSignIn returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $routeChangeError (see above)
            return Auth.$requireSignIn();
          }]
        }
      }).

    when('/albumPage/:id', {
      templateUrl: 'partials/albumPage.html',
      controller: 'albumCtrl',
      resolve: {
        // controller will not be loaded until $requireSignIn resolves
        // Auth refers to our $firebaseAuth wrapper in the factory below
        "currentAuth": ["Auth", function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $routeChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    }).
    when('/playlistPage/:id', {
    controller: 'RegController',
    templateUrl: 'partials/userfriendplaylist.html',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $routeChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  }).

  when('/personalPlaylistPage/:id', {
    controller: 'RegController',
    templateUrl: 'partials/personalPlaylistPage.html',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $routeChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  }).
  when('/friends/:id', {
    templateUrl: 'partials/userfriendpage.html',
    controller: 'RegController',
    resolve: {
      // controller will not be loaded until $requireSignIn resolves
      // Auth refers to our $firebaseAuth wrapper in the factory below
      "currentAuth": ["Auth", function(Auth) {
        // $requireSignIn returns a promise so the resolve waits for it to complete
        // If the promise is rejected, it will throw a $routeChangeError (see above)
        return Auth.$requireSignIn();
      }]
    }
  }).
  otherwise('/home', {
      controller: 'RegController',
      templateUrl: 'partials/home.html',
      });
}]);


queueKle.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
