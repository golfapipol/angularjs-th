(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('storeController', function ($scope) {
		$scope.sushi = {
			name: 'Maguro',
			price: 200,
			description: "Fat Tuna",
			canPurchase: false
		};
	});
	
})();