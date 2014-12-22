(function () {
    var app = angular.module("application", []);
     
    app.controller("demoController", function ($scope) {
		var doIt = function (data) {
			alert(data);
		};
		$scope.john = {
			name: 'John',
			task: doIt	
		};
		$scope.jane = {
			name: 'Jane',
			task: doIt	
		};
		$scope.jim = {
			name: 'Jim',
			task: doIt	
		};
    });
    app.directive("developer", function () {
        return {
            restrict: 'E',
			scope: {
				people: '='
            },
            template: '<div><p>{{people.name}}</p><input type="text" ng-model="work" /><button ng-click="people.task(work)">Go to Work</button></div>'
        };
    });
     
})(); 