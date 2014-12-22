(function () {
	'use strict';
	
	var app = angular.module('application', []);
	app.controller('storeController', function ($scope, SushiService) {
		$scope.sushis = [];
		
			SushiService.getSushis().then(function (data) {
			$scope.sushis = data;
		});
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
	}).
	factory('SushiService', function ($http, $q) {
		'use strict';
		
		return {
			getSushis : function () {
				var deferred = $q.defer();
				
				$http.get('sushi.json').success(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		};
	});
	
})();