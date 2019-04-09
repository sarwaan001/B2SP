angular.module('listings').controller('ListingsController', ['$scope', 'twitService',
  function($scope, Listings, twitService) {

$scope.username = "test";

  //   /* Get all the listings, then bind it to the scope */
  //   Listings.getAll().then(function(response) {
  //     $scope.listings = response.data;
  //   }, function(error) {
  //     console.log('Unable to retrieve listings:', error);
  //   });
  //
  //
  //   $scope.detailedInfo = undefined;
  //
  //   $scope.addListing = function() {
	//   /**TODO-Done
	//   *Save the article using the Listings factory. If the object is successfully
	//   saved redirect back to the list page. Otherwise, display the error
	//  */
  //
  //  $scope.listings.push($scope.newListing);
  //  //$scope.newListing = {};
  //
  //  Listings.create($scope.newListing).then(function() {
  //    $scope.newListing = {};
  //  })
  //
  //   };
  //
  //   $scope.deleteListing = function(index) {
	//    /**TODO-Done
  //       Delete the article using the Listings factory. If the removal is successful,
	// 	navigate back to 'listing.list'. Otherwise, display the error.
  //      */
  //     Listings.delete($scope.listings[index]._id).then(function(res) {
  //       if(res.status == 200) {
  //         $scope.listings.splice(index, 1);
  //       }
  //
  //     });
  //
  //
  //     // $scope.listings.splice(id, 1);
  //   };
  //
  //   $scope.showDetails = function(index) {
  //     $scope.detailedInfo = $scope.listings[index];
  //   };
  // }
]);
