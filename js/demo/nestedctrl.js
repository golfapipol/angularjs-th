angular.module('application', [])
    .controller('zoneone', function ($scope,$rootScope) {
        this.value = "Hello";
       	$scope.value = "Bye";
		$rootScope.value = "RootScope";
    })
    .controller('zonetwo', function ($scope) {
        this.value = "World";
    })
    .controller('zonethree', function ($scope) {
        this.value = "AngularJS";
    })
    .controller('zonefour', function ($scope) {
        this.value = "Javascript Framework";
		$scope.value = "jQuery";

	})
	.controller('rootController', function ($scope) {
		$scope.text = "root";
	})
	.controller('branchController', function ($scope) {
		$scope.text = $scope.text + " - branch";
	})
	.controller('nodeController', function ($scope) {
		$scope.text += " - node";
	});