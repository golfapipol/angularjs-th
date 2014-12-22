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
			},
			{
				name: 'Ebi',
				price: 150,
				description: "Rice With shrimp",
				canPurchase: true
			},
			{
				name: 'Tako',
				price: 180,
				description: "Rice With Octopus",
				canPurchase: true
			}
		];
	});
	
})();