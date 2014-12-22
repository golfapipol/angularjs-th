angular.module('application', [])
	.controller('demoController', function($scope) {
		$scope.text = "";
		$scope.textLength = 0;
		$scope.$watch(function () { return $scope.text; }, function (newData, oldData) {
			console.log("change " + newData.length + " : " + oldData.length);
			if (newData.length !== oldData.length) {
				$scope.textLength = newData.length;
			}
		});
	});