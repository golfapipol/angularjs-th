(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('storeController', function ($scope) {
		$scope.sushis = [
			{
				name: 'Maguro',
				price: 200,
				description: "Fat Tuna",
				quantity: 0,
				freshDate: new Date('2014-04-15'),
				image: '../image/sushi/maguro.jpg'
			},
			{
				name: 'Tamago',
				price: 120,
				description: "Rice With Egg",
				quantity: 0,
				freshDate: new Date('2014-04-05'),
				image: '../image/sushi/tamago.jpg'
			},
			{
				name: 'Ebi',
				price: 150,
				description: "Rice With shrimp",
				quantity: 0,
				freshDate: new Date('2014/04/12'),
				image: '../image/sushi/ebi.jpg'
			},
			{
				name: 'Tako',
				price: 180,
				description: "Rice With Octopus",
				quantity: 0,
				freshDate: new Date('2014-04-08'),
				image: '../image/sushi/tako.jpg'
			}
		];
		$scope.purchase = function (item) {
			if (item.quantity > 0) {
				return true;
			} else {
				return false;
			}
		};
		$scope.clickAdd = function (item) {
			item.quantity += 1;
		};
		$scope.clickRemove = function (item) {
			if (item.quantity > 0) {
				item.quantity -= 1;
				return true;
			} else {
				return false;	
			}
		};
	});
	
})();