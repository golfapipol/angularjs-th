angular.module('application', [])
	.controller('uichallenge', function ($scope) {
		$scope.answer1 = false;
		$scope.answer2 = false;
		$scope.answer3 = false;
		$scope.answer4 = false;
		$scope.sushi = [
				{name: "Otaro", price: 200},
				{name: "Maguro", price: 300},
				{name: "Tamago", price: 120},
				{name: "Saba", price: 100},
				{name: "Tako", price: 150}
			];
		$scope.appetizer = [
				{name: "Takoyaki", price: 500},
				{name: "Okonomiyaki", price: 500},
				{name: "Yakisoba", price: 650},
				{name: "Soba", price: 400}
			];
		$scope.drink = [
				{name: "Coke", price: 100},
				{name: "Water", price: 100},
				{name: "Lemon Soda", price: 250},
				{name: "Matcha", price: 200}
			];
	});