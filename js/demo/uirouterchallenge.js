angular.module('application', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/sushi');
        
		$stateProvider
            .state('menu', {
				abstract: true,
				template: '<div class="col-md-8" ui-view="menu">' +
							'<ul class="nav nav-pills navbar-default">' +
							'<li><a ui-sref="menu.sushi">Sushi</a></li>' +
							'<li><a ui-sref="menu.appetizer">Appetizer</a></li>' +
							'<li><a ui-sref="menu.drink">Drink</a></li>' +
							'</ul><div ui-view="menulist"></div></div>' +
							'<div class="col-md-4" ui-view="order"></div>',
				controller: function ($scope, $state) {
					$scope.orderItem = [];
					$scope.increase = function (item) {
						if (item.quantity !== null) {
							item.quantity += 1;
						}
					};
					$scope.decrease = function (item) {
						if (item.quantity !== null && item.quantity > 0) {
							item.quantity -= 1;
						}
					};
					$scope.orderCall = function (item) {
						if (item.quantity !== null && item.quantity > 0) {
							var addItem = angular.copy(item);
							$scope.orderItem.push(addItem);
							item.quantity = 0;
						}
					};
					$scope.removeOrder = function (item) {
						var index = $scope.orderItem.indexOf(item);
						$scope.orderItem.splice(index, 1);
					}
					$scope.checkOut = function () {
						var params = {"orderItem":$scope.orderItem};
						console.log(params);
						$state.go("checkout", params);
					};
				}
            })
			.state('menu.sushi', {
				url: '/sushi',
				resolve: {
					sushiItem: function () {
						var item = [
							{name: "Otaro", price: 200},
							{name: "Maguro", price: 300},
							{name: "Tamago", price: 120},
							{name: "Saba", price: 100},
							{name: "Tako", price: 150}
						];
						return item;
					}
				},
				views: {
					"menulist": {
						template: '<div class="list-group"><div class="list-group-item row" ng-repeat="item in menuItem" ng-init="item.quantity = 0">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-2"><em>{{item.price | number:2}} Yen </div>' +
							'<div class="col-md-2"><p>X {{item.quantity}}</p> <button class="btn btn-default" ng-click="increase(item)">increse</button>' +
							'<button class="btn btn-default" ng-click="decrease(item)">decrese</button></div>' +
							'<div class="col-md-2"><button class="btn btn-default pull-right" ng-click="orderCall(item)">+</button></div>' +
							'</div></div>',
						controller: function ($scope, sushiItem) {
							$scope.menuItem = sushiItem;
						}
					},
					"order": {
						template: '<div class="list-group"><div class="list-group-item row" ng-repeat="item in orderItem">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-4"><em>{{item.price | number:2}} Yen </div>' +
							'<div class="col-md-2"><p>X {{item.quantity}}</p></div>' +
							'<div class="col-md-2"><button class="btn btn-default pull-right" ng-click="removeOrder(item)">X</button></div>' +
							'</div><button ng-show="orderItem.length > 0" ng-click="checkOut()" class="btn btn-danger col-md-12">Check Out</button></div>'
					}
				}
			})
			.state('menu.appetizer', {
				url: '/appetizer',
				resolve: {
					appetizerItem: function () {
						var item = [
							{name: "Takoyaki", price: 500},
							{name: "Okonomiyaki", price: 500},
							{name: "Yakisoba", price: 650},
							{name: "Soba", price: 400}
						];
						return item;
					}
				},
				views: {
					"menulist": {
						template: '<div class="list-group"><div class="list-group-item row" ng-repeat="item in menuItem" ng-init="item.quantity = 0">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-2"><em>{{item.price | number:2}} Yen </div>' +
							'<div class="col-md-2"><p>X {{item.quantity}}</p> <button class="btn btn-default" ng-click="increase(item)">increse</button>' +
							'<button class="btn btn-default" ng-click="decrease(item)">decrese</button></div>' +
							'<div class="col-md-2"><button class="btn btn-default pull-right" ng-click="orderCall(item)">+</button></div>' +
							'</div></div>',
						controller: function ($scope, appetizerItem) {
							$scope.menuItem = appetizerItem;
						}
					},
					"order": {
						template: '<div class="list-group"><div class="list-group-item row" ng-repeat="item in orderItem">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-4"><em>{{item.price | number:2}} Yen </div>' +
							'<div class="col-md-2"><p>X {{item.quantity}}</p></div>' +
							'<div class="col-md-2"><button class="btn btn-default pull-right" ng-click="removeOrder(item)">X</button></div>' +
							'</div><button ng-show="orderItem.length > 0" ng-click="checkOut()" class="btn btn-danger col-md-12">Check Out</button></div>'
					}
				}
			})
			.state('menu.drink', {
				url: '/drink',
				resolve: {
					drinkItem: function () {
						var item = [
							{name: "Coke", price: 100},
							{name: "Water", price: 100},
							{name: "Lemon Soda", price: 250},
							{name: "Matcha", price: 200}
						];
						return item;
					}
				},
				views: {
					"menulist": {
						template: '<div class="list-group"><div class="list-group-item row" ng-repeat="item in menuItem" ng-init="item.quantity = 0">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-2"><em>{{item.price | number:2}} Yen </div>' +
							'<div class="col-md-2"><p>X {{item.quantity}}</p> <button class="btn btn-default" ng-click="increase(item)">increse</button>' +
							'<button class="btn btn-default" ng-click="decrease(item)">decrese</button></div>' +
							'<div class="col-md-2"><button class="btn btn-default pull-right" ng-click="orderCall(item)">+</button></div>' +
							'</div></div>',
						controller: function ($scope, drinkItem) {
							$scope.menuItem = drinkItem;
						}
					},
					"order": {
						template: '<div class="list-group"><div class="list-group-item row" ng-repeat="item in orderItem">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-4"><em>{{item.price | number:2}} Yen </div>' +
							'<div class="col-md-2"><p>X {{item.quantity}}</p></div>' +
							'<div class="col-md-2"><button class="btn btn-default pull-right" ng-click="removeOrder(item)">X</button></div>' +
							'</div><button ng-show="orderItem.length > 0" ng-click="checkOut()" class="btn btn-danger col-md-12">Check Out</button></div>'
					}
				}
			})
			.state('checkout', {
				url: '/checkout',
				params: {'orderItem':''},
				template: '<div><ul class="nav nav-pills navbar-default">' +
						'<li><a ui-sref="menu.sushi">Back</a></li>' +
						'</ul><div ui-view="menulist"></div></div>' +
						'<div class="list-group"><div class="list-group-item row" ng-repeat="item in orderItem">' +
							'<h2 class="col-md-4">{{item.name}}</h2>' +
							'<div class="col-md-4"><em>{{item.price | number:2}} Yen X {{item.quantity}} = {{item.quantity * item.price}} Yen</div>' +
							'</div>' + '<div class="list-group-item row" ><h2 class="col-md-4">Total</h2><h2 class="col-md-4">{{sum}} Yen</h2></div>' +
							 '<button ng-click="payMoney()" class="btn btn-danger col-md-12">Pay</button></div>',
				controller: function ($scope, $stateParams, $state) {
					$scope.orderItem = $stateParams.orderItem;
					$scope.sum = 0;
					angular.forEach($scope.orderItem, function (item) {
						$scope.sum += (item.price * item.quantity);
					});
					console.log($stateParams);
					$scope.payMoney = function () {
						alert("Thank you.");
						$state.go('menu.sushi');
					}
				}
			});
    });