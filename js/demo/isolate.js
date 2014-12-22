(function () {
    var app = angular.module("application", []);
     
    app.controller("demoController", function ($scope) {
     	$scope.call = function () {
			alert("call");
		};
    });
    app.directive("developer", function () {
        return {
            restrict: 'E',
            template: '<div><input type="text" ng-model="work" /> work is "{{work}}"</div>'
        };
    });
	app.directive("juniorDeveloper", function () {
        return {
            restrict: 'E',
			scope: {},
            template: '<div><input type="text" ng-model="work" /> work is "{{work}}"</div>'
        };
    });
     
})(); 