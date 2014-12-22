(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('demoController', function ($scope) {
		$scope.datas =[];
		$scope.data ={};
		$scope.addData = function (datas) {
			datas.push($scope.data);
			$scope.data = {};
		};
	});
	
})();