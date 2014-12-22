(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('storeController', function ($scope) {
		$scope.sushis = [
			{
				name: 'Maguro',
				price: 200,
				description: "Fat Tuna",
				canPurchase: true
			},
			{
				name: 'Tamago',
				price: 120,
				description: "Rice With Egg",
				canPurchase: true
			}
		];
	});
	
})();