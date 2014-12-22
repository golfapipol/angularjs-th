(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('demoController', function ($scope) {
		$scope.text = "test";
	});
	
})();