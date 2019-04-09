angular.module('twitter')
  .factory('twitService', ['$http',
    function($http) {
      var methods = {
        readSearch: function(searchRequest){
          return $http.post('/api/search', searchRequest);
        },
        readTrends: function(searchRequest){
          return $http.post('/api/trends', searchRequest);
        }
        // searchUsers: function(searchRequest){
        //   return $http.post('/api/searchUsers', searchRequest);
        // },
        // userTweets: function(searchRequest){
        //   return $http.post('/api/usertweets', searchRequest);
        // }
      }
      return methods;

    }
  ])
