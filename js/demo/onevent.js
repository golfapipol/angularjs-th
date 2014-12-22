angular.module('application', [])
	.controller('rootController', function ($scope) {
        $scope.count = 0;
        $scope.$on('addCount', function () {
            $scope.count += 1;
        });
		$scope.$on('addMultiCount', function (event, num) {
			console.log(num);
            $scope.count += parseInt(num, 10);
        });
    })
	.controller('branchController', function ($scope) {
        $scope.count = 0;
        $scope.$on('addCount', function () {
            $scope.count += 2;
        });
		$scope.$on('addMultiCount', function (event, num) {
			console.log(num);
            $scope.count += parseInt(num, 10);
        });
    })
	.controller('nodeController', function ($scope) {
        $scope.count = 0;
        $scope.$on('addCount', function () {
            $scope.count += 3;
        });
		$scope.$on('addMultiCount', function (event, num) {
			console.log(num);
            $scope.count += parseInt(num, 10);
        });
    });