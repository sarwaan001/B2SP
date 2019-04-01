angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getlogin: function(username, hash) {
      return $http.post(urlBase + '/api/' + username + hash);
    },
	
	create: function(email, username, hash) {
	  return $http.post(urlBase, '/api/' + email + username + hash);
    }
  };

  return methods;
});
