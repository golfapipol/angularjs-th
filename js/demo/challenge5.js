(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('storeController', function ($scope) {
		$scope.sushis = [
			{
				name: 'Maguro',
				price: 200,
				description: "Fat Tuna",
				canPurchase: true,
				freshDate: new Date('2014-04-15')
			},
			{
				name: 'Tamago',
				price: 120,
				description: "Rice With Egg",
				canPurchase: true,
				freshDate: new Date('2014-04-05')
			},
			{
				name: 'Ebi',
				price: 150,
				description: "Rice With shrimp",
				canPurchase: true,
				freshDate: new Date('2014/04/12')
			},
			{
				name: 'Tako',
				price: 180,
				description: "Rice With Octopus",
				canPurchase: true,
				freshDate: new Date('2014-04-08')
			}
		];
	});
	
})();