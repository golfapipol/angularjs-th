(function () {
    var app = angular.module("application", []);
     
    app.controller("demoController", function ($scope) {
		$scope.work = "test";
     	$scope.doIt = function () {
			alert("hello");
		};
		$scope.doIt2 = function (data) {
			alert(data);
		};
    });
    app.directive("developer", function () {
        return {
            restrict: 'E',
			scope: {
                task: '&'
            },
            template: '<div><input type="text" ng-model="work" /><button ng-click="task()">Go to Work</button></div>'
        };
    });
	app.directive("juniorDeveloper", function () {
        return {
            restrict: 'E',
			scope: {
                task: '&'
            },
            template: '<div><input type="text" ng-model="work" /><button ng-click="task({message:work})">Go to Work</button></div>'
        };
    });
     
})(); 